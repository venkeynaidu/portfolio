"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

function CyberMatrixParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#00f0ff"), // Neon Cyan
      new THREE.Color("#38bdf8"), // Electric Sky Blue
      new THREE.Color("#a855f7"), // Neon Violet
      new THREE.Color("#10b981"), // Matrix Emerald
      new THREE.Color("#f59e0b"), // Cyber Amber
    ];

    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 18;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12 + 1;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const c = palette[i % palette.length];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [coords, cols];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null!);

  useFrame((_, delta) => {
    if (keyLightRef.current) {
      // Dynamic spotlight intensity by scene
      const targetIntensity = sceneIndex === 2 ? 4.2 : sceneIndex === 5 ? 4.0 : 3.5;
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <>
      {/* Deep Techno Obsidian Cyber Void */}
      <color attach="background" args={["#030712"]} />
      <fogExp2 attach="fog" args={["#030712", 0.048]} />

      {/* Deep Cyber Ambient Lighting */}
      <ambientLight intensity={0.65} color="#0b1736" />

      {/* Main Overhead Cyber Spotlight */}
      <spotLight
        ref={keyLightRef}
        position={[6, 11, 7]}
        angle={0.65}
        penumbra={0.8}
        intensity={3.5}
        color="#00f0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Neon Electric Blue Directional Fill */}
      <directionalLight position={[-7, 6, 4]} intensity={2.2} color="#0ea5e9" />

      {/* Neon Violet Rim Light */}
      <pointLight position={[0, 4, -4]} intensity={3.0} color="#a855f7" />

      {/* Emerald Telemetry Server Glow */}
      <pointLight position={[-4, -1, 3]} intensity={1.8} color="#10b981" />

      {/* Warm Amber Core Pulse */}
      <pointLight position={[4, -1.2, 2.5]} intensity={1.4} color="#f59e0b" />

      {/* Dark Obsidian Reflective Cyber Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.06}
          metalness={0.92}
        />
      </mesh>

      {/* Glowing Cyan & Slate Cyber Grid Plane */}
      <gridHelper
        args={[50, 50, "#00f0ff", "#1e293b"]}
        position={[0, -1.85, 0]}
      />

      {/* Drifting Cyber Data Particles */}
      <CyberMatrixParticles count={130} />
    </>
  );
}
