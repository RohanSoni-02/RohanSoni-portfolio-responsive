import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillAnchors } from "./skillAnchors";

const MAX_HEAD_TURN = 0.7;
const cursorTarget = new THREE.Vector3();
const animatedHeadQuaternion = new THREE.Quaternion();
const lookHeadQuaternion = new THREE.Quaternion();

const anchorCenter = new THREE.Vector3();
const anchorOffset = new THREE.Vector3();
const anchorA = new THREE.Vector3();
const anchorB = new THREE.Vector3();
const projected = new THREE.Vector3();

const toScreen = (point, camera, size) => {
  projected.copy(point).project(camera);
  return {
    x: ((projected.x + 1) / 2) * size.width,
    y: ((1 - projected.y) / 2) * size.height,
  };
};

const sortByScreenX = (a, b, camera, size) => {
  const first = toScreen(a, camera, size);
  const second = toScreen(b, camera, size);
  return first.x < second.x ? [first, second] : [second, first];
};

const updateSkillAnchors = (nodes, camera, size) => {
  const points = skillAnchors.points;

  nodes.Head.getWorldPosition(anchorCenter);
  nodes.HeadTop_End.getWorldPosition(anchorA);
  anchorCenter.lerp(anchorA, 0.45);
  nodes.LeftEye.getWorldPosition(anchorA);
  nodes.RightEye.getWorldPosition(anchorB);
  anchorOffset.subVectors(anchorA, anchorB).multiplyScalar(1.6);
  anchorA.copy(anchorCenter).add(anchorOffset);
  anchorB.copy(anchorCenter).sub(anchorOffset);
  [points.headLeft, points.headRight] = sortByScreenX(anchorA, anchorB, camera, size);

  nodes.Spine2.getWorldPosition(anchorCenter);
  nodes.LeftArm.getWorldPosition(anchorA).lerp(anchorCenter, 0.5);
  nodes.RightArm.getWorldPosition(anchorB).lerp(anchorCenter, 0.5);
  [points.chestLeft, points.chestRight] = sortByScreenX(anchorA, anchorB, camera, size);

  nodes.LeftHand.getWorldPosition(anchorA);
  nodes.RightHand.getWorldPosition(anchorB);
  [points.handLeft, points.handRight] = sortByScreenX(anchorA, anchorB, camera, size);
};

export function Avatar(props) {
  const { animation, wireframe, lookAtCursor, showSkillAnchors } = props;
  const { headFollow, cursorFollow } = useControls({
    headFollow: false,
    cursorFollow: false,
  });
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const lookTarget = useRef(null);
  const lookBlend = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
  const { nodes, materials } = useGLTF("models/646d9dcdc8a5f5bddbfac913.glb");

  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: standingAnimation } = useFBX(
    "animations/Standing Idle.fbx"
  );
  const { animations: fallingAnimation } = useFBX(
    "animations/Falling Idle.fbx"
  );

  typingAnimation[0].name = "Typing";
  standingAnimation[0].name = "Standing";
  fallingAnimation[0].name = "Falling";

  const { actions } = useAnimations(
    [typingAnimation[0], standingAnimation[0], fallingAnimation[0]],
    group
  );

  useFrame((state, delta) => {
    const head = group.current.getObjectByName("Head");
    if (headFollow) {
      head.lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }

    lookBlend.current = THREE.MathUtils.damp(lookBlend.current, lookAtCursor ? 1 : 0, 4, delta);
    if (lookBlend.current > 0.001) {
      // Aim at a point beside the camera so the avatar appears to look at the cursor on screen.
      cursorTarget
        .set(pointer.current.x * 4, pointer.current.y * 2.5, 0)
        .applyQuaternion(state.camera.quaternion)
        .add(state.camera.position);
      if (!lookTarget.current) {
        lookTarget.current = cursorTarget.clone();
      }
      lookTarget.current.lerp(cursorTarget, 1 - Math.exp(-8 * delta));

      animatedHeadQuaternion.copy(head.quaternion);
      head.lookAt(lookTarget.current);
      lookHeadQuaternion.copy(head.quaternion);
      const angle = animatedHeadQuaternion.angleTo(lookHeadQuaternion);
      const turn = lookBlend.current * Math.min(1, MAX_HEAD_TURN / Math.max(angle, 1e-4));
      head.quaternion.slerpQuaternions(animatedHeadQuaternion, lookHeadQuaternion, turn);
    }

    skillAnchors.visible = Boolean(showSkillAnchors);
    if (showSkillAnchors) {
      updateSkillAnchors(nodes, state.camera, state.size);
    }
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };
  }, [animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/646d9dcdc8a5f5bddbfac913.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");
