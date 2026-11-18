"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

interface CommunityWorldProps {
  visible: boolean;
}

/** A floating member profile card (avatar disc + text lines) */
function ProfileCard({
  position,
  color,
  name,
  meta,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  meta: string;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[0.9, 1.15, 0.04]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.05} />
      </RoundedBox>
      {/* Avatar */}
      <mesh position={[0, 0.25, 0.03]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.3, 0.035]}>
        <circleGeometry args={[0.07, 24]} />
        <meshStandardMaterial color="#fde68a" />
      </mesh>
      <mesh position={[0, 0.16, 0.035]}>
        <circleGeometry args={[0.11, 24, 0, Math.PI]} />
        <meshStandardMaterial color="#fde68a" />
      </mesh>
      <Text position={[0, -0.08, 0.03]} fontSize={0.075} color="#0f172a" anchorX="center">
        {name}
      </Text>
      <Text position={[0, -0.22, 0.03]} fontSize={0.05} color="#64748b" anchorX="center">
        {meta}
      </Text>
      {/* Verified badge */}
      <mesh position={[0.3, 0.42, 0.03]}>
        <circleGeometry args={[0.06, 20]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4} />
      </mesh>
      {/* Info bars */}
      {[-0.34, -0.42].map((y, i) => (
        <mesh key={y} position={[i ? -0.08 : 0, y, 0.03]}>
          <planeGeometry args={[i ? 0.5 : 0.66, 0.035]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
      ))}
    </group>
  );
}

/** Two profiles connected by an animated "match" pulse travelling along an arc */
function MatchConnection() {
  const pulseRef = useRef<THREE.Mesh>(null!);
  const heartRef = useRef<THREE.Group>(null!);

  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1.05, 1.6, -1.2),
        new THREE.Vector3(0, 2.5, -1.0),
        new THREE.Vector3(1.05, 1.6, -1.2)
      ),
    []
  );
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.012, 8, false), [curve]);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.35) % 1;
    if (pulseRef.current) pulseRef.current.position.copy(curve.getPoint(t));
    if (heartRef.current) {
      // Heart "beats" once the pulse completes the arc
      const beat = 1 + Math.max(0, Math.sin(state.clock.elapsedTime * 6)) * 0.15 * (t > 0.85 ? 1 : 0.3);
      heartRef.current.scale.setScalar(beat);
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color="#f472b6" transparent opacity={0.55} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1.2} />
      </mesh>
      {/* Match heart at the apex */}
      <group ref={heartRef} position={[0, 2.32, -1.0]}>
        <mesh position={[-0.055, 0.03, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.055, 0.03, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.13, 0.13, 0.12]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0.2, 0]} fontSize={0.07} color="#be185d" anchorX="center">
          94% PREFERENCE MATCH
        </Text>
      </group>
    </group>
  );
}

/** RBAC privacy shield: a rotating ring of permission tiers around a lock */
function PrivacyShield({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Group>(null!);
  const tiers = [
    { label: "GUEST", color: "#94a3b8" },
    { label: "MEMBER", color: "#38bdf8" },
    { label: "PREMIUM", color: "#a855f7" },
    { label: "ADMIN", color: "#f59e0b" },
  ];

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={position}>
      {/* Pedestal */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.42, 0.6, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Lock body */}
      <RoundedBox args={[0.32, 0.26, 0.14]} radius={0.03} position={[0, 0.95, 0]} castShadow>
        <meshStandardMaterial color="#7c3aed" metalness={0.6} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 1.12, 0]}>
        <torusGeometry args={[0.1, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Shield dome */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.45, 32, 16]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={0.15} emissive="#8b5cf6" emissiveIntensity={0.3} />
      </mesh>
      {/* Orbiting RBAC tiers */}
      <group ref={ringRef} position={[0, 0.95, 0]}>
        {tiers.map((tier, i) => {
          const a = (i / tiers.length) * Math.PI * 2;
          return (
            <group key={tier.label} position={[Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7]} rotation={[0, -a + Math.PI / 2, 0]}>
              <RoundedBox args={[0.38, 0.12, 0.02]} radius={0.02}>
                <meshStandardMaterial color={tier.color} emissive={tier.color} emissiveIntensity={0.35} />
              </RoundedBox>
              <Text position={[0, 0, 0.015]} fontSize={0.05} color="#ffffff" anchorX="center">
                {tier.label}
              </Text>
            </group>
          );
        })}
      </group>
      <Text position={[0, 1.6, 0]} fontSize={0.075} color="#6d28d9" anchorX="center">
        ROLE-BASED ACCESS CONTROL
      </Text>
    </group>
  );
}

/** Subscription plan podiums that rise and fall in turn (checkout flow) */
function SubscriptionTiers({ position }: { position: [number, number, number] }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const plans = [
    { name: "Basic", price: "Free", color: "#e2e8f0", text: "#334155" },
    { name: "Gold", price: "₹999", color: "#fbbf24", text: "#78350f" },
    { name: "Premium", price: "₹2499", color: "#8b5cf6", text: "#ffffff" },
  ];

  useFrame((state) => {
    const active = Math.floor(state.clock.elapsedTime / 2) % plans.length;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const target = i === active ? 0.25 : 0;
      g.position.y = THREE.MathUtils.lerp(g.position.y, target, 0.08);
    });
  });

  return (
    <group position={position}>
      {plans.map((p, i) => (
        <group key={p.name} ref={(el) => { refs.current[i] = el; }} position={[(i - 1) * 0.62, 0, 0]}>
          <RoundedBox args={[0.52, 0.72, 0.08]} radius={0.04} position={[0, 0.9, 0]} castShadow>
            <meshStandardMaterial color={p.color} roughness={0.3} metalness={0.2} />
          </RoundedBox>
          <Text position={[0, 1.1, 0.05]} fontSize={0.07} color={p.text} anchorX="center">
            {p.name}
          </Text>
          <Text position={[0, 0.9, 0.05]} fontSize={0.09} color={p.text} anchorX="center">
            {p.price}
          </Text>
          <Text position={[0, 0.7, 0.05]} fontSize={0.04} color={p.text} anchorX="center">
            {i === 0 ? "Browse public" : i === 1 ? "Contact details" : "Verified + priority"}
          </Text>
        </group>
      ))}
      <Text position={[0, 1.6, 0]} fontSize={0.07} color="#0f172a" anchorX="center">
        PAID SUBSCRIPTIONS
      </Text>
    </group>
  );
}

/** Search filters panel showing multi-parameter matchmaking criteria */
function SearchFilters({ position }: { position: [number, number, number] }) {
  const barRefs = useRef<(THREE.Mesh | null)[]>([]);
  const filters = ["Denomination", "Location", "Education", "Age range", "Profession"];

  useFrame((state) => {
    barRefs.current.forEach((m, i) => {
      if (!m) return;
      const v = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 0.9 + i * 1.3));
      m.scale.x = v;
      m.position.x = -0.15 + (v * 0.9) / 2 - 0.45 / 2;
    });
  });

  return (
    <Float speed={1.4} rotationIntensity={0.04} floatIntensity={0.2}>
      <group position={position}>
        <RoundedBox args={[1.5, 1.2, 0.04]} radius={0.04}>
          <meshStandardMaterial color="#1e1b4b" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        <Text position={[-0.65, 0.45, 0.03]} fontSize={0.07} color="#f9a8d4" anchorX="left">
          MATCH SEARCH ENGINE
        </Text>
        {filters.map((f, i) => (
          <group key={f} position={[0, 0.25 - i * 0.16, 0.03]}>
            <Text position={[-0.65, 0, 0]} fontSize={0.045} color="#e0e7ff" anchorX="left">
              {f}
            </Text>
            <mesh position={[0.25, 0, 0]}>
              <planeGeometry args={[0.8, 0.04]} />
              <meshBasicMaterial color="#312e81" />
            </mesh>
            <mesh ref={(el) => { barRefs.current[i] = el; }} position={[0.1, 0, 0.002]}>
              <planeGeometry args={[0.9, 0.04]} />
              <meshBasicMaterial color="#ec4899" />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

export function CommunityWorld({ visible }: CommunityWorldProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = visible ? 1 : 0.0001;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 3.5);
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]}>
      {/* Warm, welcoming community-hall lighting */}
      <directionalLight position={[4, 8, 5]} intensity={visible ? 2.2 : 0} color="#fff1f2" castShadow />
      <pointLight position={[0, 3.2, -1]} intensity={visible ? 2.4 : 0} color="#f9a8d4" />
      <pointLight position={[-3, 2, 1]} intensity={visible ? 1.4 : 0} color="#c4b5fd" />

      {/* Community hall back wall with arched windows */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <boxGeometry args={[9, 4, 0.1]} />
        <meshStandardMaterial color="#fdf2f8" roughness={0.8} />
      </mesh>
      {[-3, -1, 1, 3].map((x) => (
        <group key={x} position={[x, 2.2, -2.94]}>
          <mesh>
            <planeGeometry args={[0.8, 1.6]} />
            <meshStandardMaterial color="#e0e7ff" emissive="#c7d2fe" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <circleGeometry args={[0.4, 32, 0, Math.PI]} />
            <meshStandardMaterial color="#e0e7ff" emissive="#c7d2fe" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Floral arch over the matching stage */}
      <mesh position={[0, 0, -1.2]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 13) * Math.PI;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.5, Math.sin(a) * 1.5, -1.2]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color={i % 2 ? "#f472b6" : "#ffffff"} />
          </mesh>
        );
      })}

      {/* Profile matching */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.25}>
        <ProfileCard position={[-1.05, 1.6, -1.2]} color="#38bdf8" name="Member #1042" meta="Kerala • Engineer" />
      </Float>
      <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.25}>
        <ProfileCard position={[1.05, 1.6, -1.2]} color="#f472b6" name="Member #2187" meta="Vizag • Doctor" />
      </Float>
      <MatchConnection />

      {/* Feature stations */}
      <PrivacyShield position={[2.6, 0, -0.6]} />
      <SubscriptionTiers position={[-2.7, 0, -0.9]} />
      <SearchFilters position={[0, 3.25, -1.6]} />

      {/* Carpet runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[1.4, 6]} />
        <meshStandardMaterial color="#be185d" roughness={0.9} />
      </mesh>
    </group>
  );
}
