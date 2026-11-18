"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { HumanPortraitAvatar } from "./human-portrait-avatar";
import { HolographicWorkstation } from "./holographic-workstation";
import { SpatialProjects } from "./spatial-projects";

interface MainSceneProps {
  sceneIndex: number;
  scrollProgress: number;
}

export function MainScene({ sceneIndex, scrollProgress }: MainSceneProps) {
  return (
    <>
      {/* Techno / Cybernetic Lighting & Grid Environment */}
      <CinematicEnvironment sceneIndex={sceneIndex} />
      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

      <Suspense fallback={null}>
        {/* Authentic Human Digital Twin with 2.5D Depth Displacement & Orbital Telemetry */}
        <HumanPortraitAvatar
          sceneIndex={sceneIndex}
          scrollProgress={scrollProgress}
        />

        {/* Scene 3: Holographic Workstation Desk & Code Displays */}
        <HolographicWorkstation visible={sceneIndex === 2} />

        {/* Scene 5: Spatial 3D Project Exhibition Panels */}
        <SpatialProjects visible={sceneIndex === 4} />
      </Suspense>
    </>
  );
}
