"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, MapPin, Building, ChevronRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
          Career Journey
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Work Experience
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          6 years of delivering robust backend architectures, distributed event pipelines, and scalable enterprise web apps.
        </p>
      </div>

      <div className="relative border-l border-indigo-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {portfolioData.experience.map((item, idx) => (
          <motion.div
            key={item.company + item.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            className="relative group"
          >
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-5 w-5 items-center justify-center">
              <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${item.current ? "bg-cyan-400" : "bg-indigo-400"}`}>
                {item.current && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                )}
              </span>
            </div>

            <Card className="glass-card hover:border-indigo-500/40 transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-5">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {item.role}
                      </h3>
                      {item.current && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[11px] font-mono">
                          Present Role
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm mt-1">
                      <Building className="h-4 w-4 shrink-0" />
                      <span>{item.company}</span>
                      <span className="text-muted-foreground">&bull;</span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-xs text-muted-foreground font-mono self-start sm:self-auto">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Client / Project Callout */}
                {item.client && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                    <span className="font-semibold text-white">Client / Platform:</span>
                    <span>{item.client}</span>
                    {item.project && <span className="text-muted-foreground">({item.project})</span>}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                    Core Technical Impact:
                  </span>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Environment Badges */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.environment.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-[11px] bg-slate-900/80 hover:bg-slate-800 border-white/5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
