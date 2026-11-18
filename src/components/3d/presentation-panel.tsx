"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
import type { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";
import { getProjectsForWorld, getExperienceForOffice } from "@/lib/world-mapping";

interface PresentationPanelProps {
  sceneIndex: number;
  activeProjectWorld: ProjectWorldKey;
  activeCompanyOffice: CompanyOfficeKey;
}

const ACCENTS: Record<string, string> = {
  poultry: "#f59e0b",
  beverage: "#06b6d4",
  defence: "#22c55e",
  ecommerce: "#8b5cf6",
  hardware: "#f97316",
  community: "#ec4899",
  microgenesis: "#38bdf8",
  tulasi: "#10b981",
  arowana: "#6366f1",
};

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

/**
 * Elegant floating panel beside the presenter with the real project / role details.
 * Re-keyed on every story beat so it pops in fresh with each transition.
 */
export function PresentationPanel({ sceneIndex, activeProjectWorld, activeCompanyOffice }: PresentationPanelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const visible = sceneIndex === 3 || sceneIndex === 4;

  let key = "";
  let eyebrow = "";
  let title = "";
  let subtitle = "";
  let lines: string[] = [];
  let tech: string[] = [];

  if (sceneIndex === 4) {
    const projects = getProjectsForWorld(activeProjectWorld);
    key = activeProjectWorld;
    eyebrow = projects[0]?.category.toUpperCase() ?? "";
    title = projects.map((p) => p.title.split(" (")[0]).join("  +  ");
    subtitle = `Client: ${truncate(projects[0]?.client ?? "", 48)}`;
    lines = projects.flatMap((p) => p.highlights.slice(0, projects.length > 1 ? 1 : 3));
    tech = Array.from(new Set(projects.flatMap((p) => p.environment))).slice(0, 7);
  } else if (sceneIndex === 3) {
    const exp = getExperienceForOffice(activeCompanyOffice);
    key = activeCompanyOffice;
    eyebrow = exp?.period.toUpperCase() ?? "";
    title = exp?.company ?? "";
    subtitle = exp?.role ?? "";
    lines = exp?.responsibilities.slice(0, 3) ?? [];
    tech = (exp?.topSkills ?? exp?.environment ?? []).slice(0, 7);
  }

  const accent = ACCENTS[key] ?? "#38bdf8";

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = visible ? 1 : 0.0001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 4);
  });

  return (
    <group ref={groupRef} position={[sceneIndex === 3 ? 0.25 : 0.9, 0.05, 0.35]} rotation={[0, -0.12, 0]}>
      <Float key={`${sceneIndex}-${key}`} speed={1.6} rotationIntensity={0.04} floatIntensity={0.18}>
        <RoundedBox args={[2.3, 1.45, 0.04]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#0b1220" metalness={0.4} roughness={0.25} transparent opacity={0.88} />
        </RoundedBox>
        {/* Accent bar */}
        <mesh position={[-1.13, 0, 0.025]}>
          <planeGeometry args={[0.03, 1.35]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
        <Text position={[-1.02, 0.6, 0.03]} fontSize={0.05} color={accent} anchorX="left" anchorY="top" maxWidth={2.0}>
          {eyebrow}
        </Text>
        <Text position={[-1.02, 0.5, 0.03]} fontSize={0.105} color="#f8fafc" anchorX="left" anchorY="top" maxWidth={2.05} lineHeight={1.1}>
          {title}
        </Text>
        <Text position={[-1.02, 0.24, 0.03]} fontSize={0.055} color="#cbd5e1" anchorX="left" anchorY="top" maxWidth={2.05}>
          {subtitle}
        </Text>
        {lines.slice(0, 3).map((line, i) => (
          <group key={i} position={[-1.02, 0.08 - i * 0.2, 0.03]}>
            <mesh position={[0.02, -0.03, 0]}>
              <circleGeometry args={[0.015, 12]} />
              <meshBasicMaterial color={accent} toneMapped={false} />
            </mesh>
            <Text position={[0.07, 0, 0]} fontSize={0.042} color="#e2e8f0" anchorX="left" anchorY="top" maxWidth={1.95} lineHeight={1.25}>
              {truncate(line, 110)}
            </Text>
          </group>
        ))}
        {/* Technology chips */}
        <group position={[-1.02, -0.6, 0.03]}>
          {tech.map((t, i) => {
            const w = 0.06 + t.length * 0.026;
            const x = tech.slice(0, i).reduce((acc, s) => acc + 0.06 + s.length * 0.026 + 0.04, 0);
            if (x + w > 2.05) return null;
            return (
              <group key={t} position={[x + w / 2, 0, 0]}>
                <RoundedBox args={[w, 0.08, 0.01]} radius={0.02}>
                  <meshBasicMaterial color="#1e293b" />
                </RoundedBox>
                <Text position={[0, 0, 0.008]} fontSize={0.038} color={accent} anchorX="center">
                  {t}
                </Text>
              </group>
            );
          })}
        </group>
      </Float>
    </group>
  );
}
