"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

function FloatingDust({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 10;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#38bdf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null!);
  const rimLightRef = useRef<THREE.PointLight>(null!);

  useFrame((_, delta) => {
    if (keyLightRef.current) {
      // Modulate key light intensity based on active scene
      const targetIntensity = sceneIndex === 0 ? 3.5 : sceneIndex === 6 ? 4.0 : 2.8;
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <>
      {/* Deep Cinematic Atmosphere */}
      <color attach="background" args={["#030712"]} />
      <fogExp2 attach="fog" args={["#030712", 0.065]} />

      {/* Global Illumination */}
      <ambientLight intensity={0.55} color="#cbd5e1" />

      {/* Main Cinematic Key Light */}
      <spotLight
        ref={keyLightRef}
        position={[6, 8, 6]}
        angle={0.6}
        penumbra={0.8}
        intensity={3.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Secondary Fill Light */}
      <directionalLight position={[-6, 4, 3]} intensity={1.1} color="#6366f1" />

      {/* Dramatic Cyan / Indigo Rim Light */}
      <pointLight
        ref={rimLightRef}
        position={[0, 4, -4]}
        intensity={3.8}
        color="#06b6d4"
      />

      {/* Subtle Warm Accent */}
      <pointLight position={[3, -2, 2]} intensity={1.2} color="#f59e0b" />

      {/* Cinematic Studio Reflective Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.86, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#050811"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Cyber Grid Lines on Floor */}
      <gridHelper
        args={[40, 40, "#1e293b", "#0f172a"]}
        position={[0, -1.85, 0]}
      />

      {/* Floating Ambient Dust */}
      <FloatingDust count={140} />
    </>
  );
}
