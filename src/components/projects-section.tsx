"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  CheckCircle2,
  Plane,
  Building2,
  Egg,
  Radio,
  ExternalLink,
  Layers,
  ShieldCheck,
  Cpu,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
  HeartHandshake,
  Bot,
} from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio-data";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: `All Systems (${portfolioData.projects.length})` },
    { id: "defense", label: "Defense & Air-Gapped AI" },
    { id: "erp", label: "Industrial ERPs" },
    { id: "web", label: "E-Commerce & Portals" },
    { id: "embedded", label: "Embedded Hardware" },
  ];

  const getFilteredProjects = () => {
    if (activeFilter === "all") return portfolioData.projects;
    if (activeFilter === "defense") {
      return portfolioData.projects.filter(
        (p) => p.category.includes("Defense") || p.title.includes("VCS") || p.title.includes("PMS")
      );
    }
    if (activeFilter === "erp") {
      return portfolioData.projects.filter(
        (p) => p.category.includes("ERP") || p.category.includes("Industrial") || p.title.includes("Food")
      );
    }
    if (activeFilter === "web") {
      return portfolioData.projects.filter(
        (p) => p.category.includes("E-Commerce") || p.category.includes("Community") || p.title.includes("Cartel") || p.title.includes("Catholica")
      );
    }
    if (activeFilter === "embedded") {
      return portfolioData.projects.filter(
        (p) => p.category.includes("Embedded") || p.title.includes("Servo")
      );
    }
    return portfolioData.projects;
  };

  const getProjectIcon = (category: string, title: string) => {
    if (title.includes("VCS")) return Bot;
    if (title.includes("PMS") || category.includes("Defense")) return ShieldCheck;
    if (title.includes("Chicken") || title.includes("Poultry")) return Egg;
    if (title.includes("Food") || title.includes("SBL")) return Building2;
    if (title.includes("Cartel")) return ShoppingBag;
    if (title.includes("Catholica")) return HeartHandshake;
    if (title.includes("Servo")) return Cpu;
    return Layers;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-700 bg-sky-50">
          Scene 05 // 3D Work Exhibition &amp; Deliverables
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Enterprise Systems &amp; Project Deliverables
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
          Verified production platforms spanning defense air-gapped AI video conferencing, mission-critical PMS, multi-enterprise supply chain ERPs, and full-stack web applications.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl pearl-glass max-w-3xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const Icon = getProjectIcon(project.category, project.title);
            const screenshot = project.screenshot || "/projects/progress-results.png";

            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="h-full"
              >
                <Card className="h-full pearl-glass hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-md hover:shadow-xl">
                  {/* Window GUI Chrome Header */}
                  <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      <span className="ml-2 font-mono text-[11px] text-slate-500 truncate max-w-[200px]">
                        {project.client}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200/70">
                      <MapPin className="h-3 w-3 text-sky-600" />
                      <span>{project.locationType}</span>
                    </div>
                  </div>

                  {/* Visual Interface Preview */}
                  <div className="relative w-full aspect-[16/9] bg-slate-950 overflow-hidden">
                    <Image
                      src={screenshot}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white flex-wrap gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-mono font-semibold bg-slate-900/85 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                        <Icon className="h-3.5 w-3.5 text-sky-400" />
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-200 bg-slate-900/85 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-sky-400" />
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        {project.subtitle && (
                          <p className="text-xs font-medium text-sky-700 mt-1">
                            {project.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-indigo-700 font-semibold pt-1 flex items-center gap-1.5">
                      <span className="text-slate-500 font-normal">Organization / Client:</span>
                      <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{project.client}</span>
                    </div>

                    <CardDescription className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-normal">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 space-y-4">
                    {/* Architectural Highlights */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 block flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-sky-600" />
                        Key Architectural Deliverables:
                      </span>
                      <ul className="space-y-1.5">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Environment Badges */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.environment.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
