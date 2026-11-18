"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  sceneIndex: number;
  scrollProgress: number;
}

// 6-scene camera waypoints
const cameraWaypoints: Record<
  number,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  0: { pos: [0, 0, 4.6], lookAt: [0, -0.3, 0] },         // Scene 1: Introduction
  1: { pos: [-0.85, 0.1, 3.8], lookAt: [0.6, 0, 0] },    // Scene 2: About Me
  2: { pos: [0, 0.45, 4.3], lookAt: [0, 0.05, 0.4] },     // Scene 3: Skills & Workstation
  3: { pos: [0.75, -0.1, 4.2], lookAt: [-0.6, -0.25, 0] },// Scene 4: Experience Timeline
  4: { pos: [-1.25, 0.1, 4.1], lookAt: [0.7, 0, 0] },    // Scene 5: Projects Exhibition
  5: { pos: [0, 0.1, 5.2], lookAt: [0, -0.2, 0] },       // Scene 6: Contact
};

export function CameraController({
  sceneIndex,
  scrollProgress,
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const waypoint = cameraWaypoints[sceneIndex] || cameraWaypoints[0];

    // Smooth subtle mouse parallax
    const parallaxX = state.pointer.x * 0.3;
    const parallaxY = state.pointer.y * 0.2;

    const targetX = waypoint.pos[0] + parallaxX;
    const targetY = waypoint.pos[1] + parallaxY;
    const targetZ = waypoint.pos[2];

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.8);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2.8);

    const destLookAt = new THREE.Vector3(...waypoint.lookAt);
    currentTarget.current.lerp(destLookAt, delta * 3.2);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
