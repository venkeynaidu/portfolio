"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MainScene } from "./main-scene";

interface PersistentCanvasProps {
  sceneIndex: number;
  scrollProgress: number;
}

function WebGLFallback() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-200/30 via-indigo-200/20 to-violet-200/30 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-futuristic-grid opacity-60" />
    </div>
  );
}

export function PersistentCanvas({
  sceneIndex,
  scrollProgress,
}: PersistentCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || reducedMotion || !hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 4.6], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <MainScene sceneIndex={sceneIndex} scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
}
