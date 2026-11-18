"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Status Pill */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-muted/40 backdrop-blur-sm text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for new projects & collaborations</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          Building intelligent interfaces with{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            design precision
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Full-stack engineer crafting high-performance web applications. Powered by
          modern component architecture, AI-driven workflows, and fluid motion design.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full gap-2 px-6 shadow-md"
            )}
          >
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="#skills"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full gap-2 px-6"
            )}
          >
            <Layers className="h-4 w-4 text-primary" />
            Tech Stack
          </Link>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground/70 mr-1">
            Core Stack:
          </span>
          <Badge variant="secondary" className="font-mono">Next.js 16</Badge>
          <Badge variant="secondary" className="font-mono">Tailwind CSS v4</Badge>
          <Badge variant="secondary" className="font-mono">Framer Motion</Badge>
          <Badge variant="secondary" className="font-mono">shadcn/ui</Badge>
          <Badge variant="secondary" className="font-mono">21st.dev</Badge>
          <Badge variant="secondary" className="font-mono">UI/UX Pro Max</Badge>
        </motion.div>
      </motion.div>
    </section>
  );
}
