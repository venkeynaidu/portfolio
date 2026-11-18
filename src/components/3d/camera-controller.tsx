"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  sceneIndex: number;
  scrollProgress: number;
  storyKey?: string;
}

const cameraWaypoints: Record<
  number,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  0: { pos: [0, 0, 4.6], lookAt: [0, 0, 0] },
  1: { pos: [-0.5, 0.1, 4.2], lookAt: [0.6, 0.1, 0] },
  2: { pos: [0, 0.1, 4.3], lookAt: [0, 0, 0] },
  3: { pos: [0.6, 0.1, 4.3], lookAt: [-0.5, 0, 0] },
  4: { pos: [-0.6, 0.1, 4.3], lookAt: [0.5, 0, 0] },
  5: { pos: [0, 0.1, 4.6], lookAt: [0, 0, 0] },
};

export function CameraController({ sceneIndex }: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const waypoint = cameraWaypoints[sceneIndex] || cameraWaypoints[0];

    const parallaxX = state.pointer.x * 0.18;
    const parallaxY = state.pointer.y * 0.1;

    const targetX = waypoint.pos[0] + parallaxX;
    const targetY = waypoint.pos[1] + parallaxY;
    const targetZ = waypoint.pos[2];

    const k = Math.min(1, delta * 3.0);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, k);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, k);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, k);

    const destLookAt = new THREE.Vector3(...waypoint.lookAt);
    currentTarget.current.lerp(destLookAt, Math.min(1, delta * 3.2));
    camera.lookAt(currentTarget.current);
  });

  return null;
}
