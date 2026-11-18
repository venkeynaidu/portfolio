"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Terminal, Server, Database, Cloud } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

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
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/80 relative">
      <div className="flex flex-col items-center text-center mb-14">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/40 text-cyan-400 bg-cyan-950/40">
          Scene 03 // Holographic Workstation &amp; Tech Stack
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Technical Competencies &amp; System Stack
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          Engineered across 6 years of building production-grade services, high-throughput event buses, and resilient APIs.
        </p>

        {/* Filter Tabs in Dark Cyber Glass */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl pearl-glass max-w-2xl">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-400 to-indigo-600 text-black font-bold shadow-md shadow-cyan-500/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredCategories.map((category) => (
            <motion.div
              layout
              key={category.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="pearl-glass hover:border-cyan-400/50 transition-all duration-300 h-full shadow-lg">
                <CardContent className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200 flex items-center gap-2">
                            {skill.name}
                            {skill.tag && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                                {skill.tag}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-cyan-400 font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
