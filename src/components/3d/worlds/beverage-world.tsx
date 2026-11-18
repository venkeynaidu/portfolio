"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface BeverageWorldProps {
  visible: boolean;
}

// Procedural Beverage Bottle
function BeverageBottle({
  position,
  liquidColor = "#f59e0b",
  fillLevel = 0.85,
}: {
  position: [number, number, number];
  liquidColor?: string;
  fillLevel?: number;
}) {
  return (
    <group position={position}>
      {/* Outer Glass Bottle */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.45, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          roughness={0.05}
          transmission={0.88}
          thickness={0.08}
          ior={1.5}
        />
      </mesh>

      {/* Internal Liquid Mesh */}
      <mesh position={[0, 0.12 + (fillLevel * 0.35) / 2, 0]}>
        <cylinderGeometry args={[0.065, 0.075, fillLevel * 0.35, 14]} />
        <meshStandardMaterial
          color={liquidColor}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.035, 0.07, 0.14, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.35}
          roughness={0.05}
          transmission={0.88}
        />
      </mesh>

      {/* Bottle Cap */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.038, 0.04, 16]} />
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Brand Label Ring */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.18, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Conveyor Track with Moving Bottles and Laser QC Scan
function BottlingConveyorLine({ position }: { position: [number, number, number] }) {
  const bottlesGroupRef = useRef<THREE.Group>(null!);
  const fillerNozzleRef = useRef<THREE.Group>(null!);
  const laserBeamRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Move bottles continuously along conveyor
    if (bottlesGroupRef.current) {
      bottlesGroupRef.current.children.forEach((bottle, i) => {
        const xOffset = ((t * 0.7 + i * 0.45) % 3.6) - 1.8;
        bottle.position.x = xOffset;
      });
    }

    // Oscillate pneumatic liquid filler nozzle up & down
    if (fillerNozzleRef.current) {
      fillerNozzleRef.current.position.y = 0.8 + Math.abs(Math.sin(t * 1.5)) * 0.14;
    }

    // Laser QC scanner sweep
    if (laserBeamRef.current) {
      laserBeamRef.current.position.x = 0.4 + Math.sin(t * 3.5) * 0.22;
      laserBeamRef.current.rotation.z = Math.sin(t * 3.5) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Industrial Stainless Steel Conveyor Frame */}
      <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Moving Chain Belt */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[4.14, 0.02, 0.52]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Polished Guardrails */}
      <mesh position={[0, 0.58, 0.28]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 4.2, 8]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.58, -0.28]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 4.2, 8]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Support Legs */}
      <mesh position={[1.8, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>
      <mesh position={[-1.8, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>

      {/* Moving Bottles on Belt */}
      <group ref={bottlesGroupRef} position={[0, 0.47, 0]}>
        {[
          { color: "#f97316", fill: 0.9 }, // Mango juice
          { color: "#06b6d4", fill: 0.85 }, // Sparkling water
          { color: "#10b981", fill: 0.92 }, // Lime soda
          { color: "#8b5cf6", fill: 0.88 }, // Berry fizz
          { color: "#ef4444", fill: 0.85 }, // Cranberry punch
          { color: "#f59e0b", fill: 0.9 }, // Orange nectar
          { color: "#3b82f6", fill: 0.88 }, // Electrolyte sport
          { color: "#10b981", fill: 0.9 }, // Herbal tonic
        ].map((item, idx) => (
          <BeverageBottle
            key={idx}
            position={[idx * 0.45 - 1.6, 0, 0]}
            liquidColor={item.color}
            fillLevel={item.fill}
          />
        ))}
      </group>

      {/* Automated Liquid Dispensing Station */}
      <group position={[-0.6, 0.48, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        <group ref={fillerNozzleRef}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Liquid Jet Stream */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Laser Quality-Control Scanner */}
      <group position={[0.7, 0.48, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.7]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} />
        </mesh>
        {/* Red Laser Sweep Plane */}
        <mesh ref={laserBeamRef} position={[0, 0.4, 0]}>
          <planeGeometry args={[0.04, 0.5]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 0.4, 0]} intensity={1.5} color="#ef4444" distance={0.8} />
      </group>
    </group>
  );
}

// Beverage Pallet Stack & Closed-Loop Recycling Loop
function WarehousePalletStack({ position }: { position: [number, number, number] }) {
  const recycleIconRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (recycleIconRef.current) {
      recycleIconRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Wooden Pallet Base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.14, 1.2]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      {/* Stacked Crates */}
      <mesh position={[-0.3, 0.28, -0.3]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#0284c7" roughness={0.5} />
      </mesh>
      <mesh position={[0.3, 0.28, -0.3]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#059669" roughness={0.5} />
      </mesh>
      <mesh position={[-0.3, 0.28, 0.3]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} />
      </mesh>
      <mesh position={[0.3, 0.28, 0.3]} castShadow>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#dc2626" roughness={0.5} />
      </mesh>

      {/* Layer 2 Crates */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[1.1, 0.3, 1.1]} />
        <meshStandardMaterial color="#0369a1" roughness={0.5} />
      </mesh>

      {/* Closed-Loop Bottle Recycling Flow Visualizer */}
      <group ref={recycleIconRef} position={[0, 1.3, 0]}>
        <mesh>
          <torusGeometry args={[0.35, 0.04, 16, 32]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.09}
          color="#ecfdf5"
          anchorX="center"
          anchorY="middle"
        >
          &infin; RECYCLE
        </Text>
      </group>
    </group>
  );
}

export function BeverageWorld({ visible }: BeverageWorldProps) {
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
      {/* Production Ambient & Cool Blue Cleanroom Lighting */}
      <directionalLight position={[-4, 7, 5]} intensity={visible ? 2.5 : 0} color="#e0f2fe" castShadow />
      <pointLight position={[0, 4, 0]} intensity={visible ? 1.8 : 0} color="#38bdf8" />

      {/* Bottling Conveyor & Machine Unit */}
      <BottlingConveyorLine position={[0, 0, -0.6]} />

      {/* Warehouse Logistics Pallet Stack & Recycling Indicator */}
      <WarehousePalletStack position={[2.4, 0, -1.2]} />

      {/* Packaging Product Showcase Pedestal */}
      <group position={[-2.4, 0, -1.0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.6, 0.7, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.2} />
        </mesh>
        <pointLight position={[0, 0.9, 0]} intensity={1.5} color="#06b6d4" distance={1.2} />
        <BeverageBottle position={[0, 0.72, 0]} liquidColor="#06b6d4" fillLevel={0.9} />
        <BeverageBottle position={[-0.18, 0.72, -0.15]} liquidColor="#f59e0b" fillLevel={0.88} />
        <BeverageBottle position={[0.18, 0.72, -0.15]} liquidColor="#10b981" fillLevel={0.92} />
      </group>

      {/* SBL ERP Live Operations Hologram Dashboard */}
      <Float speed={1.6} rotationIntensity={0.06} floatIntensity={0.2} position={[0, 2.55, -0.7]}>
        <RoundedBox args={[3.2, 1.45, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#0c4a6e"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.14, 1.39]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>
        <Text
          position={[-1.45, 0.5, 0.035]}
          fontSize={0.09}
          color="#7dd3fc"
          anchorX="left"
          anchorY="middle"
        >
          // SRI BHAGYA LAKSHMI (SBL) FOOD &amp; BEVERAGE ERP
        </Text>
        <Text
          position={[-1.45, 0.2, 0.035]}
          fontSize={0.065}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`Throughput: 12,500 Bottles/Hour &bull; Line Efficiency: 96.8%\nClosed-Loop Reverse Logistics: 8,400 Crates Tracked\nKafka Event Streaming &bull; Multi-Plant MySQL TCL Sync`}
        </Text>
        <Text
          position={[-1.45, -0.28, 0.035]}
          fontSize={0.062}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          [QC STATUS: 99.8% PASS &bull; ZERO TABLE LOCK CONFLICTS]
        </Text>
        <Text
          position={[-1.45, -0.5, 0.035]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          End-to-end production, distribution &amp; recycling architecture
        </Text>
      </Float>
    </group>
  );
}

