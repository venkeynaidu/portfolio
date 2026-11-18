"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stageState } from "./stage-state";

interface CameraControllerProps {
  sceneIndex: number;
  scrollProgress: number;
  /** Changes whenever the active world/office changes, triggering a cinematic push-in */
  storyKey?: string;
}

// 6-scene camera waypoints
const cameraWaypoints: Record<
  number,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  0: { pos: [0.2, -0.3, 4.2], lookAt: [0.2, -0.6, 0] },         // Scene 1: Introduction
  1: { pos: [-0.6, -0.2, 3.6], lookAt: [1.0, -0.6, 0] },    // Scene 2: About Me
  2: { pos: [0, 0.1, 4.0], lookAt: [0, -0.5, 0] },     // Scene 3: Skills & Workstation
  3: { pos: [0.6, -0.3, 4.0], lookAt: [-0.6, -0.6, -0.5] },// Scene 4: Experience Offices
  4: { pos: [-0.6, -0.25, 4.0], lookAt: [0.4, -0.6, -0.5] },    // Scene 5: Project Worlds
  5: { pos: [0, -0.3, 4.6], lookAt: [0, -0.6, 0] },       // Scene 6: Contact
};

export function CameraController({ sceneIndex, storyKey }: CameraControllerProps) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const pulse = useRef(0);
  const firstRender = useRef(true);

  // On each new world/office: pull back and sweep, then dolly in
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    pulse.current = 1;
  }, [storyKey]);

  useFrame((state, delta) => {
    const waypoint = cameraWaypoints[sceneIndex] || cameraWaypoints[0];
    pulse.current = Math.max(0, pulse.current - delta * 0.7);
    stageState.transition.current = pulse.current;
    const p = pulse.current * pulse.current; // ease-out

    const parallaxX = state.pointer.x * 0.3;
    const parallaxY = state.pointer.y * 0.2;

    const targetX = waypoint.pos[0] + parallaxX + p * 0.9;
    const targetY = waypoint.pos[1] + parallaxY + p * 0.35;
    const targetZ = waypoint.pos[2] + p * 1.4;

    const k = Math.min(1, delta * 2.8);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, k);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, k);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, k);

    const destLookAt = new THREE.Vector3(...waypoint.lookAt);
    currentTarget.current.lerp(destLookAt, Math.min(1, delta * 3.2));
    camera.lookAt(currentTarget.current);
  });

  return null;
}
