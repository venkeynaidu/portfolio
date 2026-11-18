"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface PoultryWorldProps {
  visible: boolean;
}

// Procedural Animated Chicken
function AnimatedChicken({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  peckSpeed = 2.5,
  phaseOffset = 0,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  peckSpeed?: number;
  phaseOffset?: number;
}) {
  const chickenRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const leftLegRef = useRef<THREE.Group>(null!);
  const rightLegRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * peckSpeed + phaseOffset;
    if (chickenRef.current) {
      // Gentle walk / hop forward and back
      chickenRef.current.position.y = position[1] + Math.abs(Math.sin(t * 1.8)) * 0.04;
      chickenRef.current.position.z = position[2] + Math.sin(t * 0.5) * 0.25;
    }
    if (headRef.current) {
      // Natural bobbing and pecking rotation
      headRef.current.rotation.x = 0.2 + Math.max(0, Math.sin(t * 2)) * 0.6;
    }
    if (leftLegRef.current && rightLegRef.current) {
      // Alternating leg swing
      leftLegRef.current.rotation.x = Math.sin(t * 1.8) * 0.4;
      rightLegRef.current.rotation.x = -Math.sin(t * 1.8) * 0.4;
    }
  });

  return (
    <group ref={chickenRef} position={position} rotation={rotation} scale={scale}>
      {/* Chicken Body */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.7} />
      </mesh>

      {/* Tail Feathers */}
      <mesh position={[0, 0.36, -0.2]} rotation={[0.4, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.22, 8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>

      {/* Wings */}
      <mesh position={[0.2, 0.28, 0]} rotation={[0, 0, 0.2]} castShadow>
        <sphereGeometry args={[0.07, 0.16, 0.12, 12, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, 0.28, 0]} rotation={[0, 0, -0.2]} castShadow>
        <sphereGeometry args={[0.07, 0.16, 0.12, 12, 12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
      </mesh>

      {/* Head and Neck */}
      <group ref={headRef} position={[0, 0.42, 0.16]}>
        <mesh castShadow>
          <sphereGeometry args={[0.11, 14, 14]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
        {/* Red Comb */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.03, 0.08, 0.12]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
        {/* Yellow Beak */}
        <mesh position={[0, -0.01, 0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.04, 0.1, 8]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.08, 0.03, 0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.08, 0.03, 0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLegRef} position={[0.08, 0.12, 0]}>
        <mesh position={[0, -0.07, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.14, 8]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.14, 0.04]}>
          <boxGeometry args={[0.06, 0.01, 0.08]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[-0.08, 0.12, 0]}>
        <mesh position={[0, -0.07, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.14, 8]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.14, 0.04]}>
          <boxGeometry args={[0.06, 0.01, 0.08]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Hatching Baby Chick with Wobbling Eggshell
function HatchingEggAndChick({ position }: { position: [number, number, number] }) {
  const eggGroupRef = useRef<THREE.Group>(null!);
  const topShellRef = useRef<THREE.Mesh>(null!);
  const chickRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 1.8;
    if (eggGroupRef.current) {
      // Anticipation wobble
      eggGroupRef.current.rotation.z = Math.sin(t * 3) * 0.12;
      eggGroupRef.current.rotation.x = Math.cos(t * 2.5) * 0.08;
    }
    if (topShellRef.current) {
      // Shell cracks open and lifts
      const openAmount = (Math.sin(t) + 1) * 0.5; // 0 to 1
      topShellRef.current.position.y = 0.28 + openAmount * 0.18;
      topShellRef.current.rotation.x = openAmount * 0.5;
    }
    if (chickRef.current) {
      // Chick peeks out and bobs
      const peek = (Math.sin(t) + 1) * 0.5;
      chickRef.current.position.y = 0.08 + peek * 0.14;
      chickRef.current.rotation.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Nesting Straw Bed */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.08, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.9} />
      </mesh>

      <group ref={eggGroupRef} position={[0, 0.06, 0]}>
        {/* Bottom Eggshell */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.4} />
        </mesh>

        {/* Baby Yellow Chick Inside */}
        <group ref={chickRef} position={[0, 0.1, 0]}>
          {/* Chick Body */}
          <mesh castShadow>
            <sphereGeometry args={[0.13, 14, 14]} />
            <meshStandardMaterial color="#facc15" roughness={0.6} />
          </mesh>
          {/* Chick Head */}
          <mesh position={[0, 0.12, 0.06]} castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#fde047" roughness={0.6} />
          </mesh>
          {/* Beak */}
          <mesh position={[0, 0.11, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.025, 0.06, 6]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          {/* Eyes */}
          <mesh position={[0.05, 0.14, 0.12]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[-0.05, 0.14, 0.12]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Top Eggshell (Lifting/Opening) */}
        <mesh ref={topShellRef} position={[0, 0.28, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// Egg Sorting Conveyor
function EggSortingConveyor({ position }: { position: [number, number, number] }) {
  const eggsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (eggsRef.current) {
      const t = state.clock.getElapsedTime() * 0.6;
      eggsRef.current.children.forEach((egg, idx) => {
        // Continuous cycle along conveyor track
        const xOffset = ((t + idx * 0.4) % 2.4) - 1.2;
        egg.position.x = xOffset;
      });
    }
  });

  return (
    <group position={position}>
      {/* Conveyor Belt Table */}
      <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.08, 0.55]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Moving Belt Rubber Strip */}
      <mesh position={[0, 0.445, 0]} receiveShadow>
        <boxGeometry args={[2.76, 0.02, 0.48]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Side Guide Rails */}
      <mesh position={[0, 0.48, 0.26]}>
        <boxGeometry args={[2.8, 0.06, 0.03]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.48, -0.26]}>
        <boxGeometry args={[2.8, 0.06, 0.03]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Legs */}
      <mesh position={[1.2, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#475569" metalness={0.5} />
      </mesh>
      <mesh position={[-1.2, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#475569" metalness={0.5} />
      </mesh>

      {/* Moving Eggs Along Conveyor */}
      <group ref={eggsRef} position={[0, 0.53, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} rotation={[0, 0, Math.PI / 2]} scale={[0.09, 0.13, 0.09]} castShadow>
            <sphereGeometry args={[1, 14, 14]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function PoultryWorld({ visible }: PoultryWorldProps) {
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
      {/* Warm Farm Sun Light */}
      <directionalLight position={[6, 8, 4]} intensity={visible ? 2.4 : 0} color="#fef08a" castShadow />
      <ambientLight intensity={visible ? 0.9 : 0} color="#fef9c3" />

      {/* Wooden Barn Perimeter Beams */}
      <mesh position={[-3.6, 1.8, -2.5]} castShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.85} />
      </mesh>
      <mesh position={[3.6, 1.8, -2.5]} castShadow>
        <boxGeometry args={[0.2, 3.6, 0.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.5, -2.5]} castShadow>
        <boxGeometry args={[7.4, 0.2, 0.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.85} />
      </mesh>

      {/* Farm Fence Rails */}
      <mesh position={[0, 0.45, -2.4]} receiveShadow>
        <boxGeometry args={[7.2, 0.08, 0.04]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.85, -2.4]} receiveShadow>
        <boxGeometry args={[7.2, 0.08, 0.04]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>

      {/* Feed Silo Cylinder */}
      <group position={[-3.2, 0, -1.8]}>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 2.4, 20]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 3.1, 0]} castShadow>
          <coneGeometry args={[0.65, 0.6, 20]} />
          <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.62, 0.2, 0.4, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
        <Text
          position={[0, 1.8, 0.62]}
          fontSize={0.16}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          FEED SILO #1
        </Text>
      </group>

      {/* Animated Walking & Pecking Chickens */}
      <AnimatedChicken position={[-1.6, 0, -0.6]} rotation={[0, 0.4, 0]} scale={1.1} peckSpeed={2.2} />
      <AnimatedChicken position={[1.4, 0, -0.4]} rotation={[0, -0.7, 0]} scale={1.0} peckSpeed={2.6} phaseOffset={1.2} />
      <AnimatedChicken position={[-0.4, 0, 0.8]} rotation={[0, 0.1, 0]} scale={0.95} peckSpeed={3.0} phaseOffset={2.5} />
      <AnimatedChicken position={[2.2, 0, 0.5]} rotation={[0, -1.2, 0]} scale={1.05} peckSpeed={2.0} phaseOffset={0.8} />

      {/* Hatching Baby Chick Nesting Area */}
      <HatchingEggAndChick position={[-1.2, 0, 0.6]} />

      {/* Nesting Boxes with Golden Eggs */}
      <group position={[2.6, 0, -1.5]}>
        <RoundedBox args={[1.2, 0.6, 0.6]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#854d0e" roughness={0.9} />
        </RoundedBox>
        {/* Golden Nest Straw */}
        <mesh position={[0, 0.31, 0]}>
          <boxGeometry args={[1.1, 0.04, 0.5]} />
          <meshStandardMaterial color="#eab308" roughness={0.8} />
        </mesh>
        {/* Eggs in Nest */}
        <mesh position={[-0.3, 0.4, 0.08]} rotation={[0, 0, 0.2]} scale={[0.08, 0.12, 0.08]} castShadow>
          <sphereGeometry args={[1, 14, 14]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.35} />
        </mesh>
        <mesh position={[0.2, 0.4, -0.05]} rotation={[0.2, 0, -0.3]} scale={[0.08, 0.12, 0.08]} castShadow>
          <sphereGeometry args={[1, 14, 14]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.42, 0]} rotation={[0, 0.5, 0]} scale={[0.085, 0.13, 0.085]} castShadow>
          <sphereGeometry args={[1, 14, 14]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.35} />
        </mesh>
      </group>

      {/* Automated Egg Sorting Conveyor */}
      <EggSortingConveyor position={[0.5, 0, -1.2]} />

      {/* Floating Poultry ERP Live Telemetry Hologram */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 2.5, -0.8]}>
        <RoundedBox args={[3.2, 1.4, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#064e3b"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.14, 1.34]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
        </mesh>
        <Text
          position={[-1.45, 0.5, 0.035]}
          fontSize={0.09}
          color="#6ee7b7"
          anchorX="left"
          anchorY="middle"
        >
          // GODREJ FOODS &amp; CENTRAL POULTRY MALAWI ERP
        </Text>
        <Text
          position={[-1.45, 0.2, 0.035]}
          fontSize={0.065}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
        >
          {`Hatchability Index: 98.4% (Optimal)\nBroiler Feed FCR: 1.42 (Target Met)\nHouse Temperature: 32.5°C | Ingestion: 42,800 eggs/day`}
        </Text>
        <Text
          position={[-1.45, -0.28, 0.035]}
          fontSize={0.062}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          [KAFKA PIPELINE: HATCHERY &rarr; LOGISTICS &rarr; SALES ACTIVE]
        </Text>
        <Text
          position={[-1.45, -0.5, 0.035]}
          fontSize={0.06}
          color="#93c5fd"
          anchorX="left"
          anchorY="middle"
        >
          Automated multi-facility flock lifecycle tracking by Garaga Venkatesh
        </Text>
      </Float>
    </group>
  );
}
