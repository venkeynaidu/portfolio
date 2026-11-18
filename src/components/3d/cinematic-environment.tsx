"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

// Executive Office Glass Partition Wall with Black Aluminum Mullions
function GlassPartitionWall() {
  return (
    <group position={[1.8, 0.4, -1.8]} rotation={[0, -0.25, 0]}>
      {/* Clear Architectural Glass Panels */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.04, 4.4, 4.8]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.25}
          transmission={0.92}
          roughness={0.05}
          ior={1.5}
          thickness={0.08}
        />
      </mesh>

      {/* Black Aluminum Structural Mullions / Frame */}
      {/* Top and Bottom Base Rails */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[0.07, 0.08, 4.84]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[0.07, 0.08, 4.84]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Vertical Mullion Posts */}
      {[-2.3, -1.15, 0, 1.15, 2.3].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0, zPos]}>
          <boxGeometry args={[0.06, 4.4, 0.06]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Horizontal Divider Rail (At standard door transom height) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.06, 0.05, 4.8]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Diagonal Window Sunlight Shadow Strips across the Floor (as in reference photo)
function SunlightFloorShadows() {
  return (
    <group position={[0.6, -1.84, 0.2]} rotation={[-Math.PI / 2, 0, -0.42]}>
      {[-2.2, -1.4, -0.6, 0.2, 1.0, 1.8, 2.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <planeGeometry args={[0.42, 6.5]} />
          <meshBasicMaterial
            color="#fff8ed"
            transparent
            opacity={0.16}
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
    <group position={[0, 0.6, -4.6]}>
      {/* High-Resolution Executive Conference & City Skyline Backdrop */}
      <mesh>
        <planeGeometry args={[14.2, 10.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Subtle Depth Gradient Overlay at Edges */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[14.2, 10.6]} />
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

// Floating Subtle Ambient Light Specks in Sunlight
function OfficeSunlightDust({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 10 + 1;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 6 + 0.5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#fef08a"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  const sunLightRef = useRef<THREE.DirectionalLight>(null!);

  useFrame((_, delta) => {
    if (sunLightRef.current) {
      // Dynamic sunlight intensity across scenes
      const targetIntensity = sceneIndex === 2 ? 3.2 : sceneIndex === 5 ? 2.9 : 2.6;
      sunLightRef.current.intensity = THREE.MathUtils.lerp(
        sunLightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <>
      {/* Natural Daylight Sky Tone */}
      <color attach="background" args={["#e2e8f0"]} />

      {/* Photorealistic Executive Conference Room & Skyline Backdrop */}
      <OfficePanoramaBackdrop />

      {/* Daylight Interior Ambient Illumination */}
      <ambientLight intensity={1.15} color="#f8fafc" />

      {/* Natural Sun Light Streaming Through Window (from the right, as in reference) */}
      <directionalLight
        ref={sunLightRef}
        position={[7, 9, 4]}
        intensity={2.6}
        color="#fffbeb"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft Skylight Fill from City Horizon */}
      <directionalLight position={[-6, 5, 2]} intensity={0.9} color="#bae6fd" />

      {/* Warm Floor Bounce Light */}
      <pointLight position={[1, -1.2, 0]} intensity={0.7} color="#fed7aa" />

      {/* Executive Office Floor (Warm neutral loop-pile carpet matching photo) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
        receiveShadow
      >
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial
          color="#cfc5bb"
          roughness={0.42}
          metalness={0.05}
        />
      </mesh>

      {/* Diagonal Sunlight Patches on Floor */}
      <SunlightFloorShadows />

      {/* 3D Glass Partition Wall with Black Aluminum Mullions */}
      <GlassPartitionWall />

      {/* Modular Acoustic Tile Ceiling at y = 2.7 */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 2.7, 0]}
      >
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.9}
        />
      </mesh>

      {/* Linear LED Pendant Fixture Hanging from Ceiling */}
      <group position={[1.4, 2.1, -1.2]} rotation={[0, -0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.04, 0.04, 2.8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[0.03, 0.01, 2.76]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Support Rods */}
        <mesh position={[0, 0.3, -1.1]}>
          <cylinderGeometry args={[0.005, 0.005, 0.6, 8]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        <mesh position={[0, 0.3, 1.1]}>
          <cylinderGeometry args={[0.005, 0.005, 0.6, 8]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
      </group>

      {/* Subtle Dust Motes in Sunlight */}
      <OfficeSunlightDust count={50} />
    </>
  );
}

useTexture.preload("/executive-office-bg.jpg");
