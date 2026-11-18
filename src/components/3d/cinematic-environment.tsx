"use client";

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

// Lightweight Glass Partition Wall with Black Aluminum Mullions
function GlassPartitionWall() {
  return (
    <group position={[1.8, 0.4, -1.8]} rotation={[0, -0.25, 0]}>
      {/* Clear Architectural Glass Panels */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.03, 4.4, 4.8]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.16}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Black Aluminum Structural Mullions / Frame */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[0.06, 0.08, 4.84]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[0.06, 0.08, 4.84]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Vertical Mullion Posts */}
      {[-2.3, -1.15, 0, 1.15, 2.3].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0, zPos]}>
          <boxGeometry args={[0.05, 4.4, 0.05]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}

      {/* Horizontal Divider Rail */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.05, 0.04, 4.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  return (
    <>
      {/* Deep Rich Navy Studio Environment */}
      <color attach="background" args={["#0a0f1d"]} />

      {/* Ambient Daylight & Interior Fill */}
      <ambientLight intensity={1.4} color="#f0f9ff" />

      {/* Main Architectural Key Light */}
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.2}
        color="#ffffff"
      />

      {/* Electric Sky Blue Horizon Rim Light */}
      <directionalLight position={[-6, 4, 2]} intensity={1.5} color="#38bdf8" />

      {/* Vibrant Purple & Emerald Accent Lights for Multi-Color Depth */}
      <pointLight position={[4, 2, -2]} intensity={2.0} color="#a855f7" distance={12} />
      <pointLight position={[-4, 3, -1]} intensity={1.5} color="#10b981" distance={10} />

      {/* Sleek Architectural Studio Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
      >
        <planeGeometry args={[36, 36]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>

      {/* Subtle Studio Floor Grid */}
      <gridHelper
        args={[36, 36, "#38bdf8", "#1e293b"]}
        position={[0, -1.85, 0]}
      />

      {/* 3D Glass Partition Wall with Black Aluminum Mullions */}
      <GlassPartitionWall />

      {/* Linear LED Pendant Fixture Hanging from Ceiling */}
      <group position={[1.4, 2.1, -1.2]} rotation={[0, -0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 0.04, 2.8]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.03, 0.01, 2.76]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
}
