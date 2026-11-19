"use client";

import { useState } from "react";
import Image from "next/image";
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
  Monitor,
  Terminal,
  Activity,
  Users,
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

const officeTabs = [
  {
    id: "boardroom",
    label: "🏢 Executive Boardroom",
    gif: "/executive-office-bg.jpg",
    tag: "High-Rise Headquarters & Strategy",
    desc: "Executive glass conference boardroom overlooking city skyline with collaborative architecture",
  },
  {
    id: "workstation",
    label: "🖥️ Dev Workstation",
    gif: "/office/developer-workstation.gif",
    tag: "Full-Stack Dev Setup",
    desc: "Python (Django, FastAPI), React.js, MySQL, Kafka event processing",
  },
  {
    id: "command",
    label: "🛰️ ADA Command Deck",
    gif: "/office/command-center.gif",
    tag: "Aeronautical Development Agency",
    desc: "Air-gapped AI video conferencing with automated Whisper MoM",
  },
  {
    id: "team",
    label: "👥 Agile Collaboration",
    gif: "/office/team-collaboration.gif",
    tag: "Sprint Engineering",
    desc: "Cross-functional Agile workflows, ticket management & CI/CD",
  },
  {
    id: "multiscreen",
    label: "📊 Operations Center",
    gif: "/office/multi-monitor.gif",
    tag: "High-Throughput Analytics",
    desc: "Real-time production, hatchery logistics & recycling pipelines",
  },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(officeTabs[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability & Notice Period Badges */}
            <motion.div variants={itemVariants} className="mb-5 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-xs font-semibold text-emerald-800 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span>{portfolioData.personal.availability}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-xs font-semibold text-amber-900 shadow-sm font-mono">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span>{portfolioData.personal.noticePeriod}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-300 bg-sky-50 text-xs font-semibold text-sky-800 shadow-sm font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
                <span>Air-Gapped Defense ADA Engineer</span>
              </div>
            </motion.div>

            {/* Hero Title with Maximum Color Contrast */}
            <motion.div variants={itemVariants} className="space-y-2 mb-5">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-600 font-bold flex items-center gap-2">
                <span className="h-1.5 w-6 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full" />
                Senior Full Stack Engineer &bull; 6 Years Experience
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {portfolioData.personal.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-700">
                Architecting{" "}
                <span className="text-sky-600 underline decoration-sky-400/50 underline-offset-4">
                  event-driven systems
                </span>{" "}
                &amp; enterprise cloud platforms.
              </p>
            </motion.div>

            {/* Narrative Description (Crisp, Highly Legible Text) */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mb-6 leading-relaxed font-normal"
            >
              {portfolioData.personal.summary}
            </motion.p>

            {/* Top 5 Key Skills Chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mr-1">
                Top Skills:
              </span>
              {portfolioData.top5Skills.map((sk, i) => {
                const colorStyles = [
                  "border-sky-300 bg-sky-50/70 text-sky-800",
                  "border-emerald-300 bg-emerald-50/70 text-emerald-800",
                  "border-indigo-300 bg-indigo-50/70 text-indigo-800",
                  "border-purple-300 bg-purple-50/70 text-purple-800",
                  "border-amber-300 bg-amber-50/70 text-amber-900",
                ];
                return (
                  <span
                    key={sk}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold font-mono border shadow-2xs",
                      colorStyles[i % colorStyles.length]
                    )}
                  >
                    {sk}
                  </span>
                );
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full gap-2 px-7 shadow-md shadow-sky-500/20 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:brightness-105 text-white font-bold border-0"
                )}
              >
                Explore 7 Live Systems
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={portfolioData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full gap-2 px-6 border-[#0077b5]/40 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] font-semibold shadow-2xs"
                )}
              >
                <LinkedinIcon className="h-4 w-4 fill-current" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#0077b5]" />
              </a>

              <a
                href={portfolioData.personal.resumePdf}
                download="Garaga_Venkatesh_Resume.pdf"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full gap-2 px-6 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold shadow-2xs"
                )}
              >
                <Download className="h-4 w-4 text-emerald-600" />
                Download Resume (PDF)
              </a>

              <Link
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "rounded-full gap-2 px-5 hover:bg-slate-100 text-slate-700 font-semibold"
                )}
              >
                <Mail className="h-4 w-4 text-amber-600" />
                Connect
              </Link>
            </motion.div>

            {/* Multi-Colored Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {[
                {
                  value: "6+ Years",
                  label: "Enterprise Experience",
                  subtext: "Python, Django, React, Kafka",
                  color: "border-sky-200 bg-sky-50/50 text-sky-600",
                },
                {
                  value: "100%",
                  label: "Air-Gapped Clearance",
                  subtext: "ADA Defense Video & MoM",
                  color: "border-emerald-200 bg-emerald-50/50 text-emerald-600",
                },
                {
                  value: "7 Systems",
                  label: "Shipped to Production",
                  subtext: "Defense, Poultry ERP, E-Com",
                  color: "border-purple-200 bg-purple-50/50 text-purple-600",
                },
                {
                  value: "1 Month",
                  label: "Notice Period",
                  subtext: "Immediate Onboarding Ready",
                  color: "border-amber-200 bg-amber-50/50 text-amber-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "p-4 rounded-2xl border text-center transition-all duration-300 shadow-sm hover:shadow-md",
                    stat.color
                  )}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 tracking-tight">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Office & Developer Workstation Showcase GIF */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-4 shadow-xl shadow-slate-200/50">
              {/* Interactive Office Showcase Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3 p-1 rounded-xl bg-slate-100 border border-slate-200">
                {officeTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5",
                      activeTab.id === tab.id
                        ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    )}
                  >
                    <span>{tab.label}</span>
                    {activeTab.id === tab.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-200 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

              {/* Main Office GIF Frame */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-black">
                <Image
                  src={activeTab.gif}
                  alt={activeTab.label}
                  fill
                  className="object-cover object-center"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Live Telemetry Pill */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/50 text-[11px] font-mono font-semibold text-emerald-300">
                  <Activity className="h-3 w-3 text-emerald-400 animate-spin" />
                  <span>LIVE // SPRINT WORKSPACE</span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-xs font-bold text-sky-300 font-mono">
                    {activeTab.tag}
                  </div>
                  <div className="text-[12px] text-slate-200 leading-snug line-clamp-2">
                    {activeTab.desc}
                  </div>
                </div>
              </div>

              {/* Engineering Hub Live Metrics Bar */}
              <div className="mt-3.5 grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-sky-700 font-mono">Python/DRF</div>
                  <div className="text-[10px] text-slate-600 font-medium">FastAPI &amp; MySQL</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-emerald-700 font-mono">Kafka / MQ</div>
                  <div className="text-[10px] text-slate-600 font-medium">Real-Time Events</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-purple-700 font-mono">Docker / K8s</div>
                  <div className="text-[10px] text-slate-600 font-medium">Cloud Deployments</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
