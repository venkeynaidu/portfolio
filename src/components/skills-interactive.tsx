"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Layout, Cloud, Database, Cpu, Sparkles } from "lucide-react";
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
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col items-center text-center mb-14">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
          Core Capabilities
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Technical Skills &amp; Stack
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          Engineered across 6 years of building production-grade services, high-throughput event buses, and resilient APIs.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl glass-card max-w-2xl">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
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
              <Card className="glass-card hover:border-indigo-500/30 transition-all duration-300 h-full">
                <CardContent className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground flex items-center gap-2">
                            {skill.name}
                            {skill.tag && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                {skill.tag}
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
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
