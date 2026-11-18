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

  // Load authentic project screenshots
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
            color="#070d1e"
            roughness={0.2}
            metalness={0.7}
          />
        </RoundedBox>

        {/* Screenshot Texture Display */}
        <mesh position={[0, 0.06, 0.026]}>
          <planeGeometry args={[2.36, 1.22]} />
          <meshBasicMaterial map={textureProgress} />
        </mesh>

        <mesh position={[0, 0.06, 0.028]}>
          <planeGeometry args={[2.38, 1.24]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.3} />
        </mesh>

        <Text
          position={[-1.15, -0.6, 0.03]}
          fontSize={0.09}
          color="#00f0ff"
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
            color="#070d1e"
            roughness={0.2}
            metalness={0.7}
          />
        </RoundedBox>

        {/* Screenshot Texture Display */}
        <mesh position={[0, 0.05, 0.026]}>
          <planeGeometry args={[2.26, 1.18]} />
          <meshBasicMaterial map={textureConnection} />
        </mesh>

        <mesh position={[0, 0.05, 0.028]}>
          <planeGeometry args={[2.28, 1.2]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
        </mesh>

        <Text
          position={[-1.1, -0.58, 0.03]}
          fontSize={0.085}
          color="#a855f7"
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
            color="#070d1e"
            roughness={0.2}
            metalness={0.7}
          />
        </RoundedBox>

        <mesh position={[0, 0.05, 0.026]}>
          <planeGeometry args={[2.08, 1.1]} />
          <meshBasicMaterial map={textureHistory} />
        </mesh>

        <mesh position={[0, 0.05, 0.028]}>
          <planeGeometry args={[2.1, 1.12]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
        </mesh>

        <Text
          position={[-1.0, -0.54, 0.03]}
          fontSize={0.08}
          color="#f59e0b"
          anchorX="left"
          anchorY="middle"
        >
          Kafka Event Streaming &amp; Telemetry
        </Text>
      </Float>
    </group>
  );
}
