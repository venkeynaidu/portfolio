"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, TorusKnot, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.4;
      innerRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer floating TorusKnot */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <TorusKnot ref={meshRef} args={[1.2, 0.36, 128, 32]}>
          <MeshDistortMaterial
            color="#4f46e5"
            emissive="#1e1b4b"
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={2}
          />
        </TorusKnot>
      </Float>

      {/* Inner pulsing wireframe sphere */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere ref={innerRef} args={[0.7, 24, 24]}>
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>

      {/* Satellite geometric accents */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2} position={[2.2, 1.2, -0.5]}>
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.8} position={[-2.4, -1, 0.2]}>
        <mesh>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingParticles({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 8;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#38bdf8"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, 4, 2]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[6, -4, 2]} intensity={2.5} color="#8b5cf6" />
      <pointLight position={[0, 6, -2]} intensity={1.8} color="#ec4899" />

      <AnimatedCore />
      <FloatingParticles count={90} />
    </>
  );
}
