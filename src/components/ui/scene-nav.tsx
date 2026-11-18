"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SceneNavProps {
  activeScene: number;
  scrollProgress: number;
}

const scenes = [
  { id: "hero", label: "01 // SYSTEM_INIT" },
  { id: "about", label: "02 // IDENTITY" },
  { id: "skills", label: "03 // WORKSTATION" },
  { id: "experience", label: "04 // TIMELINE" },
  { id: "projects", label: "05 // EXHIBITION" },
  { id: "contact", label: "06 // TRANSMIT" },
];

export function SceneNav({ activeScene, scrollProgress }: SceneNavProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 pointer-events-auto">
      {/* Scroll Meter Track */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.7)]"
          style={{ height: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {scenes.map((s, idx) => {
        const isActive = activeScene === idx;
        return (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 pr-4 transition-all"
          >
            <span
              className={`text-[11px] font-mono tracking-wider transition-all duration-300 ${
                isActive
                  ? "text-cyan-400 font-bold translate-x-0 opacity-100 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                  : "text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
              }`}
            >
              {s.label}
            </span>

            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.85)]"
                  : "w-2 bg-slate-700 group-hover:bg-slate-500"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
