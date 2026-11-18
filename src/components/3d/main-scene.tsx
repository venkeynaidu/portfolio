"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { HumanRobotAvatar } from "./human-robot-avatar";
import { HolographicWorkstation } from "./holographic-workstation";
import { PresentationPanel } from "./presentation-panel";
import { PoultryWorld } from "./worlds/poultry-world";
import { BeverageWorld } from "./worlds/beverage-world";
import { DefenceWorld } from "./worlds/defence-world";
import { EcommerceWorld } from "./worlds/ecommerce-world";
import { HardwareWorld } from "./worlds/hardware-world";
import { CommunityWorld } from "./worlds/community-world";
import { MicrogenesisOffice } from "./offices/microgenesis-office";
import { TulasiOffice } from "./offices/tulasi-office";
import { ArowanaOffice } from "./offices/arowana-office";
import { ExecutiveOffice } from "./offices/executive-office";
import { PostFX } from "./post-fx";
import { stageState } from "./stage-state";
import { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";

interface MainSceneProps {
  sceneIndex: number;
  scrollProgress: number;
  activeProjectWorld?: ProjectWorldKey;
  activeCompanyOffice?: CompanyOfficeKey;
  avatarUrl?: string;
}

export function MainScene({
  sceneIndex,
  scrollProgress,
  activeProjectWorld = "poultry",
  activeCompanyOffice = "microgenesis",
  avatarUrl,
}: MainSceneProps) {
  const storyKey =
    sceneIndex === 3 ? `office-${activeCompanyOffice}` : sceneIndex === 4 ? `world-${activeProjectWorld}` : `scene-${sceneIndex}`;

  return (
    <>
      <Suspense fallback={null}>
        <CinematicEnvironment sceneIndex={sceneIndex} />
      </Suspense>
      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} storyKey={storyKey} />

      <Suspense fallback={null}>
        {/* Presenter: walks between stations, points at displays, talks to the visitor */}
        <HumanRobotAvatar
          sceneIndex={sceneIndex}
          scrollProgress={scrollProgress}
          activeProjectWorld={activeProjectWorld}
          activeCompanyOffice={activeCompanyOffice}
          modelUrl={avatarUrl}
        />

        {/* Floating panel with the real role / project details */}
        <PresentationPanel
          sceneIndex={sceneIndex}
          activeProjectWorld={activeProjectWorld}
          activeCompanyOffice={activeCompanyOffice}
        />

        {/* Scenes 1 & 6: premium executive office (welcome + farewell) */}
        {(sceneIndex === 0 || sceneIndex === 5) && (
          <ExecutiveOffice visible mode={sceneIndex === 0 ? "welcome" : "farewell"} />
        )}

        {/* Scene 3: Holographic Engineering Workstation */}
        <HolographicWorkstation visible={sceneIndex === 2} />

        {/* Scene 4: Company-Specific Office Environments */}
        {sceneIndex === 3 && (
          <>
            <MicrogenesisOffice visible={activeCompanyOffice === "microgenesis"} />
            <TulasiOffice visible={activeCompanyOffice === "tulasi"} />
            <ArowanaOffice visible={activeCompanyOffice === "arowana"} />
          </>
        )}

        {/* Scene 5: Industry-Specific 3D Project Worlds */}
        {sceneIndex === 4 && (
          <>
            <PoultryWorld visible={activeProjectWorld === "poultry"} />
            <BeverageWorld visible={activeProjectWorld === "beverage"} />
            <DefenceWorld visible={activeProjectWorld === "defence"} />
            <EcommerceWorld visible={activeProjectWorld === "ecommerce"} />
            <HardwareWorld visible={activeProjectWorld === "hardware"} />
            <CommunityWorld visible={activeProjectWorld === "community"} />
          </>
        )}
      </Suspense>

      {/* Cinematic lens & colour grade */}
      <PostFX focusTarget={stageState.focus} transition={stageState.transition} />
    </>
  );
}
