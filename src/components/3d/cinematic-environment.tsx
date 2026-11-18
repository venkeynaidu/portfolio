"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

interface CinematicEnvironmentProps {
  sceneIndex: number;
}

const FLOOR_Y = -1.85;

/** Per-scene sun mood: morning → midday → golden hour across the tour */
const SUN_MOODS: Record<number, { color: string; intensity: number; pos: [number, number, number] }> = {
  0: { color: "#fff1dc", intensity: 2.2, pos: [-6, 7, -8] },
  1: { color: "#fff6e8", intensity: 2.3, pos: [-4, 9, -7] },
  2: { color: "#ffffff", intensity: 2.1, pos: [-2, 10, -6] },
  3: { color: "#fff4e0", intensity: 2.2, pos: [3, 9, -7] },
  4: { color: "#ffe9cc", intensity: 2.3, pos: [5, 8, -7] },
  5: { color: "#ffd7a8", intensity: 2.5, pos: [7, 5, -8] },
};

/** Vertical-gradient daylight sky dome */
function SkyDome() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          top: { value: new THREE.Color("#8fb8de") },
          horizon: { value: new THREE.Color("#f4efe6") },
          ground: { value: new THREE.Color("#e8e2d8") },
        },
        vertexShader: `varying vec3 vPos; void main(){ vPos = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; varying vec3 vPos;
          void main(){ float h = vPos.y; vec3 c = h > 0.0 ? mix(horizon, top, pow(h, 0.6)) : mix(horizon, ground, pow(-h, 0.4));
          gl_FragColor = vec4(c, 1.0); }`,
      }),
    []
  );
  return (
    <mesh material={material} scale={60}>
      <sphereGeometry args={[1, 48, 24]} />
    </mesh>
  );
}

/** Distant city skyline beyond the glass, softened by atmospheric haze */
function Skyline() {
  const buildings = useMemo(() => {
    const rng = (i: number) => {
      const x = Math.sin(i * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 46 }, (_, i) => ({
      x: -26 + i * 1.15 + rng(i) * 0.6,
      z: -22 - rng(i + 7) * 10,
      w: 0.8 + rng(i + 3) * 1.6,
      d: 0.8 + rng(i + 5) * 1.4,
      h: 3 + rng(i + 11) * 14,
      shade: 0.78 + rng(i + 13) * 0.14,
    }));
  }, []);
  return (
    <group position={[0, FLOOR_Y - 6, 0]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={new THREE.Color(b.shade * 0.86, b.shade * 0.9, b.shade)} roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Architectural shell: floor-to-ceiling glass wall, mullions, columns, ceiling light strips */
function OfficeShell() {
  const mullions = Array.from({ length: 13 }, (_, i) => -12 + i * 2);
  return (
    <group>
      {/* Glass curtain wall */}
      <mesh position={[0, FLOOR_Y + 2.6, -7]}>
        <planeGeometry args={[26, 5.2]} />
        <meshPhysicalMaterial color="#dfeaf2" transmission={0.92} roughness={0.04} thickness={0.1} transparent opacity={0.35} />
      </mesh>
      {mullions.map((x) => (
        <mesh key={x} position={[x, FLOOR_Y + 2.6, -6.95]} castShadow>
          <boxGeometry args={[0.08, 5.2, 0.12]} />
          <meshStandardMaterial color="#2a2d33" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, FLOOR_Y + 0.05, -6.95]}>
        <boxGeometry args={[26, 0.1, 0.16]} />
        <meshStandardMaterial color="#2a2d33" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Ceiling with recessed linear lights */}
      <mesh position={[0, FLOOR_Y + 5.2, -1]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 14]} />
        <meshStandardMaterial color="#f3f1ec" roughness={0.9} />
      </mesh>
      {[-4.5, -1.5, 1.5, 4.5].map((x) => (
        <mesh key={x} position={[x, FLOOR_Y + 5.19, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 10]} />
          <meshBasicMaterial color={[3, 2.9, 2.7]} toneMapped={false} />
        </mesh>
      ))}

      {/* Structural columns */}
      {[-7, 7].map((x) => (
        <mesh key={x} position={[x, FLOOR_Y + 2.6, -4]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 5.2, 0.6]} />
          <meshStandardMaterial color="#ebe7e0" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/** Volumetric sun shafts streaming through the glass with floating dust */
function LightShafts() {
  const shaftMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color("#fff3dc") } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
          void main(){
            float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
            float fall = pow(vUv.y, 1.6);
            float flicker = 0.85 + 0.15 * sin(uTime * 0.6 + vUv.x * 6.0);
            gl_FragColor = vec4(uColor, edge * fall * 0.16 * flicker);
          }`,
      }),
    []
  );

  const dustRef = useRef<THREE.Points>(null!);
  const dustPositions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = FLOOR_Y + Math.random() * 4.5;
      arr[i * 3 + 2] = -6 + Math.random() * 8;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    shaftMat.uniforms.uTime.value = state.clock.elapsedTime;
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.01;
      dustRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group>
      {[-4.2, -1.4, 1.6, 4.4].map((x, i) => (
        <mesh key={x} material={shaftMat} position={[x + 0.8, FLOOR_Y + 2.3, -3.6]} rotation={[-0.62, 0.18 * (i - 1.5), 0.32]}>
          <planeGeometry args={[1.3, 7.5]} />
        </mesh>
      ))}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#fff8e7" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

export function CinematicEnvironment({ sceneIndex }: CinematicEnvironmentProps) {
  const sunRef = useRef<THREE.DirectionalLight>(null!);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const mood = SUN_MOODS[sceneIndex] ?? SUN_MOODS[0];
    const sun = sunRef.current;
    if (!sun) return;
    const k = Math.min(1, delta * 1.2);
    sun.intensity = THREE.MathUtils.lerp(sun.intensity, mood.intensity, k);
    sun.color.lerp(tmpColor.set(mood.color), k);
    sun.position.lerp(new THREE.Vector3(...mood.pos), k);
  });

  return (
    <>
      <fog attach="fog" args={["#efe9df", 14, 48]} />

      {/* Image-based lighting from procedural light panels (no external HDR fetch) */}
      <Environment resolution={256} frames={1} environmentIntensity={0.7}>
        <color attach="background" args={["#e9e4db"]} />
        <Lightformer form="rect" intensity={3} color="#fff5e6" position={[0, 2, -9]} scale={[22, 6, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#dbe8f5" position={[-9, 3, 0]} rotation-y={Math.PI / 2} scale={[12, 5, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[14, 10, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffe2bf" position={[8, 3, 4]} scale={3} />
      </Environment>

      <SkyDome />
      <Skyline />
      <OfficeShell />
      <LightShafts />

      <hemisphereLight args={["#fdfaf4", "#cfc5b6", 0.35]} />
      <directionalLight
        ref={sunRef}
        position={SUN_MOODS[0].pos}
        intensity={3.2}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={6}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
      />
      {/* Soft interior bounce from the ceiling strips */}
      <pointLight position={[0, FLOOR_Y + 4.6, 1.5]} intensity={3} distance={12} decay={2} color="#fffaf0" />

      {/* Polished warm limestone floor with soft blurred reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y - 0.001, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 90]}
          resolution={512}
          mixBlur={1}
          mixStrength={1.1}
          roughness={0.55}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#d9d1c5"
          metalness={0.15}
          mirror={0.35}
        />
      </mesh>
    </>
  );
}
