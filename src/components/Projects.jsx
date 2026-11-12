import { useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";

export const projects = [
  {
    title: "Uni Management",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/UniversityManagementSystem",
    image: "projects/uni.png",
    description: "Secure and scalable software application designed to manage the administrative, academic, and personal data of teachers and students",
  },
  {
    title: "Conference Venue",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/ConferenceVenueBooking",
    image: "projects/conf.png",
    description: "Web application that allows to book venues based on number of guests",
  },
  {
    title: "ChatBot App",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/Chat-Bot-Kotlin-app",
    image: "projects/chat.png",
    description: "Use commands to search on the web, launch gallery, play a game, solve basic arithmetic problems, tell a joke, date and time.",
  },
  {
    title: "Music Player",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/Custom-Music-player",
    image: "projects/music.png",
    description: "Music player with albums allowing play, pause, shuffle, next and previous song.",
  },
  {
    title: "Swin Adventure",
    category: "Games",
    url: "https://github.com/RohanSoni-02/SwinAdventureGUI",
    image: "projects/swin.png",
    description: "Game allows players to exist within a location/room within the world, the player can move between locations using path",
  },
  {
    title: "Personal AI ChatBot",
    category: "AI",
    url: "https://github.com/RohanSoni-02/CareerConvo",
    image: "projects/bot.svg",
    description: "AI-powered personal assistant designed to represent me"
  },
  {
    title: "Book Reservation",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/LibraryReservationSystem",
    image: "projects/lib.png",
    description: "Web application that tracks the current status of books, if they are available, reserved or unavailable",
  },
  {
    title: "IoT Bush Fire",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/SmartBushFireRiskGaugeSystem",
    image: "projects/bush.png",
    description: "System uses various sensors to identify the risk of a bushfire occurring.",
  },
  {
    title: "Tic Tac Toe",
    category: "Games",
    url: "https://github.com/RohanSoni-02/TicTacToe",
    image: "projects/tic.png",
    description: "Console based Tic Tac Toe game that allows a human player to play against a basic AI that makes random moves.",
  },
  {
    title: "Hunter Prey",
    category: "Games",
    url: "https://github.com/RohanSoni-02/HunterPrey",
    image: "projects/hunt.png",
    description: "Game that simulates group behavior through emergent principles, where simple individual rules lead to complex group dynamics",
  },
   {
    title: "CyberPython",
    category: "Games",
    url: "https://github.com/RohanSoni-02/CyberPython",
    image: "projects/snake.png",
    description: "A cybernetic snake's journey through a grid-based world, attempting to eat as many apples as possible on the map.",
  },
  {
    title: "AquaVision",
    category: "AI",
    url: "https://github.com/RohanSoni-02/fish-detection-and-tracking",
    image: "projects/aqua.png",
    description: "Analyze videos with statistical insights using a machine-learning model for fish detection and tracking",
  },
  {
    title: "Morph",
    category: "3D",
    url: "https://morph-vert.vercel.app/",
    image: "projects/morph.png",
    description: "A morphing animation that transforms different 3D models",
  },
  {
    title: "Portal",
    category: "3D",
    url: "https://portal-orpin-nu.vercel.app/",
    image: "projects/portal.png",
    description: "A 3D portal animation that creates a visual effect of a portal opening and closing",
  },
  {
    title: "Terrain",
    category: "3D",
    url: "https://procedural-terrain-sandy.vercel.app/",
    image: "projects/terrain.png",
    description: "A 3D animated terrain project that creates realistic landscapes",
  },
  {
    title: "Particle animation",
    category: "3D",
    url: "https://particle-animation-ebon.vercel.app/",
    image: "projects/particleAnim.png",
    description: "A 3D particle animation project that creates realistic particle effects",
  },
  {
    title: "Hologram",
    category: "3D",
    url: "https://hologram-nu.vercel.app/",
    image: "projects/holo.png",
    description: "A 3D hologram project that creates realistic holographic effects",
  },
  {
    title: "Raging Sea",
    category: "3D",
    url: "https://raging-sea-three-virid.vercel.app/",
    image: "projects/sea.png",
    description: "A 3D raging sea project that creates realistic oceanic effects",
  },
  {
    title: "Galaxy",
    category: "3D",
    url: "https://galaxy-dusky-chi.vercel.app/",
    image: "projects/galaxy.png",
    description: "A 3D galaxy project that creates realistic cosmic effects",
  },
  {
    title: "Haunted House",
    category: "3D",
    url: "https://haunted-house-nine-delta.vercel.app/",
    image: "projects/house.png",
    description: "A 3D haunted house project that creates realistic spooky effects",
  },
  {
    title: "Detective Room",
    category: "3D",
    url: "https://www.linkedin.com/in/rohan-soni-389591203/details/projects/",
    image: "projects/det.png",
    description: "A detective room 3d model made on Autodesk Maya",
  },
  {
    title: "UI Prototype",
    category: "Apps",
    url: "https://xd.adobe.com/view/5e363d7a-389f-430d-bffa-1482b92b70bf-0b65/",
    image: "projects/pro.png",
    description: "Working user interface prototype built on Adobe XD for a startup company Quitch",
  },
  {
    title: "Shape Drawer",
    category: "Apps",
    url: "https://github.com/RohanSoni-02/ShapeDrawer",
    image: "projects/Shape.png",
    description: "Uses Inheritance and Polymorphism to draw different shapes. Each of the shape class has its own custom drawing implementation",
  },
];

export const projectCategories = ["All", "3D", "Apps", "Games", "AI"];

export const getVisibleProjects = (category) =>
  category === "All" ? projects : projects.filter((project) => project.category === category);

export const projectFilterAtom = atom("All");

// Index into the currently visible (filtered) projects.
export const currentProjectAtom = atom(Math.floor(projects.length / 2));

const THUMBNAIL_WIDTH = 2;
const THUMBNAIL_HEIGHT = 1.25;
const THUMBNAIL_RADIUS = 0.08;
const FRAME_WIDTH = 0.045;
const CARD_SPACING = 2.4;

const createRoundedRectGeometry = (width, height, radius) => {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape, 8);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (position.getX(i) - x) / width, (position.getY(i) - y) / height);
  }
  return geometry;
};

const thumbnailGeometry = createRoundedRectGeometry(
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_RADIUS
);
const frameGeometry = createRoundedRectGeometry(
  THUMBNAIL_WIDTH + FRAME_WIDTH * 2,
  THUMBNAIL_HEIGHT + FRAME_WIDTH * 2,
  THUMBNAIL_RADIUS + FRAME_WIDTH
);

// Crops the texture like CSS `object-fit: cover` so screenshots of any size fill the card.
const coverTexture = (texture) => {
  const { width, height } = texture.image;
  if (!width || !height) return;
  const imageAspect = width / height;
  const cardAspect = THUMBNAIL_WIDTH / THUMBNAIL_HEIGHT;
  if (imageAspect > cardAspect) {
    texture.repeat.set(cardAspect / imageAspect, 1);
  } else {
    texture.repeat.set(1, imageAspect / cardAspect);
  }
  texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
};

const IMAGE_DIMMED = new THREE.Color("#8b93a7");
const IMAGE_LIT = new THREE.Color("#ffffff");
const FRAME_IDLE = new THREE.Color("#1e2433");
const FRAME_ACTIVE = new THREE.Color("#a5b4fc");

const Project = (props) => {
  const { project, highlighted, onSelect } = props;
  const texture = useTexture(project.image);
  const gl = useThree((state) => state.gl);
  const imageMaterial = useRef();
  const frameMaterial = useRef();
  const highlight = useMotionValue(highlighted ? 1 : 0);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useLayoutEffect(() => {
    coverTexture(texture);
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  }, [texture, gl]);

  useEffect(() => {
    animate(highlight, highlighted ? 1 : hovered ? 0.55 : 0, { duration: 0.4 });
  }, [highlighted, hovered]);

  useFrame(() => {
    const amount = highlight.get();
    imageMaterial.current.color.copy(IMAGE_DIMMED).lerp(IMAGE_LIT, amount);
    frameMaterial.current.color.copy(FRAME_IDLE).lerp(FRAME_ACTIVE, amount);
    frameMaterial.current.opacity = 0.55 + amount * 0.45;
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (highlighted) {
          window.open(project.url, "_blank");
        } else {
          onSelect();
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh geometry={frameGeometry} position-z={-0.002}>
        <meshBasicMaterial ref={frameMaterial} transparent toneMapped={false} />
      </mesh>
      <mesh geometry={thumbnailGeometry}>
        <meshBasicMaterial ref={imageMaterial} map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const category = useAtomValue(projectFilterAtom);
  const visibleProjects = getVisibleProjects(category);

  return (
    <group position-y={-viewport.height * 3 + 1}>
      {projects.map((project, index) => {
        const order = visibleProjects.indexOf(project);
        const offset = order - currentProject;
        const highlighted = order !== -1 && offset === 0;
        const scale = order === -1 ? 0 : highlighted ? 1.1 : 0.86;
        return (
          <motion.group
            key={project.title}
            position={[index * CARD_SPACING, 0, -3]}
            animate={{
              ...(order !== -1 && {
                x: offset * CARD_SPACING + Math.sign(offset) * 0.3,
                z: highlighted ? -1.6 : -2.8 - Math.min(Math.abs(offset), 4) * 0.25,
                rotateY: highlighted ? 0 : -Math.sign(offset) * 0.5,
              }),
              y: 0,
              scaleX: scale,
              scaleY: scale,
              scaleZ: scale,
            }}
          >
            <Project
              project={project}
              highlighted={highlighted}
              onSelect={() => {
                if (order !== -1) setCurrentProject(order);
              }}
            />
          </motion.group>
        );
      })}
    </group>
  );
};
