"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Terminal, Layers, ShieldCheck, Mail } from "lucide-react";
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
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none -z-10" />

      {/* Ambient Radial Gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-purple-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Availability Status Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{portfolioData.personal.availability}</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants} className="space-y-3 mb-6">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-indigo-400">
            Senior Full Stack &amp; Cloud Engineer
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 dark:from-white dark:via-cyan-200 dark:to-indigo-400 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground/90">
            Architecting{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              scalable event-driven systems
            </span>{" "}
            &amp; resilient platforms.
          </p>
        </motion.div>

        {/* Subtitle / Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-9 leading-relaxed font-normal"
        >
          {portfolioData.personal.summary}
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full gap-2 px-7 shadow-lg shadow-indigo-500/25 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium border-0"
            )}
          >
            Explore Featured Projects
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full gap-2 px-6 border-white/15 bg-background/50 backdrop-blur-sm hover:bg-white/10 text-foreground font-medium"
            )}
          >
            <Download className="h-4 w-4 text-cyan-400" />
            Download Resume (PDF)
          </a>

          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "rounded-full gap-2 px-5 hover:bg-white/5 text-muted-foreground hover:text-foreground"
            )}
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </Link>
        </motion.div>

        {/* Career Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {portfolioData.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl glass-card text-center hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-foreground tracking-tight">
                {stat.label}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
