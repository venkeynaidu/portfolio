"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";

interface MaleHumanPresenterProps {
  sceneIndex: number;
  scrollProgress: number;
  activeProjectWorld?: ProjectWorldKey;
  activeCompanyOffice?: CompanyOfficeKey;
}

// Scene target positions for the male human presenter
const SCENE_TARGETS: Record<number, { pos: [number, number, number]; rotY: number }> = {
  0: { pos: [1.25, 0.1, 0.5], rotY: -0.22 },    // Hero
  1: { pos: [1.65, 0.1, 0.4], rotY: -0.35 },    // About
  2: { pos: [-1.45, 0.1, 0.3], rotY: 0.28 },    // Skills
  3: { pos: [-1.6, 0.15, 0.4], rotY: 0.32 },    // Experience
  4: { pos: [-1.8, 0.2, 0.5], rotY: 0.36 },     // Projects
  5: { pos: [0, 0.15, 0.8], rotY: 0 },          // Contact
};

export function MaleHumanPresenter({
  sceneIndex,
  scrollProgress,
  activeProjectWorld = "poultry",
  activeCompanyOffice = "microgenesis",
}: MaleHumanPresenterProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const avatarCardRef = useRef<THREE.Group>(null!);

  // Load Venkatesh's authentic high-resolution portrait
  const portraitTexture = useTexture("/profile.jpg");

  useMemo(() => {
    if (portraitTexture) {
      portraitTexture.colorSpace = THREE.SRGBColorSpace;
      portraitTexture.minFilter = THREE.LinearFilter;
      portraitTexture.generateMipmaps = false;
    }
  }, [portraitTexture]);

  // Smooth position and mouse-parallax tracking
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const target = SCENE_TARGETS[sceneIndex] ?? SCENE_TARGETS[0];

    // Smooth lerp to scene target position
    const mouseX = state.pointer.x * 0.25;
    const mouseY = state.pointer.y * 0.15;

    const targetX = target.pos[0] + mouseX;
    const targetY = target.pos[1] + mouseY;
    const targetZ = target.pos[2];

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      delta * 3.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 3.5
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 3.5
    );

    // Look toward cursor smoothly
    const targetRotY = target.rotY + state.pointer.x * 0.35;
    const targetRotX = -state.pointer.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 4.0
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 4.0
    );
  });

  return (
    <group ref={groupRef} position={[1.25, 0.1, 0.5]}>
      {/* Drei Float Animation for weightless, organic 60fps floating */}
      <Float speed={2.0} rotationIntensity={0.08} floatIntensity={0.25}>
        <group ref={avatarCardRef}>
          {/* Main Male Human Portrait Plinth */}
          <RoundedBox
            args={[1.85, 2.45, 0.08]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.85}
              roughness={0.25}
            />
          </RoundedBox>

          {/* Authentic High-Resolution Portrait of Garaga Venkatesh */}
          <mesh position={[0, 0.18, 0.045]}>
            <planeGeometry args={[1.72, 1.95]} />
            <meshBasicMaterial map={portraitTexture} toneMapped={false} />
          </mesh>

          {/* Premium Gold & Sky Blue Architectural Border */}
          <mesh position={[0, 0.18, 0.048]}>
            <planeGeometry args={[1.74, 1.97]} />
            <meshBasicMaterial
              color="#38bdf8"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Nameplate & Smart Business-Casual Identity Banner */}
          <group position={[0, -0.92, 0.05]}>
            <RoundedBox args={[1.72, 0.36, 0.02]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.6} />
            </RoundedBox>
            <Text
              position={[0, 0.06, 0.02]}
              fontSize={0.095}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              GARAGA VENKATESH
            </Text>
            <Text
              position={[0, -0.07, 0.02]}
              fontSize={0.055}
              color="#e0f2fe"
              anchorX="center"
              anchorY="middle"
            >
              Full Stack Developer &bull; Cloud Engineer
            </Text>
          </group>

          {/* Floating Live Badge 1: 6+ Years Experience */}
          <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.3} position={[-1.1, 0.75, 0.15]}>
            <RoundedBox args={[1.15, 0.32, 0.03]} radius={0.04} smoothness={2}>
              <meshStandardMaterial color="#052e16" roughness={0.3} metalness={0.8} />
            </RoundedBox>
            <Text position={[0, 0, 0.025]} fontSize={0.062} color="#34d399" anchorX="center" anchorY="middle">
              &#10003; 6+ Years Exp
            </Text>
          </Float>

          {/* Floating Live Badge 2: 1 Month Notice Period */}
          <Float speed={2.2} rotationIntensity={0.12} floatIntensity={0.25} position={[1.1, 0.75, 0.15]}>
            <RoundedBox args={[1.25, 0.32, 0.03]} radius={0.04} smoothness={2}>
              <meshStandardMaterial color="#451a03" roughness={0.3} metalness={0.8} />
            </RoundedBox>
            <Text position={[0, 0, 0.025]} fontSize={0.058} color="#fbbf24" anchorX="center" anchorY="middle">
              &#9201; 1 Mo Notice Period
            </Text>
          </Float>

          {/* Floating Live Badge 3: Active Domain / Project */}
          <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.2} position={[0, 1.45, 0.1]}>
            <RoundedBox args={[2.0, 0.32, 0.03]} radius={0.04} smoothness={2}>
              <meshStandardMaterial color="#1e1b4b" roughness={0.3} metalness={0.8} />
            </RoundedBox>
            <Text position={[0, 0, 0.025]} fontSize={0.06} color="#c084fc" anchorX="center" anchorY="middle">
              {sceneIndex === 4
                ? `Active World: ${activeProjectWorld.toUpperCase()}`
                : sceneIndex === 3
                ? `Company: ${activeCompanyOffice.toUpperCase()}`
                : "Python &bull; React &bull; Kafka &bull; Defense AI"}
            </Text>
          </Float>

          {/* Subtle Halo Rim Ring */}
          <mesh position={[0, 0, -0.05]}>
            <torusGeometry args={[1.35, 0.02, 16, 48]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

useTexture.preload("/profile.jpg");
