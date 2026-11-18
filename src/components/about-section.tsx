"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Layers,
  Cpu,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

export function AboutSection() {
  const coreStrengths = [
    {
      title: "Air-Gapped AI & Defense",
      desc: "Architecting offline AI video conferencing systems with automated MoM audio transcripts for defense clients (ADA) with zero internet dependency.",
      icon: Zap,
      color: "text-amber-400 bg-amber-950/40 border-amber-500/30",
    },
    {
      title: "High-Throughput APIs & Microservices",
      desc: "Engineering secure, modular RESTful APIs using Python, Django REST Framework, and FastAPI with Apache Kafka real-time event streaming.",
      icon: Cpu,
      color: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
    },
    {
      title: "Automated QA & Reliability",
      desc: "Delivering resilient enterprise systems with 100% automated regression and functional test pipelines powered by Playwright and Postman.",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
    },
    {
      title: "Cloud & Container Orchestration",
      desc: "Packaging multi-service backends into Docker containers and orchestrating microservices on Kubernetes and AWS (IAM) for continuous high availability.",
      icon: Layers,
      color: "text-indigo-400 bg-indigo-950/40 border-indigo-500/30",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/80 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/40 text-cyan-400 bg-cyan-950/40">
          Scene 02 // Identity &amp; Background
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Professional Background &amp; Engineering Focus
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Innovative Full Stack Developer with 6 years of experience architecting enterprise-grade web applications, air-gapped AI solutions, and industrial ERPs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Profile Portrait Column */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Luminous Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 blur-2xl opacity-80" />

            {/* Holographic Frame Container */}
            <div className="relative rounded-2xl overflow-hidden pearl-glass p-2.5 shadow-xl">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover object-center filter saturate-[1.05]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-lg font-bold tracking-tight">
                    {portfolioData.personal.name}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono">
                    Full Stack Developer &bull; 6 Years Exp
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      {portfolioData.personal.location}
                    </span>
                    <span className="font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                      1 Month Notice
                    </span>
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
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p className="font-medium text-white">
              {portfolioData.personal.summary}
            </p>
            <p>
              Currently at <strong className="text-white font-bold">MicroGenesis Techsoft</strong>, I architect and build the{" "}
              <strong className="text-cyan-400 font-bold">Project Management System (PMS)</strong> and an{" "}
              <strong className="text-indigo-400 font-bold">Air-Gapped AI Video Conferencing System (VCS)</strong> for the{" "}
              <strong className="text-white font-bold">Aeronautical Development Agency (ADA)</strong>, integrating Jitsi WebRTC, live AI Minutes of Meeting synthesis, and real-time Kafka event streaming.
            </p>
            <p>
              Previously at <strong className="text-white font-bold">Tulasi Technologies</strong>, I engineered large-scale ERP platforms for{" "}
              <strong className="text-white font-bold">Godrej Foods, Central Poultry Malawi, and Sri Bhagya Lakshmi Enterprises (SBL)</strong>, managing complete agricultural supply chains, fleet logistics, and database replication.
            </p>
          </div>

          {/* Quick Info Grid in Dark Cyber Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={portfolioData.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl pearl-glass flex items-center justify-between hover:border-cyan-400/50 transition-colors group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center shrink-0">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <div className="text-xs truncate">
                  <span className="text-slate-400 block text-[10px]">LinkedIn Profile</span>
                  <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors font-mono">
                    venkatesh-garaga
                  </span>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-400" />
            </a>

            <div className="p-3.5 rounded-xl pearl-glass flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-950/50 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Notice Period / Availability</span>
                <span className="text-amber-300 font-semibold font-mono">
                  {portfolioData.personal.noticePeriod}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl pearl-glass flex items-center gap-3">
              <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
              <div className="text-xs truncate">
                <span className="text-slate-400 block text-[10px]">Email Address</span>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-white font-semibold hover:text-cyan-400 transition-colors font-mono">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl pearl-glass flex items-center gap-3">
              <Phone className="h-4 w-4 text-sky-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Direct Phone</span>
                <span className="text-white font-semibold font-mono">{portfolioData.personal.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl pearl-glass flex items-center gap-3 sm:col-span-2">
              <GraduationCap className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Engineering Qualification</span>
                <span className="text-white font-semibold">
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
              <Card className="h-full pearl-glass hover:border-cyan-400/50 transition-all duration-300">
                <CardContent className="p-5 space-y-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
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
