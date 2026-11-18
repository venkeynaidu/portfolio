"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./hero-scene";

function FallbackVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-72 h-72 sm:w-96 sm:h-96">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-fuchsia-500/20 blur-3xl animate-pulse" />
        <div className="absolute inset-8 rounded-full border border-cyan-500/30 animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-dashed border-indigo-500/40 animate-[spin_18s_linear_infinite_reverse]" />
        <div className="absolute inset-24 rounded-full border border-violet-500/30 animate-[spin_8s_linear_infinite]" />
      </div>
    </div>
  );
}

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <FallbackVisual />;
  }

  if (reducedMotion || !hasWebGL) {
    return <FallbackVisual />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Suspense fallback={<FallbackVisual />}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
