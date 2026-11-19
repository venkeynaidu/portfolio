"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { PortfolioProvider, usePortfolio } from "@/context/portfolio-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function PortfolioHome() {
  const {
    activeScene,
    setActiveScene,
    scrollProgress,
    setScrollProgress,
    activeProjectWorld,
    activeCompanyOffice,
  } = usePortfolio();

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

    // Scene mapping: 0: Hero, 1: About, 2: Skills/Workstation, 3: Timeline, 4: Projects/Achievements, 5: Contact
    const sectionSceneMap: Record<string, number> = {
      hero: 0,
      about: 1,
      skills: 2,
      experience: 3,
      projects: 4,
      achievements: 4,
      contact: 5,
    };

    const sectionIds = [
      "hero",
      "about",
      "skills",
      "experience",
      "projects",
      "achievements",
      "contact",
    ];

    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const sceneNum = sectionSceneMap[id] ?? 0;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveScene(sceneNum),
          onEnterBack: () => setActiveScene(sceneNum),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      triggers.forEach((t) => t.kill());
    };
  }, [setActiveScene, setScrollProgress]);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Background: Executive High-Rise Glass Boardroom Environment (User Uploaded) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Next.js optimized background image */}
        <img
          src="/executive-office-bg.jpg"
          alt="Executive Office Environment"
          className="w-full h-full object-cover object-center opacity-25"
        />
        {/* Crisp daylight veil ensuring 100% text contrast and high visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-light-grid opacity-50" />
      </div>

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Floating Modern Navigation */}
      <Navbar />

      {/* Side Scene Navigation & Progress Track */}
      <SceneNav activeScene={activeScene} scrollProgress={scrollProgress} />

      {/* Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsInteractive />
        <ExperienceTimeline />
        <ProjectsSection />
        <EducationAchievements />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <PortfolioProvider>
      <PortfolioHome />
    </PortfolioProvider>
  );
}
