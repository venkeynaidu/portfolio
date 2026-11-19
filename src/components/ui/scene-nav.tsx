"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SceneNavProps {
  activeScene: number;
  scrollProgress: number;
}

const scenes = [
  { id: "hero", label: "01 // INTRODUCTION" },
  { id: "about", label: "02 // ABOUT ME" },
  { id: "skills", label: "03 // WORKSTATION" },
  { id: "experience", label: "04 // TIMELINE" },
  { id: "projects", label: "05 // EXHIBITION" },
  { id: "contact", label: "06 // CONNECT" },
];

export function SceneNav({ activeScene, scrollProgress }: SceneNavProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 pointer-events-auto">
      {/* Scroll Meter Track */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-sky-500 via-indigo-600 to-purple-600 rounded-full"
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
                  ? "text-sky-600 font-bold translate-x-0 opacity-100"
                  : "text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
              }`}
            >
              {s.label}
            </span>

            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 bg-sky-600 shadow-[0_0_12px_rgba(2,132,199,0.5)]"
                  : "w-2 bg-slate-300 group-hover:bg-sky-500"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
