"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface EcommerceWorldProps {
  visible: boolean;
}

// 3D Animated Shopping Cart with Rolling Wheels
function AnimatedShoppingCart({ position }: { position: [number, number, number] }) {
  const cartGroupRef = useRef<THREE.Group>(null!);
  const wheelsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cartGroupRef.current) {
      // Gentle roll back and forth along showroom floor
      cartGroupRef.current.position.x = position[0] + Math.sin(t * 1.4) * 0.35;
    }
    if (wheelsRef.current) {
      // Wheel spin
      wheelsRef.current.children.forEach((wheel) => {
        wheel.rotation.x = t * 3.5;
      });
    }
  });

  return (
    <group ref={cartGroupRef} position={position}>
      {/* Wireframe Cart Basket */}
      <group position={[0, 0.45, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.4, 0.5]} />
          <meshStandardMaterial
            color="#0ea5e9"
            wireframe
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Solid Transparent Liner */}
        <mesh>
          <boxGeometry args={[0.68, 0.38, 0.48]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.15}
          />
        </mesh>
        {/* Products in Cart */}
        <mesh position={[-0.15, -0.05, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.2]} />
          <meshStandardMaterial color="#ec4899" roughness={0.4} />
        </mesh>
        <mesh position={[0.15, -0.02, 0.05]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.18, 0.2, 0.16]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.4} />
        </mesh>
      </group>

      {/* Cart Handle */}
      <mesh position={[-0.4, 0.65, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Cart Chassis & Legs */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.45]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>

      {/* 4 Wheels */}
      <group ref={wheelsRef}>
        {[
          [-0.25, 0.08, -0.2],
          [0.25, 0.08, -0.2],
          [-0.25, 0.08, 0.2],
          [0.25, 0.08, 0.2],
        ].map((wPos, i) => (
          <mesh key={i} position={wPos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Glowing Showcase Pedestal with Floating Premium Product
function ShowcasePedestal({
  position,
  productType,
}: {
  position: [number, number, number];
  productType: "sneaker" | "watch" | "gadget";
}) {
  const productRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (productRef.current) {
      productRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      productRef.current.position.y = 0.85 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Cylindrical Glass Pedestal */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.7, 24]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Halo Glow Ring */}
      <mesh position={[0, 0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.4, 32]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
      </mesh>

      {/* Floating 3D Product */}
      <group ref={productRef}>
        {productType === "sneaker" && (
          <group scale={1.2}>
            {/* Sneaker Sole */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.38, 0.06, 0.16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            {/* Sneaker Upper */}
            <mesh position={[0.02, 0.08, 0]}>
              <boxGeometry args={[0.32, 0.1, 0.14]} />
              <meshStandardMaterial color="#0284c7" roughness={0.5} />
            </mesh>
            {/* Nike / Sport Swoosh Highlight */}
            <mesh position={[0.02, 0.08, 0.08]}>
              <boxGeometry args={[0.18, 0.02, 0.01]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        )}

        {productType === "watch" && (
          <group scale={1.3}>
            {/* Watch Bezel */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.12, 0.03, 16, 32]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Sapphire Face */}
            <mesh>
              <cylinderGeometry args={[0.11, 0.11, 0.02, 24]} />
              <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.7} />
            </mesh>
            {/* Leather Strap */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.08, 0.42, 0.015]} />
              <meshStandardMaterial color="#78350f" roughness={0.7} />
            </mesh>
          </group>
        )}

        {productType === "gadget" && (
          <group scale={1.2}>
            {/* Smartphone Body */}
            <RoundedBox args={[0.2, 0.38, 0.02]} radius={0.02} smoothness={4}>
              <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
            </RoundedBox>
            {/* Screen */}
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[0.18, 0.35]} />
              <meshBasicMaterial color="#0284c7" />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

// Payment Verified Checkmark Ring (Razorpay integration)
function PaymentSuccessRing({ position }: { position: [number, number, number] }) {
  const checkRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (checkRef.current) {
      checkRef.current.rotation.y = state.clock.getElapsedTime() * 0.9;
    }
  });

  return (
    <group ref={checkRef} position={position}>
      {/* Glowing Green Halo */}
      <mesh>
        <torusGeometry args={[0.45, 0.04, 16, 32]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.8} />
      </mesh>
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.12}
        color="#ecfdf5"
        anchorX="center"
        anchorY="middle"
      >
        &#10004; PAID
      </Text>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.08}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
      >
        RAZORPAY 200 OK
      </Text>
    </group>
  );
}

export function EcommerceWorld({ visible }: EcommerceWorldProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = visible ? 1 : 0.0001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3.5
    );
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]}>
      {/* Showroom Lighting */}
      <directionalLight position={[4, 8, 4]} intensity={visible ? 2.6 : 0} color="#f0f9ff" castShadow />
      <pointLight position={[0, 4, 0]} intensity={visible ? 1.8 : 0} color="#38bdf8" />

      {/* Animated Shopping Cart */}
      <AnimatedShoppingCart position={[-1.6, 0, 0.2]} />

      {/* 3 Showcase Product Pedestals */}
      <ShowcasePedestal position={[1.8, 0, -0.8]} productType="sneaker" />
      <ShowcasePedestal position={[0.2, 0, -1.4]} productType="watch" />
      <ShowcasePedestal position={[-2.4, 0, -1.2]} productType="gadget" />

      {/* Payment Success Token */}
      <PaymentSuccessRing position={[2.2, 1.3, 0.2]} />

      {/* Floating Cartel E-Commerce Architecture Hologram */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 2.55, -0.7]}>
        <RoundedBox args={[3.2, 1.45, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#1e1b4b"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.14, 1.39]} />
          <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.35} />
        </mesh>
        <Text
          position={[-1.45, 0.5, 0.035]}
          fontSize={0.09}
          color="#a5b4fc"
          anchorX="left"
          anchorY="middle"
        >
          // CARTEL E-COMMERCE &bull; MULTI-TENANT RETAIL
        </Text>
        <Text
          position={[-1.45, 0.2, 0.035]}
          fontSize={0.065}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`Catalog: Groceries, Fashion, & Express Delivery Modules\nPayments: Seamless Razorpay SDK Gateway &bull; Instant SMS Alerts\nCompanion API: Mobile Android App REST Integrations`}
        </Text>
        <Text
          position={[-1.45, -0.28, 0.035]}
          fontSize={0.062}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          [ORDER DISPATCH: REAL-TIME INVENTORY SYNC &bull; DJANGO + MYSQL]
        </Text>
        <Text
          position={[-1.45, -0.5, 0.035]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Built by Garaga Venkatesh &bull; Arowana Software Solutions
        </Text>
      </Float>
    </group>
  );
}
