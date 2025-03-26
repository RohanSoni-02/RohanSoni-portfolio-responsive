import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Uni Management",
    url: "https://github.com/RohanSoni-02/UniversityManagementSystem",
    image: "projects/uni.png",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Conference Venue",
    url: "https://github.com/RohanSoni-02/ConferenceVenueBooking",
    image: "projects/conf.png",
    description: "Web application that allows to book venues based on number of guests",
  },
  {
    title: "ChatBot App",
    url: "https://github.com/RohanSoni-02/Chat-Bot-Kotlin-app",
    image: "projects/chat.png",
    description: "Use commands to search on the web, launch gallery, play a game, solve basic arithmetic problems, tell a joke, date and time.",
  },
  {
    title: "Music Player",
    url: "https://github.com/RohanSoni-02/Custom-Music-player",
    image: "projects/music.png",
    description: "Music player with albums allowing play, pause, shuffle, next and previous song.",
  },
  {
    title: "Swin Adventure",
    url: "https://github.com/RohanSoni-02/SwinAdventureGUI",
    image: "projects/swin.png",
    description: "Game allows players to exist within a location/room within the world, the player can move between locations using path",
  },
  {
    title: "AquaVision",
    url: "https://github.com/RohanSoni-02/fish-detection-and-tracking",
    image: "projects/aqua.png",
    description: "Analyze videos with statistical insights using a machine-learning model for fish detection and tracking",
  },
  {
    title: "CyberPython",
    url: "https://github.com/RohanSoni-02/CyberPython",
    image: "projects/snake.png",
    description: "A cybernetic snake's journey through a grid-based world, attempting to eat as many apples as possible on the map.",
  },
  {
    title: "Book Reservation",
    url: "https://github.com/RohanSoni-02/LibraryReservationSystem",
    image: "projects/lib.png",
    description: "Web application that tracks the current status of books, if they’re available, reserved or unavailable",
  },
  {
    title: "IoT Bush Fire",
    url: "https://github.com/RohanSoni-02/SmartBushFireRiskGaugeSystem",
    image: "projects/bush.png",
    description: "System uses various sensors to identify the risk of a bushfire occurring.",
  },
  {
    title: "Detective Room",
    url: "https://www.linkedin.com/in/rohan-soni-389591203/details/projects/",
    image: "projects/det.png",
    description: "A detective room 3d model made on Autodesk May",
  },
  {
    title: "UI Prototype",
    url: "https://xd.adobe.com/view/5e363d7a-389f-430d-bffa-1482b92b70bf-0b65/",
    image: "projects/pro.png",
    description: "Working user interface prototype built on Adobe XD for a startup company Quitch",
  },
  {
    title: "Shape Drawer",
    url: "https://github.com/RohanSoni-02/ShapeDrawer",
    image: "projects/Shape.png",
    description: "Uses Inheritance and Polymorphism to draw different shapes. Each of the shape class has its own custom drawing implmentation",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.16}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
