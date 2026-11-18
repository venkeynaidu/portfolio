"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface MicrogenesisOfficeProps {
  visible: boolean;
}

export function MicrogenesisOffice({ visible }: MicrogenesisOfficeProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = visible ? 1 : 0.0001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3.5
    );
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]}>
      {/* High-Tech Defence Lab Ambient & Accent Lights */}
      <directionalLight position={[5, 8, 3]} intensity={visible ? 2.5 : 0} color="#38bdf8" />
      <pointLight position={[0, 4, -2]} intensity={visible ? 2.0 : 0} color="#0284c7" />

      {/* Security Barrier & Glass Partitions */}
      <mesh position={[-3.2, 1.4, -2]} receiveShadow>
        <boxGeometry args={[0.08, 2.8, 3.2]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.8}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Aerospace Mission Tracking Display Wall */}
      <group position={[0, 1.6, -2.4]}>
        <RoundedBox args={[4.8, 2.2, 0.08]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#0b1329" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[4.65, 2.05]} />
          <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.25} />
        </mesh>
        <Text
          position={[-2.1, 0.8, 0.06]}
          fontSize={0.12}
          color="#38bdf8"
          anchorX="left"
        >
          MICROGENESIS TECHSOFT // AERONAUTICAL DEV AGENCY (ADA)
        </Text>
        <Text
          position={[-2.1, 0.35, 0.06]}
          fontSize={0.075}
          color="#f8fafc"
          anchorX="left"
        >
          {`Role: Software Engineer (Full-Time | Nov 2024 - Present)\nSystems: Project Management System (PMS) & Video Conference System (VCS)\nStack: Python, Django, DRF, FastAPI, React.js, Apache Kafka, Playwright, K8s`}
        </Text>
        <Text
          position={[-2.1, -0.45, 0.06]}
          fontSize={0.075}
          color="#34d399"
          anchorX="left"
        >
          [AIR-GAPPED DEFENSE FACILITY &bull; AUTOMATED AI MINUTES OF MEETING]
        </Text>
      </group>

      {/* Defense Workstation Consoles */}
      <mesh position={[-1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Dual Curved Monitored Screens on Desk */}
      <mesh position={[-1.8, 0.85, -0.9]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.8, 0.85, -0.9]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
