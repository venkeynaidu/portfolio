"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface SpatialProjectsProps {
  visible: boolean;
}

export function SpatialProjects({ visible }: SpatialProjectsProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Load real project screenshots copied from project assets
  const [textureProgress, textureConnection, textureHistory] = useTexture([
    "/projects/progress-results.png",
    "/projects/connection.png",
    "/projects/run-history.png",
  ]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetScale = visible ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3.8
    );

    // Subtle floating breathing
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.9) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0.7, 0, 0]}>
      {/* Exhibition Panel 1: ADA Project Management System */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.3} position={[0.8, 0.75, 0.2]}>
        <RoundedBox args={[2.5, 1.45, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.15}
            metalness={0.3}
          />
        </RoundedBox>

        {/* Screenshot Texture Display */}
        <mesh position={[0, 0.06, 0.026]}>
          <planeGeometry args={[2.36, 1.22]} />
          <meshBasicMaterial map={textureProgress} />
        </mesh>

        <Text
          position={[-1.15, -0.6, 0.03]}
          fontSize={0.09}
          color="#0f172a"
          anchorX="left"
          anchorY="middle"
        >
          ADA Project Management System (PMS)
        </Text>
      </Float>

      {/* Exhibition Panel 2: Industrial ERP Workflow Engine */}
      <Float
        speed={1.9}
        rotationIntensity={0.2}
        floatIntensity={0.35}
        position={[1.1, -0.9, 0.35]}
        rotation={[0, -0.15, 0]}
      >
        <RoundedBox args={[2.4, 1.4, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.15}
            metalness={0.3}
          />
        </RoundedBox>

        {/* Screenshot Texture Display */}
        <mesh position={[0, 0.05, 0.026]}>
          <planeGeometry args={[2.26, 1.18]} />
          <meshBasicMaterial map={textureConnection} />
        </mesh>

        <Text
          position={[-1.1, -0.58, 0.03]}
          fontSize={0.085}
          color="#0f172a"
          anchorX="left"
          anchorY="middle"
        >
          Sri Bhagya Lakshmi Enterprises &amp; Poultry ERP
        </Text>
      </Float>

      {/* Exhibition Panel 3: Live Run History & Kafka Telemetry */}
      <Float
        speed={1.4}
        rotationIntensity={0.12}
        floatIntensity={0.25}
        position={[-1.6, -0.2, -0.3]}
        rotation={[0, 0.3, 0]}
      >
        <RoundedBox args={[2.2, 1.3, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.15}
            metalness={0.3}
          />
        </RoundedBox>

        <mesh position={[0, 0.05, 0.026]}>
          <planeGeometry args={[2.08, 1.1]} />
          <meshBasicMaterial map={textureHistory} />
        </mesh>

        <Text
          position={[-1.0, -0.54, 0.03]}
          fontSize={0.08}
          color="#0f172a"
          anchorX="left"
          anchorY="middle"
        >
          Kafka Event Streaming &amp; Telemetry
        </Text>
      </Float>
    </group>
  );
}
