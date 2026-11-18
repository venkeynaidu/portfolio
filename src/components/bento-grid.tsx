"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Palette,
} from "lucide-react";

export function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          Capabilities & Showcase
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Architecture & Engineering Bento
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          A modular overview of application capabilities, system design, and cutting-edge frontend implementations.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Card 1: Main Project Feature (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="h-full border-border/80 bg-gradient-to-br from-card via-card to-muted/20 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Cpu className="h-4 w-4 text-indigo-500" />
                  Featured System
                </span>
                <Badge className="bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20">
                  Production Ready
                </Badge>
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                Autonomous AI Agent Workspace
              </CardTitle>
              <CardDescription className="text-sm">
                Real-time multi-agent execution canvas with live streaming, tool invocation, and full-stack orchestration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-border/50 bg-background/50 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/40">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Stack Status
                  </span>
                  <span>Turbopack v16.4</span>
                </div>
                <p className="text-foreground/90">
                  ⚡ Latency: &lt; 50ms &bull; Concurrent Pipelines: 12 &bull; Test Coverage: 98%
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <Badge variant="secondary">Next.js 16</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Framer Motion</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2: AI & UI/UX Pro Max Intelligence */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-border/80 bg-gradient-to-br from-card via-card to-muted/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Palette className="h-4 w-4 text-violet-500" />
                <Badge variant="outline" className="font-mono text-[10px]">
                  Design System
                </Badge>
              </div>
              <CardTitle className="text-xl">UI/UX Pro Max</CardTitle>
              <CardDescription className="text-xs">
                Integrated offline design intelligence database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  <span>80 curated UI styles & color reasoning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Zero-latency local BM25 design search</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>WCAG AAA accessibility compliance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3: 21st.dev Component Ecosystem */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-border/80 bg-gradient-to-br from-card via-card to-muted/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Layers className="h-4 w-4 text-cyan-500" />
                <Badge variant="outline" className="font-mono text-[10px]">
                  Registry
                </Badge>
              </div>
              <CardTitle className="text-xl">21st.dev Components</CardTitle>
              <CardDescription className="text-xs">
                Tailwind CSS & Framer Motion modular UI registry.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                Integrated with `@21st-dev/cli` and `shadcn` CLI for seamless drag-and-drop component scaffolding.
              </p>
              <div className="p-2.5 rounded-lg bg-muted/50 font-mono text-[11px] text-foreground">
                npx 21st add &lt;author&gt;/&lt;slug&gt;
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 4: Performance & Metrics (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="h-full border-border/80 bg-gradient-to-br from-card via-card to-muted/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-mono text-muted-foreground">Audit Score</span>
              </div>
              <CardTitle className="text-xl">Engineered for Velocity & Interaction</CardTitle>
              <CardDescription className="text-xs">
                Strict adherence to Core Web Vitals, server components, and fluid 60fps animations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                  <div className="text-2xl font-bold font-mono text-foreground">100</div>
                  <div className="text-[11px] text-muted-foreground">Performance</div>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                  <div className="text-2xl font-bold font-mono text-foreground">60fps</div>
                  <div className="text-[11px] text-muted-foreground">Smooth Motion</div>
                </div>
                <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                  <div className="text-2xl font-bold font-mono text-foreground">&lt; 0.8s</div>
                  <div className="text-[11px] text-muted-foreground">LCP Load Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
