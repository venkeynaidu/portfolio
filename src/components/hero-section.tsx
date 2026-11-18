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
  ShieldCheck,
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
      {/* Soft ivory scrim so the copy reads cleanly over the live 3D office */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#f4efe7]/95 via-[#f4efe7]/80 to-transparent lg:to-[#f4efe7]/0" />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#efe9df] to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 text-left flex flex-col items-start [&>*]:max-w-2xl [&>*:last-child]:max-w-none"
      >
        {/* Availability & Notice Period Badges */}
        <motion.div variants={itemVariants} className="mb-5 flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/30 bg-sky-50/80 backdrop-blur-md text-xs font-semibold text-sky-800 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span>{portfolioData.personal.availability}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50/90 text-xs font-semibold text-amber-900 shadow-sm font-mono">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>{portfolioData.personal.noticePeriod}</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants} className="space-y-3 mb-6">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-indigo-600 font-bold">
            Senior Full Stack Engineer &bull; 6 Years Experience
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
          className="text-base sm:text-lg text-slate-600 max-w-3xl mb-7 leading-relaxed font-normal"
        >
          {portfolioData.personal.summary}
        </motion.p>

        {/* Top 5 Key Skills Chips */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-9">
          <span className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mr-1">
            Top Skills:
          </span>
          {portfolioData.top5Skills.map((sk) => (
            <span
              key={sk}
              className="px-3 py-1 rounded-full text-xs font-semibold font-mono bg-white/90 text-slate-800 border border-slate-200/90 shadow-2xs"
            >
              {sk}
            </span>
          ))}
        </motion.div>

        {/* Action Button Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3.5 mb-14"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full gap-2 px-7 shadow-lg shadow-sky-500/25 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 hover:opacity-95 text-white font-semibold border-0"
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
              "rounded-full gap-2 px-6 border-[#0077b5]/30 bg-sky-50/60 hover:bg-sky-100/80 text-[#0077b5] font-semibold shadow-sm"
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
              className="p-4 rounded-2xl pearl-glass text-center hover:border-sky-400/40 transition-all duration-300 shadow-sm"
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
