"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface HumanRobotAvatarProps {
  sceneIndex: number;
  scrollProgress: number;
}

// 6 Distinct Scenes based on user prompt
const sceneConfigs: Record<
  number,
  { pos: [number, number, number]; rot: [number, number, number]; action: string }
> = {
  0: { pos: [0, -1.85, 0.25], rot: [0, 0, 0], action: "idle" },       // Scene 1: Introduction
  1: { pos: [1.85, -1.85, 0.35], rot: [0, -0.42, 0], action: "agree" }, // Scene 2: About
  2: { pos: [0, -1.85, 0.05], rot: [0, 0, 0], action: "agree" },       // Scene 3: Skills & Workstation
  3: { pos: [-1.7, -1.85, 0.2], rot: [0, 0.5, 0], action: "walk" },    // Scene 4: Experience Timeline
  4: { pos: [-2.35, -1.85, 0.4], rot: [0, 0.62, 0], action: "idle" },   // Scene 5: Projects Showcase
  5: { pos: [0, -1.85, 0.65], rot: [0, 0, 0], action: "idle" },       // Scene 6: Contact
};

export function HumanRobotAvatar({
  sceneIndex,
  scrollProgress,
}: HumanRobotAvatarProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const faceGroupRef = useRef<THREE.Group>(null!);
  const headBoneRef = useRef<THREE.Object3D | null>(null);

  const { scene, animations } = useGLTF("/character.glb");
  const { actions } = useAnimations(animations, groupRef);
  const prevActionRef = useRef<string>("idle");

  // Load Garaga Venkatesh's authentic cropped face texture
  const faceTexture = useTexture("/avatar-face.png");

  // Apply premium Pearl White & Brushed Titanium materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mesh.name.toLowerCase().includes("joint")) {
            // Dark Brushed Titanium & Chrome
            mat.color = new THREE.Color("#334155");
            mat.roughness = 0.25;
            mat.metalness = 0.95;
          } else {
            // Luminous Pearl White & Silver
            mat.color = new THREE.Color("#f8fafc");
            mat.roughness = 0.16;
            mat.metalness = 0.82;
            mat.envMapIntensity = 1.6;
          }
        }
      }
    });

    // Locate the head bone in the skeleton
    const head = scene.getObjectByName("mixamorig:Head");
    if (head) {
      headBoneRef.current = head;
    }
  }, [scene]);

  // Handle cross-fading skeletal animations
  useEffect(() => {
    const config = sceneConfigs[sceneIndex] || sceneConfigs[0];
    const targetActionName = config.action;

    const currentAction = actions[targetActionName];
    const prevAction = actions[prevActionRef.current];

    if (currentAction && currentAction !== prevAction) {
      currentAction.reset().fadeIn(0.55).play();
      if (prevAction) {
        prevAction.fadeOut(0.55);
      }
      prevActionRef.current = targetActionName;
    }
  }, [sceneIndex, actions]);

  // Update position, rotation, and attach face to head bone
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const config = sceneConfigs[sceneIndex] || sceneConfigs[0];

    // Subtle responsive mouse parallax
    const mouseX = state.pointer.x * 0.14;
    const targetX = config.pos[0] + mouseX;
    const targetY = config.pos[1];
    const targetZ = config.pos[2];

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * 3.2
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 3.2
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 3.2
    );

    // Natural head and body tracking
    const targetRotY = config.rot[1] + state.pointer.x * 0.18;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );

    // Synchronize Face Attachment directly to head bone world transform
    if (headBoneRef.current && faceGroupRef.current) {
      const headWorldPos = new THREE.Vector3();
      const headWorldQuat = new THREE.Quaternion();
      headBoneRef.current.getWorldPosition(headWorldPos);
      headBoneRef.current.getWorldQuaternion(headWorldQuat);

      // Offset slightly forward onto the front face of the helmet/head
      const forwardOffset = new THREE.Vector3(0, 0.04, 0.14).applyQuaternion(
        headWorldQuat
      );

      faceGroupRef.current.position.copy(headWorldPos).add(forwardOffset);
      faceGroupRef.current.quaternion.copy(headWorldQuat);
    }
  });

  return (
    <>
      {/* 3D Humanoid Robot Base */}
      <primitive
        ref={groupRef}
        object={scene}
        scale={1.75}
        position={sceneConfigs[0].pos}
      />

      {/* Real Face Holographic Skin Plate (Attached to Head Bone in real-time) */}
      <group ref={faceGroupRef} scale={0.42}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.55, 0.72, 32, 32]} />
          <meshStandardMaterial
            map={faceTexture}
            transparent
            roughness={0.38}
            metalness={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Cybernetic Frame Trim around the Human Face */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.58, 0.76]} />
          <meshStandardMaterial
            color="#0ea5e9"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Subtle Cybernetic Jawline Connector */}
        <mesh position={[0, -0.32, 0.02]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.35, 0.04, 0.06]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/character.glb");
