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
      {/* Dark Cyber Obsidian Glass Workstation Desk */}
      <RoundedBox args={[3.6, 0.06, 1.3]} radius={0.03} smoothness={4} receiveShadow>
        <meshStandardMaterial
          color="#070d1e"
          roughness={0.15}
          metalness={0.7}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Cybernetic Desk Edge Neon Strip */}
      <mesh position={[0, -0.01, 0.65]}>
        <boxGeometry args={[3.62, 0.02, 0.02]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Holographic Glowing Laser Keyboard */}
      <mesh position={[0, 0.04, 0.35]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[1.4, 0.55]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.65}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Holographic Center Code Display */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} position={[0, 0.85, 0.1]}>
        <RoundedBox args={[2.2, 1.3, 0.02]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#050a17"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Display Border */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[2.16, 1.26]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Code Content */}
        <Text
          position={[-0.95, 0.42, 0.03]}
          fontSize={0.075}
          color="#00f0ff"
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
          color="#10b981"
          anchorX="left"
          anchorY="middle"
        >
          [KAFKA: 48,200 msg/sec &bull; LATENCY: 22ms &bull; CLUSTER: HEALTHY]
        </Text>
      </Float>

      {/* Left Auxiliary Holographic Monitor */}
      <Float
        speed={1.8}
        rotationIntensity={0.12}
        floatIntensity={0.25}
        position={[-1.4, 0.7, 0.3]}
        rotation={[0, 0.35, 0]}
      >
        <RoundedBox args={[1.2, 0.9, 0.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#050a17"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[1.16, 0.86]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.35} />
        </mesh>

        <Text
          position={[-0.5, 0.28, 0.03]}
          fontSize={0.065}
          color="#a855f7"
          anchorX="left"
          anchorY="middle"
        >
          // K8s Cluster Pods
        </Text>
        <Text
          position={[-0.5, 0.05, 0.03]}
          fontSize={0.055}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          {`NAME          READY  STATUS\nada-api-prod  12/12  Running\nkafka-broker  3/3    Running\nplaywright-qa 4/4    Passed`}
        </Text>
      </Float>

      {/* Right Auxiliary Holographic Monitor */}
      <Float
        speed={1.6}
        rotationIntensity={0.12}
        floatIntensity={0.25}
        position={[1.4, 0.7, 0.3]}
        rotation={[0, -0.35, 0]}
      >
        <RoundedBox args={[1.2, 0.9, 0.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial
            color="#050a17"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[1.16, 0.86]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.35} />
        </mesh>

        <Text
          position={[-0.5, 0.28, 0.03]}
          fontSize={0.065}
          color="#f59e0b"
          anchorX="left"
          anchorY="middle"
        >
          // MySQL Replication
        </Text>
        <Text
          position={[-0.5, 0.05, 0.03]}
          fontSize={0.055}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          {`Master_Log_Pos: 107429\nSlave_IO_Running: Yes\nSlave_SQL_Running: Yes\nSeconds_Behind: 0`}
        </Text>
      </Float>
    </group>
  );
}
