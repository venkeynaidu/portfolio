"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  N8AO,
  Vignette,
  Noise,
  ToneMapping,
  SMAA,
  BrightnessContrast,
  HueSaturation,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";

interface PostFXProps {
  /** World-space point the lens focuses on (the presenter) */
  focusTarget: THREE.Vector3;
  /** 0..1 — spikes on story transitions for a brief lens "breathing" effect */
  transition: React.MutableRefObject<number>;
}

/**
 * Cinematic lens + grade: ambient occlusion, shallow depth of field on the presenter,
 * gentle highlight bloom, AgX filmic tone mapping, warm grade, vignette and fine film grain.
 */
export function PostFX({ focusTarget, transition }: PostFXProps) {
  const caRef = useRef<{ offset: THREE.Vector2 } | null>(null);
  const caOffset = useRef(new THREE.Vector2(0.0004, 0.0004));

  useFrame(() => {
    // Subtle chromatic "lens breathing" during transitions
    const t = transition.current;
    caOffset.current.set(0.0004 + t * 0.0025, 0.0004 + t * 0.0018);
    if (caRef.current) caRef.current.offset.copy(caOffset.current);
  });

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <N8AO aoRadius={0.9} intensity={2.2} distanceFalloff={0.8} quality="medium" halfRes color="#2b2219" />
      <DepthOfField target={focusTarget} focalLength={0.03} bokehScale={2.2} height={720} />
      <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.92} luminanceSmoothing={0.2} radius={0.7} />
      <ChromaticAberration
        ref={caRef as never}
        offset={caOffset.current}
        radialModulation
        modulationOffset={0.35}
        blendFunction={BlendFunction.NORMAL}
      />
      <HueSaturation saturation={0.1} hue={0} />
      <BrightnessContrast brightness={-0.02} contrast={0.08} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.32} darkness={0.42} eskil={false} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
      <SMAA />
    </EffectComposer>
  );
}
