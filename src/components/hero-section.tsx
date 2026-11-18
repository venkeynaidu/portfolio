"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  Layers,
  Cpu,
  Clock,
  ExternalLink,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

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
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-techno-grid opacity-35 pointer-events-none -z-10" />

      {/* Luminous Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-violet-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Availability & Notice Period Badges */}
        <motion.div variants={itemVariants} className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/50 backdrop-blur-md text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span>{portfolioData.personal.availability}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/50 text-xs font-semibold text-amber-300 shadow-sm font-mono">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>{portfolioData.personal.noticePeriod}</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants} className="space-y-3 mb-6">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center justify-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Full-Stack Cloud Architecture &bull; 6 Years Experience</span>
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              {portfolioData.personal.name}
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-200">
            Architecting{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
              event-driven systems
            </span>{" "}
            &amp; enterprise cloud platforms.
          </p>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mb-7 leading-relaxed font-normal"
        >
          {portfolioData.personal.summary}
        </motion.p>

        {/* Top 5 Key Skills Chips */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 mb-9">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider mr-1">
            Top Skills:
          </span>
          {portfolioData.top5Skills.map((sk) => (
            <span
              key={sk}
              className="px-3 py-1 rounded-full text-xs font-semibold font-mono bg-slate-900/80 text-cyan-300 border border-cyan-500/30 shadow-2xs"
            >
              {sk}
            </span>
          ))}
        </motion.div>

        {/* Action Button Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full gap-2 px-7 shadow-lg shadow-cyan-500/25 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:opacity-95 text-black font-bold border-0"
            )}
          >
            Explore 7 Systems
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={portfolioData.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full gap-2 px-6 border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-semibold shadow-sm"
            )}
          >
            <LinkedinIcon className="h-4 w-4 fill-current" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full gap-2 px-6 border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold shadow-sm"
            )}
          >
            <Download className="h-4 w-4 text-cyan-400" />
            Download Resume (PDF)
          </a>

          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "rounded-full gap-2 px-5 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold"
            )}
          >
            <Mail className="h-4 w-4" />
            Connect
          </Link>
        </motion.div>

        {/* Stats Row in Dark Cyber Glass */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {portfolioData.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl pearl-glass text-center hover:border-cyan-500/50 transition-all duration-300 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 mb-1 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white tracking-tight">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
