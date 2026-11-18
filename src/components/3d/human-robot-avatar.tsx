"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture, RoundedBox } from "@react-three/drei";
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
  0: { pos: [0, -1.85, 0.25], rot: [0, 0, 0], action: "idle" },       // Scene 1: Introduction (Executive Lounge)
  1: { pos: [1.85, -1.85, 0.35], rot: [0, -0.42, 0], action: "agree" }, // Scene 2: About (Story Tour)
  2: { pos: [0, -1.85, 0.05], rot: [0, 0, 0], action: "agree" },       // Scene 3: Skills & Engineering Lab
  3: { pos: [-1.7, -1.85, 0.2], rot: [0, 0.5, 0], action: "walk" },    // Scene 4: Experience Offices
  4: { pos: [-2.35, -1.85, 0.4], rot: [0, 0.62, 0], action: "agree" },  // Scene 5: Projects Storytelling
  5: { pos: [0, -1.85, 0.65], rot: [0, 0, 0], action: "idle" },        // Scene 6: Executive Office Contact
};

export function HumanRobotAvatar({
  sceneIndex,
  scrollProgress,
}: HumanRobotAvatarProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const faceGroupRef = useRef<THREE.Group>(null!);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const leftWristBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const watchGroupRef = useRef<THREE.Group>(null!);
  const collarGroupRef = useRef<THREE.Group>(null!);

  const { scene, animations } = useGLTF("/character.glb");
  const { actions } = useAnimations(animations, groupRef);
  const prevActionRef = useRef<string>("idle");

  // Load Garaga Venkatesh's authentic cropped face texture
  const faceTexture = useTexture("/avatar-face.png");

  // Section 12: Smart Business Casual Wardrobe Materials (Navy Shirt, Chinos, Leather Shoes)
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;

          if (mesh.name.toLowerCase().includes("joint")) {
            // Natural skin tone & joints: warm Indian skin tone
            mat.color = new THREE.Color("#9e6a4b");
            mat.roughness = 0.58;
            mat.metalness = 0.02;
          } else {
            // Smart Business Casual Shirt & Chinos
            // Tailored dark navy fabric with textile weave roughness
            mat.color = new THREE.Color("#1e3a8a");
            mat.roughness = 0.82;
            mat.metalness = 0.04;
            mat.envMapIntensity = 0.5;
          }
        }
      }
    });

    // Locate bones for accessory attachment
    const head = scene.getObjectByName("mixamorig:Head");
    if (head) headBoneRef.current = head;

    const leftHand = scene.getObjectByName("mixamorig:LeftHand");
    if (leftHand) leftWristBoneRef.current = leftHand;

    const neck = scene.getObjectByName("mixamorig:Neck");
    if (neck) neckBoneRef.current = neck;
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

  // Synchronize transforms on every frame
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

      // Offset slightly forward onto the front face of the head
      const forwardOffset = new THREE.Vector3(0, 0.04, 0.14).applyQuaternion(
        headWorldQuat
      );

      faceGroupRef.current.position.copy(headWorldPos).add(forwardOffset);
      faceGroupRef.current.quaternion.copy(headWorldQuat);
    }

    // Synchronize Wristwatch directly to left wrist bone
    if (leftWristBoneRef.current && watchGroupRef.current) {
      const wristWorldPos = new THREE.Vector3();
      const wristWorldQuat = new THREE.Quaternion();
      leftWristBoneRef.current.getWorldPosition(wristWorldPos);
      leftWristBoneRef.current.getWorldQuaternion(wristWorldQuat);

      watchGroupRef.current.position.copy(wristWorldPos);
      watchGroupRef.current.quaternion.copy(wristWorldQuat);
    }

    // Synchronize Shirt Collar to neck bone
    if (neckBoneRef.current && collarGroupRef.current) {
      const neckWorldPos = new THREE.Vector3();
      const neckWorldQuat = new THREE.Quaternion();
      neckBoneRef.current.getWorldPosition(neckWorldPos);
      neckBoneRef.current.getWorldQuaternion(neckWorldQuat);

      collarGroupRef.current.position.copy(neckWorldPos);
      collarGroupRef.current.quaternion.copy(neckWorldQuat);
    }
  });

  return (
    <>
      {/* 3D Rigged Character Base */}
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
            roughness={0.42}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Soft Natural Bevel Trim */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.57, 0.74]} />
          <meshStandardMaterial
            color="#9e6a4b"
            roughness={0.6}
            metalness={0.02}
          />
        </mesh>
      </group>

      {/* Smart Business Casual Details: Shirt Collar on Neck */}
      <group ref={collarGroupRef}>
        <mesh position={[0, 0.02, 0.04]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.26, 0.06, 0.08]} />
          <meshStandardMaterial color="#172554" roughness={0.8} />
        </mesh>
      </group>

      {/* Professional Wristwatch on Left Wrist */}
      <group ref={watchGroupRef} scale={0.7}>
        {/* Leather Strap */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.075, 0.04, 16]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.7} />
        </mesh>
        {/* Stainless Steel Watch Case */}
        <mesh position={[0, 0.078, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.12} />
        </mesh>
        {/* Sapphire Blue Watch Dial */}
        <mesh position={[0, 0.086, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.005, 20]} />
          <meshStandardMaterial color="#0284c7" metalness={0.3} roughness={0.1} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/character.glb");
