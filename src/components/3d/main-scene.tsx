"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { HumanRobotAvatar } from "./human-robot-avatar";
import { HolographicWorkstation } from "./holographic-workstation";
import { SpatialProjects } from "./spatial-projects";

interface MainSceneProps {
  sceneIndex: number;
  scrollProgress: number;
}

export function MainScene({ sceneIndex, scrollProgress }: MainSceneProps) {
  return (
    <>
      <CinematicEnvironment sceneIndex={sceneIndex} />
      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

      <Suspense fallback={null}>
        {/* Human-Robot Digital Twin with Authentic Face & PBR Chassis */}
        <HumanRobotAvatar
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
