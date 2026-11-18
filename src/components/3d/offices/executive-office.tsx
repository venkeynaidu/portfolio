"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface ExecutiveOfficeProps {
  visible: boolean;
  /** "welcome" for the opening meeting, "farewell" for the closing scene */
  mode: "welcome" | "farewell";
}

/** Premium executive office used to open and close the tour. */
export function ExecutiveOffice({ visible, mode }: ExecutiveOfficeProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const backdrop = useTexture("/executive-office-bg.jpg");
  backdrop.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = visible ? 1 : 0.0001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 3.5);
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]}>
      <directionalLight position={[5, 7, 4]} intensity={visible ? 1.8 : 0} color="#fff7ed" castShadow />

      {/* Photographic executive floor backdrop (glass walls, city skyline) */}
      <mesh position={[0, 3.2, -5]}>
        <planeGeometry args={[13.3, 10]} />
        <meshBasicMaterial map={backdrop} color="#d8d8d8" />
      </mesh>

      {/* Warm wood floor in front of the backdrop */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, -1]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#d6c7b2" roughness={0.6} />
      </mesh>

      {/* Executive desk */}
      <group position={[mode === "welcome" ? 2.2 : -1.7, 0, -1.2]}>
        <RoundedBox args={[1.9, 0.07, 0.85]} radius={0.02} position={[0, 0.78, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#3f2a1d" roughness={0.35} metalness={0.1} />
        </RoundedBox>
        <mesh position={[-0.85, 0.38, 0]} castShadow>
          <boxGeometry args={[0.06, 0.76, 0.75]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.85, 0.38, 0]} castShadow>
          <boxGeometry args={[0.06, 0.76, 0.75]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Laptop */}
        <group position={[-0.2, 0.82, 0.05]}>
          <mesh>
            <boxGeometry args={[0.5, 0.015, 0.34]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.16, -0.17]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[0.5, 0.32, 0.012]} />
            <meshStandardMaterial color="#0f172a" emissive="#0ea5e9" emissiveIntensity={0.35} />
          </mesh>
        </group>
        {/* Coffee cup */}
        <mesh position={[0.5, 0.86, 0.15]} castShadow>
          <cylinderGeometry args={[0.045, 0.038, 0.1, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Name plate */}
        <group position={[0.2, 0.84, 0.32]} rotation={[-0.3, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.55, 0.08, 0.02]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
          </mesh>
          <Text position={[0, 0, 0.012]} fontSize={0.035} color="#fbbf24" anchorX="center">
            GARAGA VENKATESH
          </Text>
        </group>
      </group>

      {/* Indoor plant */}
      <group position={[mode === "welcome" ? -2.4 : 2.4, 0, -1.6]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.16, 0.5, 20]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.5} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.3) * 0.12, 0.75 + i * 0.08, Math.sin(i * 1.3) * 0.12]} castShadow>
            <sphereGeometry args={[0.2 - i * 0.02, 12, 12]} />
            <meshStandardMaterial color="#166534" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Welcome sign */}
      <Text position={[mode === "welcome" ? 1.6 : 0, 2.55, -2.2]} fontSize={0.12} color="#0f172a" anchorX="center">
        {mode === "welcome" ? "WELCOME — LET ME SHOW YOU AROUND" : "THANK YOU FOR VISITING — LET'S BUILD TOGETHER"}
      </Text>
    </group>
  );
}
