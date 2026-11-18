"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

function LuminousParticles({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#38bdf8"), // Sky blue
      new THREE.Color("#c084fc"), // Lavender
      new THREE.Color("#fb923c"), // Warm peach
      new THREE.Color("#818cf8"), // Indigo
    ];

    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 10 + 1;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = palette[i % palette.length];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [coords, cols];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null!);

  useFrame((_, delta) => {
    if (keyLightRef.current) {
      // Modulate key light intensity based on active scene
      const targetIntensity = sceneIndex === 2 ? 3.4 : sceneIndex === 5 ? 3.2 : 2.8;
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <>
      {/* Bright Pearl Sky & Atmospheric Fog */}
      <color attach="background" args={["#f8fafc"]} />
      <fogExp2 attach="fog" args={["#f1f5f9", 0.045]} />

      {/* Daylight Ambient Illumination */}
      <ambientLight intensity={1.05} color="#f8fafc" />

      {/* Main Architectural Key Light with Soft Shadows */}
      <spotLight
        ref={keyLightRef}
        position={[7, 12, 7]}
        angle={0.65}
        penumbra={0.8}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Electric Sky Blue Fill Light */}
      <directionalLight position={[-8, 6, 4]} intensity={1.5} color="#38bdf8" />

      {/* Violet / Lavender Rim Light */}
      <pointLight position={[0, 5, -4.5]} intensity={2.6} color="#c084fc" />

      {/* Warm Peach & Amber Accent Highlight */}
      <pointLight position={[4, -1, 3]} intensity={1.3} color="#fb923c" />

      {/* Luminous Pearl White Architectural Reflective Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
        receiveShadow
      >
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.2}
          metalness={0.25}
        />
      </mesh>

      {/* Clean Subtle Grid Lines on Floor */}
      <gridHelper
        args={[44, 44, "#cbd5e1", "#e2e8f0"]}
        position={[0, -1.85, 0]}
      />

      {/* Floating Luminous Color Dust */}
      <LuminousParticles count={110} />
    </>
  );
}
