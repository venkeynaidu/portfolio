"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PersistentCanvas } from "@/components/3d/persistent-canvas";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillsInteractive } from "@/components/skills-interactive";
import { ProjectsSection } from "@/components/projects-section";
import { EducationAchievements } from "@/components/education-achievements";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SceneNav } from "@/components/ui/scene-nav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    // Total page scroll progress tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // GSAP ScrollTrigger for 7 distinct cinematic scenes
    const sectionIds = [
      "hero",
      "about",
      "experience",
      "skills",
      "projects",
      "achievements",
      "contact",
    ];

    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveScene(index),
          onEnterBack: () => setActiveScene(index),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-foreground selection:bg-cyan-500 selection:text-black">
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Persistent 3D Three.js Studio Scene */}
      <PersistentCanvas
        sceneIndex={activeScene}
        scrollProgress={scrollProgress}
      />

      {/* Floating Glassmorphism Navigation */}
      <Navbar />

      {/* Side Scene Navigation & Progress Track */}
      <SceneNav activeScene={activeScene} scrollProgress={scrollProgress} />

      {/* Content Layers with Spatial Depth */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <SkillsInteractive />
        <ProjectsSection />
        <EducationAchievements />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
