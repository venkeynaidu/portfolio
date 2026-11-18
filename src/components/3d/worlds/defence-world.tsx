"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface DefenceWorldProps {
  visible: boolean;
}

// 3D Circular Radar Display with Rotating Sweep Beam and Blips
function RadarSweepDisplay({ position }: { position: [number, number, number] }) {
  const sweepRef = useRef<THREE.Mesh>(null!);
  const blipRef1 = useRef<THREE.Mesh>(null!);
  const blipRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sweepRef.current) {
      sweepRef.current.rotation.z = -t * 2.2;
    }
    if (blipRef1.current) {
      const pulse = Math.abs(Math.sin(t * 3));
      blipRef1.current.scale.setScalar(0.8 + pulse * 0.4);
    }
    if (blipRef2.current) {
      const pulse = Math.abs(Math.cos(t * 2.5));
      blipRef2.current.scale.setScalar(0.8 + pulse * 0.4);
    }
  });

  return (
    <group position={position} rotation={[-0.35, 0, 0]}>
      {/* Outer Console Ring */}
      <mesh receiveShadow>
        <torusGeometry args={[1.2, 0.08, 16, 48]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Radar Phosphor Screen */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[1.18, 48]} />
        <meshBasicMaterial color="#022c22" />
      </mesh>

      {/* Concentric Range Rings */}
      {[0.35, 0.65, 0.95].map((r, i) => (
        <mesh key={i} position={[0, 0, 0.01]}>
          <ringGeometry args={[r - 0.01, r, 48]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Crosshairs */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[2.3, 0.01]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[0.01, 2.3]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
      </mesh>

      {/* Rotating Sweep Beam */}
      <mesh ref={sweepRef} position={[0, 0, 0.02]}>
        <ringGeometry args={[0, 1.15, 32, 1, 0, 0.6]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Target Blips */}
      <mesh ref={blipRef1} position={[0.45, 0.52, 0.03]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh ref={blipRef2} position={[-0.6, -0.3, 0.03]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

// Wireframe Satellite Telemetry Globe
function SatelliteTelemetryGlobe({ position }: { position: [number, number, number] }) {
  const globeRef = useRef<THREE.Group>(null!);
  const orbitRef = useRef<THREE.Group>(null!);
  const satelliteRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.15;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = t * 0.25;
      orbitRef.current.rotation.x = 0.4;
    }
    if (satelliteRef.current) {
      satelliteRef.current.position.x = Math.cos(t * 1.2) * 1.1;
      satelliteRef.current.position.y = Math.sin(t * 1.2) * 1.1;
    }
  });

  return (
    <group position={position}>
      {/* Wireframe Tactical Globe */}
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[0.75, 24, 24]} />
          <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.73, 16, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>

      {/* Satellite Orbit Rings */}
      <group ref={orbitRef}>
        <mesh>
          <ringGeometry args={[1.08, 1.1, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Active Satellite Node */}
        <mesh ref={satelliteRef}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <Text
        position={[0, -0.95, 0]}
        fontSize={0.09}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        ADA TELEMETRY FEED
      </Text>
    </group>
  );
}

// Secure Air-Gapped Topology Cluster (0 Internet Egress)
function AirGappedTopologyCluster({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Server Rack Node */}
      <RoundedBox args={[0.9, 1.4, 0.5]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      {/* Glowing Status LED Arrays */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((y, i) => (
        <group key={i} position={[0, y, 0.26]}>
          <mesh position={[-0.25, 0, 0]}>
            <circleGeometry args={[0.02, 12]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[0.02, 12]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.25, 0, 0]}>
            <circleGeometry args={[0.02, 12]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
      ))}
      <Text
        position={[0, -0.85, 0]}
        fontSize={0.075}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
      >
        AIR-GAPPED OFFLINE CLUSTER
      </Text>
    </group>
  );
}

export function DefenceWorld({ visible }: DefenceWorldProps) {
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
      {/* Command Center Blue & Emerald Lighting */}
      <directionalLight position={[0, 8, 4]} intensity={visible ? 2.6 : 0} color="#38bdf8" castShadow />
      <pointLight position={[0, 3, -1]} intensity={visible ? 2.0 : 0} color="#10b981" />

      {/* Centerpiece: Tactical Radar Display */}
      <RadarSweepDisplay position={[-1.6, 1.1, -0.6]} />

      {/* Satellite Orbital Telemetry Sphere */}
      <SatelliteTelemetryGlobe position={[1.8, 1.3, -0.8]} />

      {/* Air-Gapped Secure Defense Server Rack */}
      <AirGappedTopologyCluster position={[0, 0.7, -1.8]} />

      {/* Floating ADA VCS & PMS Mission Hologram */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 2.7, -0.6]}>
        <RoundedBox args={[3.4, 1.45, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#022c22"
            roughness={0.18}
            metalness={0.85}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.34, 1.39]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.35} />
        </mesh>
        <Text
          position={[-1.55, 0.5, 0.035]}
          fontSize={0.09}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          // AERONAUTICAL DEVELOPMENT AGENCY (ADA)
        </Text>
        <Text
          position={[-1.55, 0.2, 0.035]}
          fontSize={0.065}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`VCS: Air-Gapped Jitsi WebRTC &bull; Auto AI Minutes of Meeting (MoM)\nPMS: Mission Sprint Tracking &bull; Kafka Event Distribution\nEgress Status: STRICT 0.0.0.0/0 BLOCK &bull; 100% Defense Intranet`}
        </Text>
        <Text
          position={[-1.55, -0.28, 0.035]}
          fontSize={0.062}
          color="#fbbf24"
          anchorX="left"
          anchorY="middle"
        >
          [CLEARED FOR OFFLINE DEPLOYMENT &bull; FASTAPI + MYSQL + PLAYWRIGHT]
        </Text>
        <Text
          position={[-1.55, -0.5, 0.035]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Architected by Garaga Venkatesh &bull; MicroGenesis Techsoft
        </Text>
      </Float>
    </group>
  );
}
