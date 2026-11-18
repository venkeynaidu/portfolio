"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HardwareWorldProps {
  visible: boolean;
}

// 3D Arduino Uno Board
function ArduinoBoard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Blue PCB Board */}
      <RoundedBox args={[0.9, 0.05, 0.65]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.2} />
      </RoundedBox>

      {/* ATMega328 Microcontroller IC Chip */}
      <mesh position={[0.08, 0.04, 0.05]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* USB Type-B Port */}
      <mesh position={[-0.4, 0.06, 0.18]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.14]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Pin Headers */}
      <mesh position={[0, 0.05, -0.26]}>
        <boxGeometry args={[0.75, 0.05, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, 0.05, 0.26]}>
        <boxGeometry args={[0.75, 0.05, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Glowing Power & TX/RX LEDs */}
      <mesh position={[-0.15, 0.04, -0.1]}>
        <circleGeometry args={[0.015, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh position={[-0.08, 0.04, -0.1]}>
        <circleGeometry args={[0.015, 8]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      <Text
        position={[0, 0.04, -0.15]}
        fontSize={0.05}
        color="#ffffff"
        rotation={[-Math.PI / 2, 0, 0]}
        anchorX="center"
      >
        ARDUINO UNO R3
      </Text>
    </group>
  );
}

// Rotating DC Servo Motor with Oscillating Arm
function DCServoMotor({ position }: { position: [number, number, number] }) {
  const armRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (armRef.current) {
      // Oscillate 0 to 180 degrees (0 to PI radians)
      const angle = (Math.sin(state.clock.getElapsedTime() * 2.5) + 1) * (Math.PI / 2);
      armRef.current.rotation.y = angle;
    }
  });

  return (
    <group position={position}>
      {/* Black Servo Motor Housing */}
      <RoundedBox args={[0.5, 0.45, 0.3]} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </RoundedBox>

      {/* Output Gear Spline */}
      <mesh position={[0.12, 0.25, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} />
      </mesh>

      {/* Rotating Servo Horn Arm */}
      <group ref={armRef} position={[0.12, 0.3, 0]}>
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.38, 0.02, 0.08]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Arm Tip Indicator */}
        <mesh position={[0.35, 0.02, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Protractor Scale Arc on Base */}
      <mesh position={[0.12, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.28, 32, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
      </mesh>

      <Text
        position={[0, -0.28, 0]}
        fontSize={0.06}
        color="#38bdf8"
        anchorX="center"
      >
        PWM SERVO (0&deg; - 180&deg;)
      </Text>
    </group>
  );
}

// Zigbee Wireless RF Beam Pulses
function ZigbeeTransceiverModule({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  const pulseRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (pulseRef.current) {
      const scale = ((state.clock.getElapsedTime() * 1.5) % 1) + 0.2;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      {/* Zigbee Shield Board */}
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.03, 0.35]} />
        <meshStandardMaterial color="#059669" roughness={0.5} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0.12, 0.15, 0.12]}>
        <cylinderGeometry args={[0.012, 0.012, 0.28, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Pulsing RF Waves */}
      <group ref={pulseRef} position={[0.12, 0.28, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.12, 16]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Text
        position={[0, -0.1, 0]}
        fontSize={0.05}
        color="#34d399"
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  );
}

// Oscilloscope Screen with Real-Time PWM Signal Wave
function OscilloscopeDisplay({ position }: { position: [number, number, number] }) {
  const wavePointsRef = useRef<THREE.Line>(null!);

  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      {/* Scope Chassis */}
      <RoundedBox args={[1.3, 0.9, 0.4]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* CRT Screen */}
      <mesh position={[0, 0, 0.21]}>
        <planeGeometry args={[1.1, 0.72]} />
        <meshBasicMaterial color="#022c22" />
      </mesh>

      {/* Screen Grid */}
      <mesh position={[0, 0, 0.215]}>
        <planeGeometry args={[1.08, 0.7]} />
        <meshBasicMaterial color="#065f46" wireframe transparent opacity={0.4} />
      </mesh>

      <Text
        position={[-0.5, 0.26, 0.22]}
        fontSize={0.05}
        color="#34d399"
        anchorX="left"
      >
        PWM CH1: 50.0Hz &bull; DUTY: 62.5%
      </Text>

      <Text
        position={[-0.5, -0.26, 0.22]}
        fontSize={0.045}
        color="#facc15"
        anchorX="left"
      >
        Vpp: 5.02V &bull; WIRELESS LAG: 18ms
      </Text>
    </group>
  );
}

export function HardwareWorld({ visible }: HardwareWorldProps) {
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
      {/* Engineering Bench Lighting */}
      <directionalLight position={[-3, 7, 4]} intensity={visible ? 2.5 : 0} color="#e0f2fe" castShadow />
      <pointLight position={[0, 3, 0]} intensity={visible ? 1.8 : 0} color="#34d399" />

      {/* Electronics Workbench Surface */}
      <mesh position={[0, 0.35, -0.6]} receiveShadow castShadow>
        <boxGeometry args={[4.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Arduino Microcontroller */}
      <ArduinoBoard position={[-1.2, 0.42, -0.5]} />

      {/* DC Servo Motor */}
      <DCServoMotor position={[0.2, 0.58, -0.5]} />

      {/* Zigbee Transmitter & Receiver */}
      <ZigbeeTransceiverModule position={[-1.7, 0.42, -0.2]} label="ZIGBEE TX" />
      <ZigbeeTransceiverModule position={[1.4, 0.42, -0.2]} label="ZIGBEE RX" />

      {/* Digital Oscilloscope Screen */}
      <OscilloscopeDisplay position={[1.4, 0.9, -0.8]} />

      {/* Floating Hardware Thesis Hologram */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} position={[0, 2.6, -0.6]}>
        <RoundedBox args={[3.3, 1.45, 0.04]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#064e3b"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[3.24, 1.39]} />
          <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.35} />
        </mesh>
        <Text
          position={[-1.5, 0.5, 0.035]}
          fontSize={0.09}
          color="#6ee7b7"
          anchorX="left"
          anchorY="middle"
        >
          // EMBEDDED CONTROL OF DC SERVO MOTOR
        </Text>
        <Text
          position={[-1.5, 0.2, 0.035]}
          fontSize={0.065}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`Dual Architecture: Wireless Zigbee Protocol vs Wired Arduino\nPulse Width Modulation (PWM) Precision Speed & Angular Calibration\nPerformance Analysis: Latency, Signal Attenuation, & Error Bounds`}
        </Text>
        <Text
          position={[-1.5, -0.28, 0.035]}
          fontSize={0.062}
          color="#facc15"
          anchorX="left"
          anchorY="middle"
        >
          [HARDWARE BENCH: B.TECH ELECTRICAL &amp; ELECTRONICS ENGINEERING]
        </Text>
        <Text
          position={[-1.5, -0.5, 0.035]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Sri Prakash College of Engineering &bull; Garaga Venkatesh
        </Text>
      </Float>
    </group>
  );
}
