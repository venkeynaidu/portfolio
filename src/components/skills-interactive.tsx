"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Layout, Cloud, Database, Cpu, Terminal, Sparkles } from "lucide-react";
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
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-14">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-indigo-400/40 text-indigo-700 bg-indigo-50">
          Chapter 03 · The Workstation
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Technical Competencies &amp; System Stack
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          Engineered across 6 years of building production-grade services, high-throughput event buses, and resilient APIs.
        </p>

        {/* Filter Tabs in Pearl Glass */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl pearl-glass max-w-2xl">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
              <Card className="pearl-glass hover:border-sky-400/40 transition-all duration-300 h-full">
                <CardContent className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 flex items-center gap-2">
                            {skill.name}
                            {skill.tag && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200">
                                {skill.tag}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-slate-500 font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500"
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
