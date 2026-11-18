"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PortraitDepthMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export function PortraitDepthMesh({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: PortraitDepthMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  // Load color and anatomical depth map
  const [colorMap, depthMap] = useTexture([
    "/profile-optimized.jpg",
    "/profile-depth.jpg",
  ]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth subtle idle floating & breathing
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.05;

    // Subtle responsive mouse parallax
    const targetRotY = rotation[1] + (state.pointer.x * 0.18);
    const targetRotX = rotation[0] - (state.pointer.y * 0.12);

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );

    // Smooth opacity transition
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        opacity,
        delta * 4
      );
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 2.5D Depth-Displaced Portrait Mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.4, 3.2, 96, 96]} />
        <meshStandardMaterial
          ref={materialRef}
          map={colorMap}
          displacementMap={depthMap}
          displacementScale={0.32}
          displacementBias={-0.08}
          roughness={0.45}
          metalness={0.12}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cybernetic Rim Frame Accent */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.52, 3.32]} />
        <meshBasicMaterial
          color="#4f46e5"
          wireframe
          transparent
          opacity={0.3 * opacity}
        />
      </mesh>
    </group>
  );
}
