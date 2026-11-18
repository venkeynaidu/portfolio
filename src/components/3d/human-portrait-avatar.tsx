"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HumanPortraitAvatarProps {
  sceneIndex: number;
  scrollProgress: number;
}

// 6 distinct scene waypoints for the human avatar
const sceneWaypoints: Record<
  number,
  { pos: [number, number, number]; rot: [number, number, number]; scale: number }
> = {
  0: { pos: [0.75, 0.05, 0.5], rot: [0, -0.22, 0], scale: 1.05 },  // Scene 1: Introduction (Hero)
  1: { pos: [-1.35, 0.1, 0.85], rot: [0, 0.32, 0], scale: 1.02 },  // Scene 2: About Me
  2: { pos: [0, 0.22, 0.18], rot: [0, 0, 0], scale: 0.98 },        // Scene 3: Holographic Workstation
  3: { pos: [-1.6, 0.05, 0.75], rot: [0, 0.38, 0], scale: 1.0 },   // Scene 4: Career Timeline
  4: { pos: [-2.1, 0.12, 0.85], rot: [0, 0.48, 0], scale: 0.96 },  // Scene 5: Projects Exhibition
  5: { pos: [0, 0.08, 0.8], rot: [0, 0, 0], scale: 1.05 },         // Scene 6: Connect & Collaborate
};

// Orbiting Full-Stack Technology Chips
const orbitingTech = [
  { name: "Python", color: "#38bdf8", angle: 0 },
  { name: "FastAPI", color: "#00f0ff", angle: (Math.PI * 2) / 6 },
  { name: "Kafka", color: "#f59e0b", angle: ((Math.PI * 2) / 6) * 2 },
  { name: "React", color: "#61dafb", angle: ((Math.PI * 2) / 6) * 3 },
  { name: "Docker", color: "#38bdf8", angle: ((Math.PI * 2) / 6) * 4 },
  { name: "Kubernetes", color: "#818cf8", angle: ((Math.PI * 2) / 6) * 5 },
];

export function HumanPortraitAvatar({
  sceneIndex,
  scrollProgress,
}: HumanPortraitAvatarProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Group>(null!);
  const ringRef2 = useRef<THREE.Group>(null!);
  const orbitGroupRef = useRef<THREE.Group>(null!);

  // Load color photo and authentic anatomical depth map
  const [colorTexture, depthTexture] = useTexture([
    "/profile-optimized.jpg",
    "/profile-depth.jpg",
  ]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const waypoint = sceneWaypoints[sceneIndex] || sceneWaypoints[0];

    // Smooth responsive mouse parallax
    const mouseX = state.pointer.x * 0.22;
    const mouseY = state.pointer.y * -0.16;

    const targetX = waypoint.pos[0] + mouseX * 0.4;
    const targetY = waypoint.pos[1] + mouseY * 0.3;
    const targetZ = waypoint.pos[2];

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * 3.2
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 3.2
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 3.2
    );

    // Natural 3D head and torso tilt toward mouse pointer
    const targetRotY = waypoint.rot[1] + mouseX * 0.45;
    const targetRotX = waypoint.rot[0] + mouseY * 0.35;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );

    // Organic idle breathing animation
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 1.5) * 0.035;
      meshRef.current.position.z = Math.cos(time * 1.5) * 0.015;
    }

    // Rotate holographic telemetry rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.25;
      ringRef1.current.rotation.x += delta * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.32;
      ringRef2.current.rotation.y += delta * 0.18;
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={groupRef} position={sceneWaypoints[0].pos} scale={sceneWaypoints[0].scale}>
      {/* 2.5D Anatomical Depth-Displaced Human Portrait */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.3, 3.1, 128, 128]} />
        <meshStandardMaterial
          map={colorTexture}
          displacementMap={depthTexture}
          displacementScale={0.36}
          displacementBias={-0.08}
          roughness={0.42}
          metalness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sleek Techno HUD Frame Bezel */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[2.42, 3.22]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Cybernetic Corner Brackets */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[2.52, 3.32]} />
        <meshStandardMaterial
          color="#070d1e"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Neon Cyber Glow Aura behind Portrait */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[2.9, 3.7]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Monospace Node Header Tag in 3D */}
      <Text
        position={[-1.1, 1.68, 0.04]}
        fontSize={0.075}
        color="#00f0ff"
        anchorX="left"
        anchorY="bottom"
      >
        // GARAGA_VENKATESH • FULL_STACK_ENGINEER
      </Text>

      {/* Real-Time Status Telemetry Tag in 3D */}
      <Text
        position={[1.1, 1.68, 0.04]}
        fontSize={0.07}
        color="#10b981"
        anchorX="right"
        anchorY="bottom"
      >
        [SYSTEM: ONLINE]
      </Text>

      {/* Rotating Orbital Telemetry Ring 1 */}
      <group ref={ringRef1} position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.9, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Rotating Orbital Telemetry Ring 2 */}
      <group ref={ringRef2} position={[0, 0, 0]}>
        <mesh rotation={[-Math.PI / 3.5, 0.2, 0]}>
          <torusGeometry args={[2.1, 0.007, 16, 100]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Orbiting Full-Stack Technology Chips */}
      <group ref={orbitGroupRef} position={[0, 0, 0]}>
        {orbitingTech.map((tech) => {
          const radius = 2.15;
          const x = Math.cos(tech.angle) * radius;
          const z = Math.sin(tech.angle) * radius;

          return (
            <Float
              key={tech.name}
              speed={2}
              rotationIntensity={0.2}
              floatIntensity={0.3}
              position={[x, Math.sin(tech.angle * 2) * 0.4, z]}
            >
              <RoundedBox args={[0.55, 0.22, 0.02]} radius={0.02} smoothness={2}>
                <meshStandardMaterial
                  color="#070d1e"
                  emissive={tech.color}
                  emissiveIntensity={0.3}
                  roughness={0.2}
                  metalness={0.8}
                />
              </RoundedBox>
              <Text
                position={[0, 0, 0.02]}
                fontSize={0.065}
                color={tech.color}
                anchorX="center"
                anchorY="middle"
              >
                {tech.name}
              </Text>
            </Float>
          );
        })}
      </group>
    </group>
  );
}
