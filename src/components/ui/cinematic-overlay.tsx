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
      {/* Opening fade from ivory */}
      <motion.div
        className="absolute inset-0 bg-[#f4efe7]"
        initial={{ opacity: 1 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-[#121212]"
        animate={{ height: showChapter ? "6vh" : "0vh" }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-[#121212]"
        animate={{ height: showChapter ? "6vh" : "0vh" }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Lower-third chapter card */}
      <AnimatePresence mode="wait">
        {showChapter && (
          <motion.div
            key={chapter.key}
            className="absolute left-4 sm:left-12 bottom-[9vh] max-w-[min(560px,calc(100vw-2rem))]"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.span
                className="block h-px bg-[#a87b42]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.9, delay: 0.15 }}
              />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#6f4f2c] font-medium">
                Chapter {chapter.number}
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl leading-[1.05] text-[#1c1917] drop-shadow-[0_2px_18px_rgba(244,239,231,0.9)]">
              {chapter.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#44403c] drop-shadow-[0_1px_10px_rgba(244,239,231,0.95)]">
              {chapter.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
