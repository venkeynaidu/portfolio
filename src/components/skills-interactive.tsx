"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Layout, Cloud, Database, Cpu, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

const categoryColorMap: Record<
  string,
  {
    cardClass: string;
    iconClass: string;
    badgeClass: string;
    barGradient: string;
    textColor: string;
  }
> = {
  backend: {
    cardClass: "vibrant-card-emerald",
    iconClass: "text-emerald-400 bg-emerald-950/80 border-emerald-500/50",
    badgeClass: "text-emerald-300 bg-emerald-950/90 border-emerald-500/40",
    barGradient: "from-emerald-500 via-teal-400 to-cyan-400",
    textColor: "text-emerald-400",
  },
  frontend: {
    cardClass: "vibrant-card-cyan",
    iconClass: "text-sky-400 bg-sky-950/80 border-sky-500/50",
    badgeClass: "text-sky-300 bg-sky-950/90 border-sky-500/40",
    barGradient: "from-sky-500 via-cyan-400 to-indigo-400",
    textColor: "text-sky-400",
  },
  cloud: {
    cardClass: "vibrant-card-purple",
    iconClass: "text-purple-400 bg-purple-950/80 border-purple-500/50",
    badgeClass: "text-purple-300 bg-purple-950/90 border-purple-500/40",
    barGradient: "from-purple-500 via-indigo-400 to-sky-400",
    textColor: "text-purple-400",
  },
  databases: {
    cardClass: "vibrant-card-amber",
    iconClass: "text-amber-400 bg-amber-950/80 border-amber-500/50",
    badgeClass: "text-amber-300 bg-amber-950/90 border-amber-500/40",
    barGradient: "from-amber-500 via-orange-400 to-red-400",
    textColor: "text-amber-400",
  },
};

export function SkillsInteractive() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = portfolioData.skillCategories;

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => cat.title.toLowerCase().includes(activeTab.toLowerCase()));

  const tabOptions = [
    { id: "all", label: "All Technologies" },
    { id: "backend", label: "Backend & Microservices" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "databases", label: "Databases & AI Tools" },
  ];

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800 relative">
      <div className="flex flex-col items-center text-center mb-14">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-indigo-400/50 text-indigo-300 bg-indigo-950/80 px-3.5 py-1">
          Scene 03 · Engineering Competencies
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Technical Competencies &amp; System Stack
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
          Engineered across 6 years of building production-grade services, high-throughput event buses, and resilient APIs.
        </p>

        {/* Filter Tabs in Multi-Color Glass */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-2xl">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30 scale-105"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredCategories.map((category, idx) => {
            const key = category.title.toLowerCase().includes("backend")
              ? "backend"
              : category.title.toLowerCase().includes("frontend")
              ? "frontend"
              : category.title.toLowerCase().includes("cloud")
              ? "cloud"
              : "databases";

            const theme = categoryColorMap[key];

            return (
              <motion.div
                layout
                key={category.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <Card className={cn("transition-all duration-300 h-full shadow-xl", theme.cardClass)}>
                  <CardContent className="p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-white">
                          {category.title}
                        </h3>
                        <p className={cn("text-xs font-medium mt-0.5", theme.textColor)}>
                          {category.description}
                        </p>
                      </div>
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", theme.iconClass)}>
                        <Cpu className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-100 flex items-center gap-2">
                              {skill.name}
                              {skill.tag && (
                                <span className={cn("px-2 py-0.5 rounded text-[10px] font-mono border", theme.badgeClass)}>
                                  {skill.tag}
                                </span>
                              )}
                            </span>
                            <span className="font-mono text-slate-300 font-bold">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-900/90 overflow-hidden border border-slate-700/80">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={cn("h-full rounded-full bg-gradient-to-r", theme.barGradient)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
