"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface SpatialProjectsProps {
  visible: boolean;
}

export function SpatialProjects({ visible }: SpatialProjectsProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetScale = visible ? 1 : 0.001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 3.8
    );

    // Subtle floating breathing
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.9) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0.7, 0, 0]}>
      {/* 3D Holographic Code Terminal 1: ADA Project Management System */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.3} position={[0.8, 0.75, 0.2]}>
        <RoundedBox args={[2.5, 1.45, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#080e1e"
            roughness={0.18}
            metalness={0.8}
            transparent
            opacity={0.92}
          />
        </RoundedBox>

        {/* Display Border Accent */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.44, 1.39]} />
          <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.35} />
        </mesh>

        <Text
          position={[-1.12, 0.52, 0.035]}
          fontSize={0.08}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
        >
          // ADA_PMS // FastAPI + Kafka Event Stream
        </Text>

        <Text
          position={[-1.12, 0.22, 0.035]}
          fontSize={0.062}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`01  @app.post("/api/v1/projects/tasks/assign")\n02  async def route_ticket(ticket: TicketAssignment):\n03      validated = await schema_validator.verify(ticket.id)\n04      await kafka.send("ada.pms.assignments", validated)`}
        </Text>

        <Text
          position={[-1.12, -0.25, 0.035]}
          fontSize={0.058}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          [STATUS: 200 OK &bull; LATENCY: 14.2ms &bull; PLAYWRIGHT: 100% PASSED]
        </Text>

        <Text
          position={[-1.12, -0.48, 0.035]}
          fontSize={0.065}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Aeronautical Development Agency (ADA: Offsite)
        </Text>
      </Float>

      {/* 3D Holographic Code Terminal 2: Air-Gapped AI Video Conferencing */}
      <Float
        speed={1.9}
        rotationIntensity={0.2}
        floatIntensity={0.35}
        position={[1.1, -0.9, 0.35]}
        rotation={[0, -0.15, 0]}
      >
        <RoundedBox args={[2.5, 1.45, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#080e1e"
            roughness={0.18}
            metalness={0.8}
            transparent
            opacity={0.92}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.44, 1.39]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.35} />
        </mesh>

        <Text
          position={[-1.12, 0.52, 0.035]}
          fontSize={0.08}
          color="#c084fc"
          anchorX="left"
          anchorY="middle"
        >
          // ADA_VCS // Air-Gapped AI MoM Engine
        </Text>

        <Text
          position={[-1.12, 0.22, 0.035]}
          fontSize={0.062}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`01  class AirGappedMoMGenerator:\n02      async def generate_mom(self, audio_stream):\n03          transcript = await self.offline_whisper(audio_stream)\n04          return extract_action_items(transcript)`}
        </Text>

        <Text
          position={[-1.12, -0.25, 0.035]}
          fontSize={0.058}
          color="#fbbf24"
          anchorX="left"
          anchorY="middle"
        >
          [AIR-GAPPED DEFENSE AI &bull; JITSI WEBRTC &bull; 0 EXTERNAL CALLS]
        </Text>

        <Text
          position={[-1.12, -0.48, 0.035]}
          fontSize={0.065}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Offline Defense Meeting Documentation &bull; MySQL Archive
        </Text>
      </Float>

      {/* 3D Holographic Code Terminal 3: Industrial ERP Replication & Logistics */}
      <Float
        speed={1.4}
        rotationIntensity={0.12}
        floatIntensity={0.25}
        position={[-1.6, -0.2, -0.3]}
        rotation={[0, 0.3, 0]}
      >
        <RoundedBox args={[2.3, 1.35, 0.04]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#080e1e"
            roughness={0.18}
            metalness={0.8}
            transparent
            opacity={0.92}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.24, 1.29]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
        </mesh>

        <Text
          position={[-1.02, 0.46, 0.035]}
          fontSize={0.075}
          color="#38bdf8"
          anchorX="left"
          anchorY="middle"
        >
          // INDUSTRIAL_ERP // MySQL TCL Replication
        </Text>

        <Text
          position={[-1.02, 0.18, 0.035]}
          fontSize={0.06}
          color="#f8fafc"
          anchorX="left"
          anchorY="middle"
        >
          {`01  START TRANSACTION;\n02  UPDATE stock SET qty = qty - 450 WHERE sku = 'SBL-20';\n03  INSERT INTO distribution_audit (order_id) VALUES (891);\n04  COMMIT; -- Sync with master-replica node`}
        </Text>

        <Text
          position={[-1.02, -0.24, 0.035]}
          fontSize={0.055}
          color="#34d399"
          anchorX="left"
          anchorY="middle"
        >
          [REPLICATION LAG: 0.00s &bull; GODREJ &amp; SBL NODES ACTIVE]
        </Text>

        <Text
          position={[-1.02, -0.45, 0.035]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
        >
          Full-Stack Supply Chain &bull; Kafka Event Streaming
        </Text>
      </Float>
    </group>
  );
}
