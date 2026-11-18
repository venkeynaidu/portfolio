"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "@/context/portfolio-context";
import { getExperienceForOffice, getProjectsForWorld } from "@/lib/world-mapping";

interface Chapter {
  key: string;
  number: string;
  title: string;
  subtitle: string;
}

const SCENE_CHAPTERS: Record<number, Omit<Chapter, "key">> = {
  0: { number: "01", title: "Welcome", subtitle: "Executive office · Let me show you around" },
  1: { number: "02", title: "My Story", subtitle: "Six years of building production systems" },
  2: { number: "03", title: "The Workstation", subtitle: "Skills & engineering toolkit" },
  5: { number: "06", title: "Let's Build Together", subtitle: "Thank you for visiting" },
};

const WORLD_LABELS: Record<string, string> = {
  poultry: "Poultry farm & hatchery",
  beverage: "Beverage production & distribution",
  defence: "Defence technology operations",
  ecommerce: "Digital retail & delivery",
  hardware: "Embedded systems lab",
  community: "Community matrimony platform",
};

/**
 * Film-style chrome over the 3D stage: an opening fade, letterbox bars that sweep in on each
 * story change, and an elegant lower-third chapter card naming the place we just entered.
 */
export function CinematicOverlay() {
  const { activeScene, activeProjectWorld, activeCompanyOffice } = usePortfolio();
  const [showChapter, setShowChapter] = useState(false);
  const [opened, setOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const chapter: Chapter = useMemo(() => {
    if (activeScene === 3) {
      const exp = getExperienceForOffice(activeCompanyOffice);
      return {
        key: `office-${activeCompanyOffice}`,
        number: "04",
        title: exp?.company ?? "Experience",
        subtitle: exp ? `${exp.role} · ${exp.period}` : "",
      };
    }
    if (activeScene === 4) {
      const projects = getProjectsForWorld(activeProjectWorld);
      return {
        key: `world-${activeProjectWorld}`,
        number: "05",
        title: projects.map((p) => p.title.split(" (")[0]).join(" & "),
        subtitle: WORLD_LABELS[activeProjectWorld] ?? "",
      };
    }
    const c = SCENE_CHAPTERS[activeScene] ?? SCENE_CHAPTERS[0];
    return { key: `scene-${activeScene}`, ...c };
  }, [activeScene, activeProjectWorld, activeCompanyOffice]);

  useEffect(() => {
    const t = setTimeout(() => setOpened(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setShowChapter(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowChapter(false), 3200);
    return () => clearTimeout(timer.current);
  }, [chapter.key]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden>
      {/* Subtle fade-in on mount */}
      <motion.div
        className="absolute inset-0 bg-[#0a0f1d]"
        initial={{ opacity: 1 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Modern Slim Accent Bars */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-slate-950/80 border-b border-sky-500/20"
        animate={{ height: showChapter ? "3vh" : "0vh" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-slate-950/80 border-t border-sky-500/20"
        animate={{ height: showChapter ? "3vh" : "0vh" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Lower-third chapter card with crisp high-contrast colors */}
      <AnimatePresence mode="wait">
        {showChapter && (
          <motion.div
            key={chapter.key}
            className="absolute left-4 sm:left-12 bottom-[6vh] max-w-[min(560px,calc(100vw-2rem))] p-4 rounded-2xl bg-slate-950/85 border border-sky-500/40 backdrop-blur-md shadow-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="block h-1.5 w-6 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
              <span className="text-[11px] tracking-widest uppercase text-sky-400 font-mono font-bold">
                Scene {chapter.number}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {chapter.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-200 font-normal">
              {chapter.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
