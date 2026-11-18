"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ProjectWorldKey =
  | "poultry"
  | "beverage"
  | "defence"
  | "ecommerce"
  | "hardware";

export type CompanyOfficeKey =
  | "microgenesis"
  | "tulasi"
  | "arowana";

interface PortfolioContextType {
  activeScene: number;
  setActiveScene: (scene: number) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  activeProjectWorld: ProjectWorldKey;
  setActiveProjectWorld: (world: ProjectWorldKey) => void;
  activeCompanyOffice: CompanyOfficeKey;
  setActiveCompanyOffice: (office: CompanyOfficeKey) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeProjectWorld, setActiveProjectWorld] =
    useState<ProjectWorldKey>("poultry");
  const [activeCompanyOffice, setActiveCompanyOffice] =
    useState<CompanyOfficeKey>("microgenesis");

  return (
    <PortfolioContext.Provider
      value={{
        activeScene,
        setActiveScene,
        scrollProgress,
        setScrollProgress,
        activeProjectWorld,
        setActiveProjectWorld,
        activeCompanyOffice,
        setActiveCompanyOffice,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
