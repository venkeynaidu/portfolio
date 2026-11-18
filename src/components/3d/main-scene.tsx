"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { HumanRobotAvatar } from "./human-robot-avatar";
import { HolographicWorkstation } from "./holographic-workstation";
import { PoultryWorld } from "./worlds/poultry-world";
import { BeverageWorld } from "./worlds/beverage-world";
import { DefenceWorld } from "./worlds/defence-world";
import { EcommerceWorld } from "./worlds/ecommerce-world";
import { HardwareWorld } from "./worlds/hardware-world";
import { MicrogenesisOffice } from "./offices/microgenesis-office";
import { TulasiOffice } from "./offices/tulasi-office";
import { ArowanaOffice } from "./offices/arowana-office";
import { ProjectWorldKey, CompanyOfficeKey } from "@/context/portfolio-context";

interface MainSceneProps {
  sceneIndex: number;
  scrollProgress: number;
  activeProjectWorld?: ProjectWorldKey;
  activeCompanyOffice?: CompanyOfficeKey;
}

export function MainScene({
  sceneIndex,
  scrollProgress,
  activeProjectWorld = "poultry",
  activeCompanyOffice = "microgenesis",
}: MainSceneProps) {
  return (
    <>
      <CinematicEnvironment sceneIndex={sceneIndex} />
      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

      <Suspense fallback={null}>
        {/* Venkatesh Smart Business Casual Character */}
        <HumanRobotAvatar
          sceneIndex={sceneIndex}
          scrollProgress={scrollProgress}
        />

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
          </>
        )}
      </Suspense>
    </>
  );
}
