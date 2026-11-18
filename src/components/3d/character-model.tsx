"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface CharacterModelProps {
  sceneIndex: number;
  scrollProgress: number;
}

// Scene-specific character transforms
const sceneTransforms: Record<
  number,
  { pos: [number, number, number]; rot: [number, number, number]; action: string }
> = {
  0: { pos: [0, -1.85, 0.2], rot: [0, 0, 0], action: "idle" },
  1: { pos: [1.8, -1.85, 0.4], rot: [0, -0.4, 0], action: "agree" },
  2: { pos: [-1.6, -1.85, 0.2], rot: [0, 0.45, 0], action: "walk" },
  3: { pos: [0, -1.85, -0.2], rot: [0, 0, 0], action: "agree" },
  4: { pos: [-2.2, -1.85, 0.5], rot: [0, 0.55, 0], action: "idle" },
  5: { pos: [2.0, -1.85, 0.3], rot: [0, -0.5, 0], action: "agree" },
  6: { pos: [0, -1.85, 0.6], rot: [0, 0, 0], action: "idle" },
};

export function CharacterModel({ sceneIndex, scrollProgress }: CharacterModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF("/character.glb");
  const { actions } = useAnimations(animations, groupRef);

  const prevActionRef = useRef<string>("idle");

  // Apply dark cinematic materials to the model
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.35;
          mat.metalness = 0.45;
          mat.envMapIntensity = 1.2;
        }
      }
    });
  }, [scene]);

  // Handle animation cross-fading
  useEffect(() => {
    const targetConfig = sceneTransforms[sceneIndex] || sceneTransforms[0];
    const targetActionName = targetConfig.action;

    const currentAction = actions[targetActionName];
    const prevAction = actions[prevActionRef.current];

    if (currentAction && currentAction !== prevAction) {
      currentAction.reset().fadeIn(0.6).play();
      if (prevAction) {
        prevAction.fadeOut(0.6);
      }
      prevActionRef.current = targetActionName;
    }
  }, [sceneIndex, actions]);

  // Smooth position and orientation interpolation with mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetConfig = sceneTransforms[sceneIndex] || sceneTransforms[0];

    // Mouse parallax offset
    const mouseParallaxX = state.pointer.x * 0.15;
    const targetX = targetConfig.pos[0] + mouseParallaxX;
    const targetY = targetConfig.pos[1];
    const targetZ = targetConfig.pos[2];

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * 3.0
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 3.0
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 3.0
    );

    // Subtle head/body tracking towards cursor
    const targetRotY = targetConfig.rot[1] + (state.pointer.x * 0.2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1.75}
      position={sceneTransforms[0].pos}
    />
  );
}

useGLTF.preload("/character.glb");
