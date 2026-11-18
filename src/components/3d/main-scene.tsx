"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { CharacterModel } from "./character-model";
import { PortraitDepthMesh } from "./portrait-depth-mesh";
import { SpatialSkills } from "./spatial-skills";
import { SpatialProjects } from "./spatial-projects";

interface MainSceneProps {
  sceneIndex: number;
  scrollProgress: number;
}

export function MainScene({ sceneIndex, scrollProgress }: MainSceneProps) {
  // Show portrait depth mesh predominantly in Hero (0) and About (1)
  const isPortraitVisible = sceneIndex === 0 || sceneIndex === 1;
  const portraitOpacity = sceneIndex === 1 ? 1.0 : sceneIndex === 0 ? 0.75 : 0.0;

  return (
    <>
      <CinematicEnvironment sceneIndex={sceneIndex} />
      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

      <Suspense fallback={null}>
        {/* Realistic Rigged 3D Character */}
        <CharacterModel sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

        {/* 2.5D Photorealistic Holographic Portrait with Anatomical Depth */}
        {isPortraitVisible && (
          <PortraitDepthMesh
            position={sceneIndex === 0 ? [2.4, 0.2, -0.6] : [-1.6, 0.3, 0.2]}
            rotation={sceneIndex === 0 ? [0, -0.3, 0] : [0, 0.3, 0]}
            scale={sceneIndex === 0 ? 0.95 : 1.15}
            opacity={portraitOpacity}
          />
        )}

        {/* Spatial 3D Tech Nodes in Skills Section */}
        <SpatialSkills visible={sceneIndex === 3} />

        {/* Spatial 3D Project Displays in Projects Section */}
        <SpatialProjects visible={sceneIndex === 4} />
      </Suspense>
    </>
  );
}
