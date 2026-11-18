"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Mail, Sparkles, Layers, Cpu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-60 pointer-events-none -z-10" />

      {/* Luminous Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-400/15 via-indigo-300/10 to-violet-400/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-50/80 backdrop-blur-md text-xs font-semibold text-sky-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span>{portfolioData.personal.availability}</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants} className="space-y-3 mb-6">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-indigo-600 font-bold">
            Human-Robot Digital Twin &bull; 6 Years Experience
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
            Architecting{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
              event-driven systems
            </span>{" "}
            &amp; enterprise cloud platforms.
          </p>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mb-9 leading-relaxed font-normal"
        >
          {portfolioData.personal.summary}
        </motion.p>

        {/* Action Button Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full gap-2 px-7 shadow-lg shadow-sky-500/25 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 hover:opacity-95 text-white font-semibold border-0"
            )}
          >
            Explore 3D Work Exhibition
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full gap-2 px-6 border-slate-300 bg-white/90 hover:bg-slate-50 text-slate-800 font-semibold shadow-sm"
            )}
          >
            <Download className="h-4 w-4 text-sky-600" />
            Download Resume (PDF)
          </a>

          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "rounded-full gap-2 px-5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold"
            )}
          >
            <Mail className="h-4 w-4" />
            Connect
          </Link>
        </motion.div>

        {/* Stats Row in Pearl Glass */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {portfolioData.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl pearl-glass text-center hover:border-sky-400/40 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800 tracking-tight">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
