"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ArowanaOfficeProps {
  visible: boolean;
}

export function ArowanaOffice({ visible }: ArowanaOfficeProps) {
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
      {/* Modern Dev Studio Warm Lavender & Cyan Lighting */}
      <directionalLight position={[4, 8, 4]} intensity={visible ? 2.5 : 0} color="#f5d0fe" />
      <pointLight position={[0, 4, -2]} intensity={visible ? 2.0 : 0} color="#a855f7" />

      {/* Dev Studio Main Display Wall */}
      <group position={[0, 1.6, -2.4]}>
        <RoundedBox args={[4.8, 2.2, 0.08]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color="#2e1065" metalness={0.8} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[4.65, 2.05]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.25} />
        </mesh>
        <Text
          position={[-2.1, 0.8, 0.06]}
          fontSize={0.12}
          color="#d8b4fe"
          anchorX="left"
        >
          AROWANA SOFTWARE SOLUTIONS // COLLABORATIVE DEV STUDIO
        </Text>
        <Text
          position={[-2.1, 0.35, 0.06]}
          fontSize={0.075}
          color="#f8fafc"
          anchorX="left"
        >
          {`Role: Junior Software Developer (Full-Time | Sep 2020 - Sep 2021 &bull; 1 yr 1 mo)\nDeliverables: Cartel E-Commerce & Catholica Kalyanavedhika Matrimony Platform\nStack: Python, Django, HTML5, CSS3, JavaScript, MySQL, Git, RESTful APIs`}
        </Text>
        <Text
          position={[-2.1, -0.45, 0.06]}
          fontSize={0.075}
          color="#38bdf8"
          anchorX="left"
        >
          [FOUNDATIONAL ARCHITECTURE &bull; RBAC SECURITY &bull; PAYMENT GATEWAYS]
        </Text>
      </group>

      {/* Studio Workstations */}
      <mesh position={[-1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.8, 0.4, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Screens with Code Review & Git Tree */}
      <mesh position={[-1.8, 0.85, -0.9]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.8, 0.85, -0.9]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.04]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
