"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface HolographicWorkstationProps {
  visible: boolean;
}

export function HolographicWorkstation({ visible }: HolographicWorkstationProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smoothly scale in/out when entering Scene 3
    const targetScale = visible ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 4.0
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.85, 0.75]}>
      {/* Curved Pearl Glass Workstation Desk */}
      <RoundedBox args={[3.6, 0.06, 1.3]} radius={0.03} smoothness={4} receiveShadow>
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.15}
          metalness={0.35}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Cybernetic Desk Edge Light Strip */}
      <mesh position={[0, -0.01, 0.65]}>
        <boxGeometry args={[3.62, 0.02, 0.02]} />
        <meshBasicMaterial color="#0ea5e9" />
      </mesh>

      {/* Holographic Glowing Keyboard */}
      <mesh position={[0, 0.04, 0.35]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[1.4, 0.55]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Holographic Center Code Display */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} position={[0, 0.85, 0.1]}>
        <RoundedBox args={[2.2, 1.3, 0.02]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </RoundedBox>

        {/* Display Border */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[2.16, 1.26]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Code Content */}
        <Text
          position={[-0.95, 0.42, 0.03]}
          fontSize={0.075}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
        >
          // Kafka Event Pipeline &amp; FastAPI Producer
        </Text>

        <Text
          position={[-0.95, 0.22, 0.03]}
          fontSize={0.065}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`from fastapi import FastAPI\nfrom aiokafka import AIOKafkaProducer\n\n@app.post("/api/v1/telemetry")\nasync def emit_telemetry(payload: ADAEvent):\n    await kafka.send("ada.pms.events", payload)`}
        </Text>

        <Text
          position={[-0.95, -0.38, 0.03]}
          fontSize={0.06}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          ⚡ Latency: &lt; 35ms &bull; Playwright E2E: 100% Passed
        </Text>
      </Float>

      {/* Left Screen: Microservices Architecture Diagram */}
      <Float
        speed={1.8}
        rotationIntensity={0.15}
        floatIntensity={0.25}
        position={[-1.75, 0.8, 0.3]}
        rotation={[0, 0.35, 0]}
      >
        <RoundedBox args={[1.3, 1.1, 0.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </RoundedBox>

        <Text
          position={[-0.55, 0.38, 0.03]}
          fontSize={0.07}
          color="#c084fc"
          anchorX="left"
          anchorY="middle"
        >
          Distributed Stack
        </Text>

        <Text
          position={[-0.55, 0.08, 0.03]}
          fontSize={0.058}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
        >
          {`[ Client: ADA ]\n       │\n[ FastAPI Gateway ]\n       │\n[ Kafka Broker ]\n       │\n[ Docker / K8s ]`}
        </Text>
      </Float>

      {/* Right Screen: Core Technologies Matrix */}
      <Float
        speed={1.8}
        rotationIntensity={0.15}
        floatIntensity={0.25}
        position={[1.75, 0.8, 0.3]}
        rotation={[0, -0.35, 0]}
      >
        <RoundedBox args={[1.3, 1.1, 0.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </RoundedBox>

        <Text
          position={[-0.55, 0.38, 0.03]}
          fontSize={0.07}
          color="#fb923c"
          anchorX="left"
          anchorY="middle"
        >
          Verified Skills
        </Text>

        <Text
          position={[-0.55, 0.08, 0.03]}
          fontSize={0.058}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`• Python 3.12 & Django\n• React.js & TS\n• MySQL & ORM tuning\n• AWS IAM & Docker\n• Playwright Automation`}
        </Text>
      </Float>
    </group>
  );
}
