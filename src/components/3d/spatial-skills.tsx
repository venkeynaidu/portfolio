"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

interface SpatialSkillsProps {
  visible: boolean;
}

const skillNodes = [
  { name: "Python 3.12", color: "#38bdf8", pos: [-2.2, 1.4, -0.4], size: 0.28 },
  { name: "Apache Kafka", color: "#f59e0b", pos: [2.2, 1.5, -0.6], size: 0.32 },
  { name: "FastAPI & DRF", color: "#10b981", pos: [-2.4, -0.4, 0.2], size: 0.26 },
  { name: "React.js", color: "#06b6d4", pos: [2.3, -0.3, 0.3], size: 0.3 },
  { name: "Kubernetes", color: "#3b82f6", pos: [0, 2.2, -0.8], size: 0.28 },
  { name: "Docker", color: "#60a5fa", pos: [-1.4, 2.3, -0.7], size: 0.25 },
  { name: "Playwright", color: "#ec4899", pos: [1.4, 2.3, -0.7], size: 0.25 },
  { name: "MySQL", color: "#a855f7", pos: [0, -1.2, -0.6], size: 0.28 },
];

export function SpatialSkills({ visible }: SpatialSkillsProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth opacity & scale transition
    const targetScale = visible ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 4.0
    );

    // Subtle global rotation
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {skillNodes.map((node, i) => (
        <Float
          key={node.name}
          speed={2 + i * 0.3}
          rotationIntensity={0.8}
          floatIntensity={1.2}
          position={node.pos as [number, number, number]}
        >
          <mesh castShadow>
            <icosahedronGeometry args={[node.size, 1]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Glowing wireframe outer orbital ring */}
          <mesh>
            <torusGeometry args={[node.size * 1.6, 0.015, 16, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.4} />
          </mesh>

          {/* 3D Text Label */}
          <Text
            position={[0, -node.size * 1.8, 0]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {node.name}
          </Text>
        </Float>
      ))}
    </group>
  );
}
