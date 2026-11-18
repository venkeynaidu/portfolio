"use client";

import { useState } from "react";
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
  Building,
  Monitor,
  Terminal,
  Server,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

const aboutOfficeGifs = [
  {
    id: "workspace",
    label: "🏢 Tech Workspace",
    gif: "/office/tech-workspace.gif",
    role: "Senior Full Stack Dev Environment",
    location: "Bengaluru, India (ADA Offsite)",
  },
  {
    id: "coding",
    label: "💻 Code & Architecture",
    gif: "/office/office-desk-coding.gif",
    role: "Python, Django & Kafka Event Streaming",
    location: "Enterprise Cloud Hub",
  },
  {
    id: "servers",
    label: "⚙️ DevOps & Cloud",
    gif: "/office/server-operations.gif",
    role: "Docker, Kubernetes & AWS IAM Deployments",
    location: "High-Availability Infrastructure",
  },
];

export function AboutSection() {
  const [selectedGif, setSelectedGif] = useState(aboutOfficeGifs[0]);

  const coreStrengths = [
    {
      title: "Air-Gapped AI & Defense",
      desc: "Architecting offline AI video conferencing systems with automated MoM audio transcripts for defense clients (ADA) with zero internet dependency.",
      icon: Zap,
      cardClass: "vibrant-card-amber",
      iconClass: "text-amber-400 bg-amber-950/80 border-amber-500/40",
      badgeClass: "text-amber-300 bg-amber-950/80 border-amber-500/30",
    },
    {
      title: "High-Throughput APIs & Microservices",
      desc: "Engineering secure, modular RESTful APIs using Python, Django REST Framework, and FastAPI with Apache Kafka real-time event streaming.",
      icon: Cpu,
      cardClass: "vibrant-card-cyan",
      iconClass: "text-sky-400 bg-sky-950/80 border-sky-500/40",
      badgeClass: "text-sky-300 bg-sky-950/80 border-sky-500/30",
    },
    {
      title: "Automated QA & Reliability",
      desc: "Delivering resilient enterprise systems with 100% automated regression and functional test pipelines powered by Playwright and Postman.",
      icon: CheckCircle2,
      cardClass: "vibrant-card-emerald",
      iconClass: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40",
      badgeClass: "text-emerald-300 bg-emerald-950/80 border-emerald-500/30",
    },
    {
      title: "Cloud & Container Orchestration",
      desc: "Packaging multi-service backends into Docker containers and orchestrating microservices on Kubernetes and AWS (IAM) for continuous high availability.",
      icon: Layers,
      cardClass: "vibrant-card-purple",
      iconClass: "text-purple-400 bg-purple-950/80 border-purple-500/40",
      badgeClass: "text-purple-300 bg-purple-950/80 border-purple-500/30",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/50 text-sky-300 bg-sky-950/80 px-3.5 py-1">
          Chapter 02 · Engineering Profile &amp; Background
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Professional Background &amp; Engineering Identity
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Innovative Full Stack Developer with 6 years of experience architecting enterprise-grade web applications, air-gapped AI solutions, and industrial ERPs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Office GIF Showcase Column (Replacing Personal Image) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#111a2e] to-[#0a0f1d] border border-sky-500/40 p-4 shadow-2xl shadow-sky-500/10">
            {/* Interactive Office GIF Selector */}
            <div className="flex flex-wrap gap-1.5 mb-3 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
              {aboutOfficeGifs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedGif(tab)}
                  className={cn(
                    "flex-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 text-center",
                    selectedGif.id === tab.id
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Office Animated GIF Display */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-700 bg-black">
              <Image
                src={selectedGif.gif}
                alt={selectedGif.label}
                fill
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-sm font-bold text-sky-300">
                  {selectedGif.role}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    {selectedGif.location}
                  </span>
                  <span className="font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-400/40 text-[11px]">
                    1 Month Notice
                  </span>
                </div>
              </div>
            </div>

            {/* Engineering Highlights Footer */}
            <div className="mt-3.5 grid grid-cols-2 gap-2 text-center pt-3 border-t border-slate-800">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs font-bold text-sky-400 font-mono">ADA Defense</div>
                <div className="text-[10px] text-slate-300">Air-Gapped Systems</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-xs font-bold text-emerald-400 font-mono">Multi-Tenant ERP</div>
                <div className="text-[10px] text-slate-300">Agricultural Supply</div>
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
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
            <p className="font-semibold text-white text-base sm:text-lg">
              {portfolioData.personal.summary}
            </p>
            <p>
              Currently at <strong className="text-sky-300 font-bold">MicroGenesis Techsoft</strong>, I architect and build the{" "}
              <strong className="text-sky-300 font-bold">Project Management System (PMS)</strong> and an{" "}
              <strong className="text-indigo-300 font-bold">Air-Gapped AI Video Conferencing System (VCS)</strong> for the{" "}
              <strong className="text-white font-bold">Aeronautical Development Agency (ADA)</strong>, integrating Jitsi WebRTC, live AI Minutes of Meeting synthesis, and real-time Kafka event streaming.
            </p>
            <p>
              Previously at <strong className="text-emerald-300 font-bold">Tulasi Technologies</strong>, I engineered large-scale ERP platforms for{" "}
              <strong className="text-white font-bold">Godrej Foods, Central Poultry Malawi, and Sri Bhagya Lakshmi Enterprises (SBL)</strong>, managing complete agricultural supply chains, fleet logistics, and database replication.
            </p>
          </div>

          {/* Quick Info Grid with Vibrant Multi-Color Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={portfolioData.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#0e172a] border border-sky-500/40 flex items-center justify-between hover:border-sky-400 transition-colors group shadow-lg"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center shrink-0">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <div className="text-xs truncate">
                  <span className="text-slate-400 block text-[10px]">LinkedIn Profile</span>
                  <span className="text-sky-300 font-semibold group-hover:text-white transition-colors font-mono">
                    venkatesh-garaga
                  </span>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-sky-400 group-hover:text-white" />
            </a>

            <div className="p-3.5 rounded-xl bg-[#1f1709] border border-amber-500/40 flex items-center gap-3 shadow-lg">
              <div className="h-8 w-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-500/50 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="text-amber-300/80 block text-[10px]">Notice Period / Availability</span>
                <span className="text-amber-200 font-bold font-mono">
                  {portfolioData.personal.noticePeriod}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#17112c] border border-purple-500/40 flex items-center gap-3 shadow-lg">
              <Mail className="h-5 w-5 text-purple-400 shrink-0" />
              <div className="text-xs truncate">
                <span className="text-purple-300/80 block text-[10px]">Email Address</span>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-white font-semibold hover:text-purple-300 transition-colors font-mono">
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a1f18] border border-emerald-500/40 flex items-center gap-3 shadow-lg">
              <Phone className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-emerald-300/80 block text-[10px]">Direct Phone</span>
                <span className="text-emerald-200 font-bold font-mono">{portfolioData.personal.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e172a] border border-slate-700 flex items-center gap-3 sm:col-span-2 shadow-lg">
              <GraduationCap className="h-5 w-5 text-sky-400 shrink-0" />
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

      {/* Core Architectural Pillars in Vibrant Colors */}
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
              <Card className={cn("h-full transition-all duration-300", item.cardClass)}>
                <CardContent className="p-5 space-y-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-base tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
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
