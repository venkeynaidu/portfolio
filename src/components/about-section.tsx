"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function AboutSection() {
  const coreStrengths = [
    {
      title: "Event-Driven Microservices",
      desc: "Architecting real-time event streaming pipelines with Apache Kafka for asynchronous notifications and decoupled workflows.",
      icon: Zap,
      color: "text-amber-400 bg-amber-400/10",
    },
    {
      title: "High-Throughput APIs",
      desc: "Engineering secure, modular RESTful APIs using Python, Django REST Framework, and FastAPI for seamless cross-platform communication.",
      icon: Cpu,
      color: "text-cyan-400 bg-cyan-400/10",
    },
    {
      title: "Automated QA & Reliability",
      desc: "Delivering resilient systems with 100% automated regression and end-to-end testing powered by Playwright and Postman.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-400/10",
    },
    {
      title: "Cloud & Container Orchestration",
      desc: "Packaging services with Docker and deploying on Kubernetes & AWS (IAM) to guarantee continuous availability and high uptime.",
      icon: Layers,
      color: "text-indigo-400 bg-indigo-400/10",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
          Professional Background
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Engineering Philosophy &amp; Experience
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          A dedicated software engineer with 6 years of expertise building mission-critical enterprise systems, supply-chain ERPs, and distributed cloud applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Profile Image Column */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-cyan-500/20 to-purple-500/30 blur-2xl opacity-75" />

            {/* Image Card Container */}
            <div className="relative rounded-2xl overflow-hidden glass-card p-2 border border-white/10 shadow-2xl">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover object-center filter saturate-[1.05] contrast-[1.05]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-lg font-bold tracking-tight">
                    {portfolioData.personal.name}
                  </div>
                  <div className="text-xs text-cyan-300 font-mono">
                    Full Stack Developer &bull; 6 Years Exp
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-1">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative & Credentials Column */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              I am a <strong className="text-foreground">Full Stack Developer with 6 years of experience</strong> architecting
              high-performance web applications across the full lifecycle—from requirement gathering and data modeling to
              cloud deployment and end-to-end automated verification.
            </p>
            <p>
              Currently, I engineer the <strong className="text-foreground">Project Management System (PMS)</strong> for the{" "}
              <strong className="text-cyan-400">Aeronautical Development Agency (ADA)</strong> at Micro Genesis Tech Soft,
              delivering real-time ticket tracking, requirement management, and analytical dashboards integrated with
              Apache Kafka event streaming.
            </p>
            <p>
              Previously at Tulasi Technologies, I spearheaded large-scale ERP platforms including Sri Bhagya Lakshmi Enterprises
              and full-scale Poultry Industry ERP solutions, automating manufacturing, logistics, and multi-tier financial workflows.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
              <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
              <div className="text-xs truncate">
                <span className="text-muted-foreground block text-[10px]">Email</span>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-foreground hover:text-cyan-400 transition-colors font-mono">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
              <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <span className="text-muted-foreground block text-[10px]">Phone</span>
                <span className="text-foreground font-mono">{portfolioData.personal.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3 sm:col-span-2">
              <GraduationCap className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-muted-foreground block text-[10px]">Education</span>
                <span className="text-foreground font-medium">
                  B.Tech in Electrical and Electronics Engineering &bull; Sri Prakash College of Engineering (JNTUK), 2018
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coreStrengths.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Card className="h-full glass-card hover:border-indigo-500/40 transition-all duration-300">
                <CardContent className="p-5 space-y-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-sm tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
