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
      {/* Clear Architectural Glass Panels - Pure lightweight standard material */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.03, 4.4, 4.8]} />
        <meshStandardMaterial
          color="#bae6fd"
          transparent
          opacity={0.18}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Black Aluminum Structural Mullions / Frame */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[0.06, 0.08, 4.84]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[0.06, 0.08, 4.84]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Vertical Mullion Posts */}
      {[-2.3, -1.15, 0, 1.15, 2.3].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0, zPos]}>
          <boxGeometry args={[0.05, 4.4, 0.05]} />
          <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Horizontal Divider Rail */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.05, 0.04, 4.8]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Diagonal Window Sunlight Shadow Strips across the Floor (from reference photo)
function SunlightFloorShadows() {
  return (
    <group position={[0.6, -1.84, 0.2]} rotation={[-Math.PI / 2, 0, -0.42]}>
      {[-2.2, -1.4, -0.6, 0.2, 1.0, 1.8, 2.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <planeGeometry args={[0.42, 6.5]} />
          <meshBasicMaterial
            color="#fff8ed"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Executive High-Rise Office Backdrop based on user-supplied reference photo
function OfficePanoramaBackdrop() {
  const texture = useTexture("/executive-office-bg.jpg");

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
    }
  }, [texture]);

  return (
    <group position={[0, 0.5, -4.6]}>
      {/* High-Resolution Executive Conference & City Skyline Backdrop */}
      <mesh>
        <planeGeometry args={[14.2, 10.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  return (
    <>
      {/* Natural Daylight Sky Tone */}
      <color attach="background" args={["#e2e8f0"]} />

      {/* Photorealistic Executive Conference Room & Skyline Backdrop */}
      <OfficePanoramaBackdrop />

      {/* Lightweight Interior Daylight Illumination */}
      <ambientLight intensity={1.2} color="#f8fafc" />

      {/* Natural Sun Light Streaming Through Window */}
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.2}
        color="#fffbeb"
      />

      {/* Soft Skylight Fill from City Horizon */}
      <directionalLight position={[-5, 4, 2]} intensity={0.8} color="#bae6fd" />

      {/* Executive Office Floor (Warm neutral loop-pile carpet matching photo) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
      >
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial
          color="#cfc5bb"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Diagonal Sunlight Patches on Floor */}
      <SunlightFloorShadows />

      {/* Lightweight 3D Glass Partition Wall with Black Aluminum Mullions */}
      <GlassPartitionWall />

      {/* Modular Acoustic Tile Ceiling at y = 2.7 */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 2.7, 0]}
      >
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.9}
        />
      </mesh>

      {/* Linear LED Pendant Fixture Hanging from Ceiling */}
      <group position={[1.4, 2.1, -1.2]} rotation={[0, -0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 0.04, 2.8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.03, 0.01, 2.76]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
}

useTexture.preload("/executive-office-bg.jpg");
