"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  sceneIndex: number;
  scrollProgress: number;
}

// Scene camera positions and lookAt targets
const cameraWaypoints: Record<
  number,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  0: { pos: [0, 0, 4.8], lookAt: [0, -0.3, 0] },
  1: { pos: [-0.9, 0.2, 4.1], lookAt: [0.6, 0, 0] },
  2: { pos: [0.8, -0.1, 4.4], lookAt: [-0.6, -0.3, 0] },
  3: { pos: [0, 0.5, 4.9], lookAt: [0, 0.2, 0] },
  4: { pos: [-1.2, 0.1, 4.3], lookAt: [0.8, 0, 0] },
  5: { pos: [0.9, 0.2, 4.5], lookAt: [-0.5, 0.1, 0] },
  6: { pos: [0, 0.2, 5.5], lookAt: [0, -0.2, 0] },
};

export function CameraController({
  sceneIndex,
  scrollProgress,
}: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const waypoint = cameraWaypoints[sceneIndex] || cameraWaypoints[0];

    // Smooth mouse parallax offset
    const parallaxX = state.pointer.x * 0.35;
    const parallaxY = state.pointer.y * 0.25;

    const targetX = waypoint.pos[0] + parallaxX;
    const targetY = waypoint.pos[1] + parallaxY;
    const targetZ = waypoint.pos[2];

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.8);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2.8);

    // LookAt target interpolation
    const destLookAt = new THREE.Vector3(...waypoint.lookAt);
    currentTarget.current.lerp(destLookAt, delta * 3.2);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
