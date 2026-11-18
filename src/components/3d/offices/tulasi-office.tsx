"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface TulasiOfficeProps {
  visible: boolean;
}

export function TulasiOffice({ visible }: TulasiOfficeProps) {
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
      {/* Enterprise Agri-Industrial Office Lighting */}
      <directionalLight position={[-4, 8, 4]} intensity={visible ? 2.5 : 0} color="#fef08a" />
      <pointLight position={[0, 4, -2]} intensity={visible ? 2.0 : 0} color="#10b981" />

      {/* Operations Overview Display Wall */}
      <group position={[0, 1.6, -2.4]}>
        <RoundedBox args={[4.8, 2.2, 0.08]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#052e16" metalness={0.8} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[4.65, 2.05]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.25} />
        </mesh>
        <Text
          position={[-2.1, 0.8, 0.06]}
          fontSize={0.12}
          color="#34d399"
          anchorX="left"
        >
          TULASI TECHNOLOGIES // ENTERPRISE ERP FLOOR
        </Text>
        <Text
          position={[-2.1, 0.35, 0.06]}
          fontSize={0.075}
          color="#f8fafc"
          anchorX="left"
        >
          {`Role: Software Developer (Full-Time | Dec 2021 - Oct 2024 &bull; 2 yrs 11 mos)\nDeliverables: Godrej Foods / Central Poultry ERP & SBL Food and Beverage\nStack: Python, Django, DRF, FastAPI, React.js, Apache Kafka, AWS IAM, Docker`}
        </Text>
        <Text
          position={[-2.1, -0.45, 0.06]}
          fontSize={0.075}
          color="#facc15"
          anchorX="left"
        >
          [AGRI-SUPPLY CHAIN &bull; HATCHERY TO SALE &bull; MULTI-TENANT REPLICATION]
        </Text>
      </group>

      {/* Industrial Workstations */}
      <mesh position={[-1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Screens with Poultry & Beverage Telemetry */}
      <mesh position={[-1.8, 0.85, -0.9]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#059669" emissive="#047857" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.8, 0.85, -0.9]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
