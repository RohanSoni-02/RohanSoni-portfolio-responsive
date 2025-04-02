import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#D1D8E0",
  });
  const data = useScroll();

  const tl = useRef();

  useFrame(() => {
    tl.current.progress(data.scroll.current);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    
    // Page 1 (Skills) - Dark gray
    tl.current.to(color.current, {
      color: "#212121",
    });
    
    // Page 2 (Experience) - Dark gray
    tl.current.to(color.current, {
      color: "#212121",
    });
    
    // Page 3 (Projects) - Medium blue
    tl.current.to(color.current, {
      color: "#5C6E91",
    });
    
    // Page 4 (Contact) - 
    tl.current.to(color.current, {
      color: "#a3afbe", 
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};