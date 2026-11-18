"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SceneNavProps {
  activeScene: number;
  scrollProgress: number;
}

const scenes = [
  { id: "hero", label: "01 // HERO" },
  { id: "about", label: "02 // ABOUT" },
  { id: "experience", label: "03 // EXPERIENCE" },
  { id: "skills", label: "04 // TECH STACK" },
  { id: "projects", label: "05 // PROJECTS" },
  { id: "achievements", label: "06 // ACHIEVEMENTS" },
  { id: "contact", label: "07 // CONTACT" },
];

export function SceneNav({ activeScene, scrollProgress }: SceneNavProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 pointer-events-auto">
      {/* Scroll Meter Track */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full"
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
              className={`text-[10px] font-mono tracking-wider transition-all duration-300 ${
                isActive
                  ? "text-cyan-400 font-bold translate-x-0 opacity-100"
                  : "text-muted-foreground/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
              }`}
            >
              {s.label}
            </span>

            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-5 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  : "w-2 bg-white/20 group-hover:bg-white/60"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
