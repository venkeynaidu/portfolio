"use client";

import { useEffect, useMemo, useRef } from "react";
import { stageState } from "./stage-state";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";

interface HumanRobotAvatarProps {
  sceneIndex: number;
  scrollProgress: number;
  activeProjectWorld?: ProjectWorldKey;
  activeCompanyOffice?: CompanyOfficeKey;
  /** URL of the user's own realistic avatar (.glb). Falls back to the stand-in mannequin. */
  modelUrl?: string;
}

type Vec3 = [number, number, number];

interface PresenterSpot {
  /** Floor position (x, z) the presenter walks to */
  spot: [number, number];
  /** Body yaw while presenting */
  yaw: number;
  /** World-space points the presenter gestures toward, cycled through */
  targets: Vec3[];
  /** Base animation while explaining */
  talk: "agree" | "idle";
  /** Wave hello on arrival (welcome scenes) */
  wave?: boolean;
}

// ─── Stage direction per scene / world / office ────────────────────────────
const SCENE_SPOTS: Record<number, PresenterSpot> = {
  0: { spot: [1.15, 0.4], yaw: -0.25, targets: [[1.9, -0.95, -1.0]], talk: "agree", wave: true },
  1: { spot: [1.85, 0.35], yaw: -0.42, targets: [[0.4, 0.3, -1.5]], talk: "agree" },
  2: { spot: [-0.6, 0.15], yaw: 0.3, targets: [[0.6, -0.2, -0.6], [-0.4, 0.4, -1.2]], talk: "agree" },
  5: { spot: [0.3, 0.6], yaw: 0, targets: [[-1.7, -0.9, -0.6]], talk: "agree", wave: true },
};

const OFFICE_SPOTS: Record<CompanyOfficeKey, PresenterSpot> = {
  microgenesis: { spot: [-1.7, 0.2], yaw: 0.5, targets: [[0, -0.2, -2.4], [1.6, -1.0, -0.9]], talk: "agree" },
  tulasi: { spot: [-1.35, -0.25], yaw: 0.45, targets: [[0, -0.2, -2.4], [-1.8, -1.0, -0.9]], talk: "agree" },
  arowana: { spot: [-2.05, 0.5], yaw: 0.55, targets: [[0, -0.1, -2.4], [1.8, -1.0, -0.8]], talk: "agree" },
};

const WORLD_SPOTS: Record<ProjectWorldKey, PresenterSpot> = {
  // Beside the hatching egg, gesturing at the chicks then the farm dashboard
  poultry: { spot: [-0.75, 0.15], yaw: 0.35, targets: [[-1.2, -1.6, 0.6], [0, 0.65, -0.8], [-1.6, -1.6, -0.6]], talk: "agree" },
  beverage: { spot: [-0.85, 0.05], yaw: 0.4, targets: [[0, -1.1, -0.6], [0.5, 0.5, -1.6]], talk: "agree" },
  defence: { spot: [-0.7, 0.2], yaw: 0.35, targets: [[0, 0.5, -2], [0.8, -1.0, -0.6]], talk: "agree" },
  ecommerce: { spot: [-0.8, 0.1], yaw: 0.4, targets: [[0, 0.3, -1.4], [1, -1.2, -0.3]], talk: "agree" },
  hardware: { spot: [-0.75, 0.1], yaw: 0.4, targets: [[0, -1.0, -0.6], [0.4, 0.5, -1.6]], talk: "agree" },
  // Between the matched profiles and the RBAC privacy shield
  community: { spot: [-0.65, 0.15], yaw: 0.3, targets: [[-1.05, -0.25, -1.2], [1.05, -0.25, -1.2], [2.6, -0.9, -0.6]], talk: "agree" },
};

function getDirection(
  sceneIndex: number,
  world: ProjectWorldKey,
  office: CompanyOfficeKey
): PresenterSpot {
  if (sceneIndex === 3) return OFFICE_SPOTS[office];
  if (sceneIndex === 4) return WORLD_SPOTS[world];
  return SCENE_SPOTS[sceneIndex] ?? SCENE_SPOTS[0];
}

// Gesture cycle (seconds): look at viewer → point & explain → nod at viewer
const CYCLE = 7.5;
const WALK_SPEED = 1.25;
const FLOOR_Y = -1.85;

// Scratch objects reused every frame
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _q3 = new THREE.Quaternion();
const _identity = new THREE.Quaternion();

/**
 * Rotates `bone` (in world space) so the bone→child vector points along `targetDir`,
 * blended by `weight`. Works independent of the rig's local bone axes.
 */
function aimBone(bone: THREE.Object3D, child: THREE.Object3D, targetDir: THREE.Vector3, weight: number) {
  if (weight <= 0.001 || !bone.parent) return;
  bone.getWorldPosition(_v1);
  child.getWorldPosition(_v2);
  const current = _v2.sub(_v1).normalize();
  _q1.setFromUnitVectors(current, targetDir);
  _q2.copy(_identity).slerp(_q1, weight); // weighted world-space delta
  bone.getWorldQuaternion(_q3);
  _q2.multiply(_q3); // new world rotation
  bone.parent.getWorldQuaternion(_q3).invert();
  bone.quaternion.copy(_q3.multiply(_q2));
  bone.updateMatrixWorld(true);
}

/** Turns the head (world space) from the body's forward toward a point, clamped. */
function lookAt(head: THREE.Object3D, bodyQuat: THREE.Quaternion, target: THREE.Vector3, weight: number) {
  if (weight <= 0.001 || !head.parent) return;
  head.getWorldPosition(_v1);
  _dir.copy(target).sub(_v1).normalize();
  const forward = _v2.set(0, 0, 1).applyQuaternion(bodyQuat);
  _q1.setFromUnitVectors(forward, _dir);
  _q2.copy(_identity).slerp(_q1, weight * 0.6); // natural partial head turn
  head.getWorldQuaternion(_q3);
  _q2.multiply(_q3);
  head.parent.getWorldQuaternion(_q3).invert();
  head.quaternion.copy(_q3.multiply(_q2));
  head.updateMatrixWorld(true);
}

/** Presenter height in scene units (desks are 0.78 high, so this reads as a real person) */
const TARGET_HEIGHT = 1.9;

function findBonePrefix(root: THREE.Object3D): string {
  let hips = "";
  root.traverse((o) => {
    if (!hips && (o as THREE.Bone).isBone && /hips$/i.test(o.name)) hips = o.name;
  });
  return hips ? hips.slice(0, -4) : "mixamorig";
}

/** Re-targets Mixamo clips onto any Mixamo-compatible skeleton (Ready Player Me, Avaturn, Mixamo). */
function retargetClips(clips: THREE.AnimationClip[], target: THREE.Object3D): THREE.AnimationClip[] {
  const prefix = findBonePrefix(target);
  return clips.map((clip) => {
    const tracks = clip.tracks
      .filter((t) => t.name.endsWith(".quaternion")) // rotations only: proportions differ between rigs
      .map((t) => {
        const c = t.clone();
        c.name = t.name.replace(/^mixamorig:?/, prefix);
        return c;
      })
      .filter((t) => target.getObjectByName(t.name.split(".")[0]));
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
  });
}

function normalizedScale(root: THREE.Object3D): number {
  const prev = root.scale.clone();
  root.scale.set(1, 1, 1);
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  root.scale.copy(prev);
  const h = box.max.y - box.min.y;
  return h > 0.01 ? TARGET_HEIGHT / h : 1;
}

export function HumanRobotAvatar({
  sceneIndex,
  activeProjectWorld = "poultry",
  activeCompanyOffice = "microgenesis",
  modelUrl,
}: HumanRobotAvatarProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const faceGroupRef = useRef<THREE.Group>(null!);
  const watchGroupRef = useRef<THREE.Group>(null!);
  const collarGroupRef = useRef<THREE.Group>(null!);

  const bones = useRef<{
    head?: THREE.Object3D;
    neck?: THREE.Object3D;
    leftHand?: THREE.Object3D;
    rArm?: THREE.Object3D;
    rFore?: THREE.Object3D;
    rHand?: THREE.Object3D;
  }>({});

  // Animations always come from the Mixamo rig; the visible model may be the user's own avatar
  const base = useGLTF("/character.glb");
  const custom = useGLTF(modelUrl ?? "/character.glb");
  const isCustom = !!modelUrl;
  const scene = custom.scene;
  const animations = useMemo(
    () => (isCustom ? retargetClips(base.animations, scene) : base.animations),
    [isCustom, base.animations, scene]
  );
  const modelScale = useMemo(() => normalizedScale(scene), [scene]);
  const acc = modelScale / 1.75; // accessories were authored for the old 1.75 scale
  const { actions } = useAnimations(animations, groupRef);
  const currentActionRef = useRef<string>("");

  // Performance state
  const arrivedAtRef = useRef(0);
  const walkingRef = useRef(false);
  const pointWeight = useRef(0);
  const waveWeight = useRef(0);
  const lookWeight = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 5));
  const yawRef = useRef(0); // logical facing: 0 = toward +Z (the camera)
  const facingOffsetRef = useRef(0);

  const faceTexture = useTexture("/avatar-face.png");

  // Smart business-casual wardrobe: tailored navy fabric, warm skin tone
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false; // skinned bounds don't follow animation
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (!mat) return;
        if (isCustom) {
          mat.envMapIntensity = 0.9; // keep the avatar's own outfit & skin textures
          return;
        }
        if (mesh.name.toLowerCase().includes("joint")) {
          mat.color = new THREE.Color("#9e6a4b");
          mat.roughness = 0.58;
          mat.metalness = 0.02;
        } else {
          mat.color = new THREE.Color("#1e3a8a");
          mat.roughness = 0.82;
          mat.metalness = 0.04;
          mat.envMapIntensity = 0.5;
        }
      }
    });

    // GLTFLoader sanitizes node names ("mixamorig:Head" → "mixamorigHead"); RPM/Avaturn have no prefix
    const prefix = findBonePrefix(scene);
    const bone = (n: string) => scene.getObjectByName(`${prefix}${n}`) ?? undefined;
    bones.current = {
      head: bone("Head"),
      neck: bone("Neck"),
      leftHand: bone("LeftHand"),
      rArm: bone("RightArm"),
      rFore: bone("RightForeArm"),
      rHand: bone("RightHand"),
    };

    // Detect which way the rig faces: when facing +Z, the character's left hand is at +X
    const lh = bones.current.leftHand;
    const rh = bones.current.rHand;
    if (lh && rh) {
      const prevRot = scene.rotation.y;
      scene.rotation.y = 0;
      scene.updateMatrixWorld(true);
      const lx = lh.getWorldPosition(new THREE.Vector3()).x;
      const rx = rh.getWorldPosition(new THREE.Vector3()).x;
      scene.rotation.y = prevRot;
      facingOffsetRef.current = lx < rx ? Math.PI : 0;
    }
  }, [scene, isCustom]);

  const playAction = (name: string, fade = 0.45) => {
    if (currentActionRef.current === name) return;
    const next = actions[name];
    if (!next) return;
    const prev = actions[currentActionRef.current];
    next.reset().fadeIn(fade).play();
    prev?.fadeOut(fade);
    currentActionRef.current = name;
  };

  // A new story beat (scene / world / office) restarts the gesture cycle
  useEffect(() => {
    arrivedAtRef.current = -1;
  }, [sceneIndex, activeProjectWorld, activeCompanyOffice]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const dt = Math.min(delta, 0.05);
    const now = state.clock.elapsedTime;
    const dir = getDirection(sceneIndex, activeProjectWorld, activeCompanyOffice);

    // ── Locomotion: walk to the presenter spot at a natural pace ──
    const dx = dir.spot[0] - group.position.x;
    const dz = dir.spot[1] - group.position.z;
    const dist = Math.hypot(dx, dz);
    group.position.y = FLOOR_Y;

    let targetYaw: number;
    if (dist > 0.06) {
      walkingRef.current = true;
      const step = Math.min(dist, WALK_SPEED * dt);
      group.position.x += (dx / dist) * step;
      group.position.z += (dz / dist) * step;
      targetYaw = Math.atan2(dx, dz); // face the walking direction
      playAction(dist > 0.25 ? "walk" : dir.talk, 0.3);
    } else {
      if (walkingRef.current || arrivedAtRef.current < 0) arrivedAtRef.current = now;
      walkingRef.current = false;
      targetYaw = dir.yaw + state.pointer.x * 0.12;
      // Open the body up toward whatever is being pointed at
      if (pointWeight.current > 0.01) {
        const tIdx = Math.floor(Math.max(0, now - arrivedAtRef.current) / CYCLE) % dir.targets.length;
        const [tx, , tz] = dir.targets[tIdx];
        const toTarget = Math.atan2(tx - group.position.x, tz - group.position.z);
        const diff = Math.atan2(Math.sin(toTarget - dir.yaw), Math.cos(toTarget - dir.yaw));
        targetYaw += Math.max(-1.1, Math.min(1.1, diff * 0.45)) * pointWeight.current;
      }
    }

    // Shortest-path yaw interpolation
    let yawDelta = targetYaw - yawRef.current;
    yawDelta = Math.atan2(Math.sin(yawDelta), Math.cos(yawDelta));
    yawRef.current += yawDelta * Math.min(1, dt * (walkingRef.current ? 6 : 3.5));
    group.rotation.y = yawRef.current + facingOffsetRef.current; // models may be authored facing -Z

    // ── Presenting performance ──
    const t = walkingRef.current ? -1 : now - arrivedAtRef.current;
    const phase = t < 0 ? -1 : t % CYCLE;
    const cycleIndex = t < 0 ? 0 : Math.floor(t / CYCLE);
    const target = dir.targets[cycleIndex % dir.targets.length];

    let wantPoint = 0;
    let wantWave = 0;
    let wantLook = 0;

    if (phase >= 0) {
      if (dir.wave && t < 2.6) {
        wantWave = 1; // friendly welcome wave on arrival
        wantLook = 1;
        lookTarget.current.copy(state.camera.position);
        playAction("idle");
      } else if (phase < 1.4) {
        wantLook = 1; // eye contact with the visitor
        lookTarget.current.copy(state.camera.position);
        playAction("idle");
      } else if (phase < 4.4) {
        wantPoint = 1; // turn to the display and point at it
        wantLook = 1;
        lookTarget.current.set(...target);
        playAction("idle");
      } else {
        wantLook = 0.8; // back to the visitor, nodding while explaining
        lookTarget.current.copy(state.camera.position);
        playAction(dir.talk);
      }
    }

    const k = Math.min(1, dt * 4);
    pointWeight.current += (wantPoint - pointWeight.current) * k;
    waveWeight.current += (wantWave - waveWeight.current) * k;
    lookWeight.current += (wantLook - lookWeight.current) * k;

    // Apply procedural layers on top of the mixer pose (mixer already ran this frame)
    const b = bones.current;
    group.updateMatrixWorld(true);
    const bodyQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yawRef.current);

    if (b.rArm && b.rFore && b.rHand) {
      if (pointWeight.current > 0.001) {
        b.rArm.getWorldPosition(_v1);
        const aim = new THREE.Vector3(...target).sub(_v1).normalize();
        aimBone(b.rArm, b.rFore, aim, pointWeight.current * 0.9);
        aimBone(b.rFore, b.rHand, aim, pointWeight.current * 0.85);
      }
      if (waveWeight.current > 0.001) {
        // Upper arm out to the side, forearm up and swaying
        const side = new THREE.Vector3(-0.75, 0.35, 0.35).applyQuaternion(bodyQuat).normalize();
        aimBone(b.rArm, b.rFore, side, waveWeight.current * 0.9);
        const sway = Math.sin(now * 9) * 0.35;
        const up = new THREE.Vector3(-0.2 + sway, 1, 0.25).applyQuaternion(bodyQuat).normalize();
        aimBone(b.rFore, b.rHand, up, waveWeight.current * 0.9);
      }
    }

    if (b.head) lookAt(b.head, bodyQuat, lookTarget.current, lookWeight.current);

    // Lens focus follows the presenter's chest
    if (b.neck) b.neck.getWorldPosition(stageState.focus).y -= 0.25;

    // ── Attach accessories to bones ──
    if (b.head && faceGroupRef.current) {
      const p = b.head.getWorldPosition(new THREE.Vector3());
      const q = b.head.getWorldQuaternion(new THREE.Quaternion());
      faceGroupRef.current.position.copy(p).add(new THREE.Vector3(0, 0.1, 0.235).multiplyScalar(acc).applyQuaternion(q));
      faceGroupRef.current.quaternion.copy(q);
    }
    if (b.leftHand && watchGroupRef.current) {
      b.leftHand.getWorldPosition(watchGroupRef.current.position);
      b.leftHand.getWorldQuaternion(watchGroupRef.current.quaternion);
    }
    if (b.neck && collarGroupRef.current) {
      b.neck.getWorldPosition(collarGroupRef.current.position);
      b.neck.getWorldQuaternion(collarGroupRef.current.quaternion);
    }
  });

  return (
    <>
      {/* Rigged character */}
      <primitive ref={groupRef} object={scene} scale={modelScale} position={[0, FLOOR_Y, 0.25]} />

      {!isCustom && (
      <>

      {/* Face plate attached to the head bone */}
      <group ref={faceGroupRef} scale={0.42 * acc}>
        <mesh>
          <planeGeometry args={[0.55, 0.72, 32, 32]} />
          <meshStandardMaterial map={faceTexture} transparent roughness={0.42} metalness={0.05} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.57, 0.74]} />
          <meshStandardMaterial color="#9e6a4b" roughness={0.6} metalness={0.02} />
        </mesh>
      </group>

      {/* Open shirt collar (no tie) */}
      <group ref={collarGroupRef} scale={acc}>
        <mesh position={[-0.07, 0.02, 0.05]} rotation={[0.25, 0, 0.35]}>
          <boxGeometry args={[0.13, 0.05, 0.06]} />
          <meshStandardMaterial color="#172554" roughness={0.8} />
        </mesh>
        <mesh position={[0.07, 0.02, 0.05]} rotation={[0.25, 0, -0.35]}>
          <boxGeometry args={[0.13, 0.05, 0.06]} />
          <meshStandardMaterial color="#172554" roughness={0.8} />
        </mesh>
      </group>

      {/* Wristwatch on the left wrist */}
      <group ref={watchGroupRef} scale={0.7 * acc}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.075, 0.075, 0.04, 16]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.078, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 20]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0.086, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.005, 20]} />
          <meshStandardMaterial color="#0284c7" metalness={0.3} roughness={0.1} />
        </mesh>
      </group>
      </>
      )}
    </>
  );
}

useGLTF.preload("/character.glb");
