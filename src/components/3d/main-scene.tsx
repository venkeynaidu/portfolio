"use client";

import { Suspense } from "react";
import { CinematicEnvironment } from "./cinematic-environment";
import { CameraController } from "./camera-controller";
import { MaleHumanPresenter } from "./male-human-presenter";
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
      <Suspense fallback={null}>
        <CinematicEnvironment sceneIndex={sceneIndex} />
      </Suspense>

      <CameraController sceneIndex={sceneIndex} scrollProgress={scrollProgress} />

      <Suspense fallback={null}>
        {/* Male Human Presenter: Garaga Venkatesh with Float Animations */}
        <MaleHumanPresenter
          sceneIndex={sceneIndex}
          scrollProgress={scrollProgress}
          activeProjectWorld={activeProjectWorld}
          activeCompanyOffice={activeCompanyOffice}
        />

        {/* Scene 3: Holographic Engineering Workstation (only when active) */}
        {sceneIndex === 2 && <HolographicWorkstation visible={true} />}

        {/* Scene 4: Company-Specific Office Environments (only active office) */}
        {sceneIndex === 3 && (
          <>
            {activeCompanyOffice === "microgenesis" && <MicrogenesisOffice visible={true} />}
            {activeCompanyOffice === "tulasi" && <TulasiOffice visible={true} />}
            {activeCompanyOffice === "arowana" && <ArowanaOffice visible={true} />}
          </>
        )}

        {/* Scene 5: Industry-Specific 3D Project Worlds (only active world) */}
        {sceneIndex === 4 && (
          <>
            {activeProjectWorld === "poultry" && <PoultryWorld visible={true} />}
            {activeProjectWorld === "beverage" && <BeverageWorld visible={true} />}
            {activeProjectWorld === "defence" && <DefenceWorld visible={true} />}
            {activeProjectWorld === "ecommerce" && <EcommerceWorld visible={true} />}
            {activeProjectWorld === "hardware" && <HardwareWorld visible={true} />}
          </>
        )}
      </Suspense>
    </>
  );
}
