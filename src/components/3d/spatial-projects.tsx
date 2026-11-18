"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface SpatialProjectsProps {
  visible: boolean;
}

const projects3D = [
  {
    title: "ADA Defense PMS",
    subtitle: "Aeronautical Development Agency",
    tag: "Python • Kafka • K8s",
    color: "#3b82f6",
    pos: [1.6, 0.8, -0.2],
  },
  {
    title: "Industrial ERP",
    subtitle: "Sri Bhagya Lakshmi Enterprises",
    tag: "FastAPI • React • AWS",
    color: "#06b6d4",
    pos: [1.8, -0.8, 0.2],
  },
];

export function SpatialProjects({ visible }: SpatialProjectsProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetScale = visible ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3.5
    );

    // Subtle gentle wave
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {projects3D.map((proj, idx) => (
        <Float
          key={proj.title}
          speed={1.5 + idx * 0.4}
          rotationIntensity={0.4}
          floatIntensity={0.6}
          position={proj.pos as [number, number, number]}
        >
          {/* Spatial Glass Card Mesh */}
          <RoundedBox args={[2.5, 1.4, 0.08]} radius={0.06} smoothness={4} castShadow>
            <meshStandardMaterial
              color="#090d16"
              roughness={0.25}
              metalness={0.65}
              transparent
              opacity={0.85}
            />
          </RoundedBox>

          {/* Glowing Border Accent */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[2.46, 1.36]} />
            <meshBasicMaterial
              color={proj.color}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* 3D Typography */}
          <Text
            position={[-1.05, 0.35, 0.06]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
          >
            {proj.title}
          </Text>

          <Text
            position={[-1.05, 0.05, 0.06]}
            fontSize={0.11}
            color="#94a3b8"
            anchorX="left"
            anchorY="middle"
          >
            {proj.subtitle}
          </Text>

          <Text
            position={[-1.05, -0.35, 0.06]}
            fontSize={0.1}
            color={proj.color}
            anchorX="left"
            anchorY="middle"
          >
            {proj.tag}
          </Text>
        </Float>
      ))}
    </group>
  );
}
