"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  FolderGit2,
  Clock,
  Sparkles,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/80 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/40 text-cyan-400 bg-cyan-950/40">
          Scene 04 // Career Timeline
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Professional Work Experience
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          6 years of delivering robust backend architectures, distributed event pipelines, and scalable enterprise web apps.
        </p>
      </div>

      <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {portfolioData.experience.map((item, idx) => (
          <motion.div
            key={item.company + item.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            className="relative group"
          >
            {/* Glowing Timeline Marker Node */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 flex h-5 w-5 items-center justify-center">
              <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${item.current ? "bg-cyan-400 ring-4 ring-cyan-950" : "bg-indigo-500"}`}>
                {item.current && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                )}
              </span>
            </div>

            <Card className="pearl-glass hover:border-cyan-400/50 transition-all duration-300 overflow-hidden shadow-lg">
              <CardContent className="p-6 sm:p-8 space-y-5">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {item.role}
                      </h3>
                      {item.current && (
                        <Badge className="bg-emerald-950/70 text-emerald-400 border-emerald-500/40 text-[11px] font-mono font-semibold">
                          Present Active Role
                        </Badge>
                      )}
                      {item.noticePeriod && (
                        <Badge className="bg-amber-950/70 text-amber-300 border-amber-500/40 text-[11px] font-mono font-semibold flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.noticePeriod}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mt-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 shrink-0" />
                        <span>{item.company}</span>
                      </div>
                      <span className="text-slate-600 hidden sm:inline">&bull;</span>
                      <span className="text-slate-400 text-xs flex items-center gap-1 font-normal font-mono">
                        <MapPin className="h-3 w-3 text-cyan-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 shrink-0 self-start sm:self-auto">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 font-mono font-medium">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                    {item.duration && (
                      <span className="text-[11px] text-slate-400 font-mono pr-2">
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Client / Organization Scope */}
                {item.client && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-200 flex-wrap">
                    <span className="font-bold text-cyan-400">Client / Industry:</span>
                    <span className="font-medium text-slate-200">{item.client}</span>
                  </div>
                )}

                {/* Projects Pill Tags */}
                {item.projects && item.projects.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <FolderGit2 className="h-3.5 w-3.5 text-indigo-400" />
                      Projects:
                    </span>
                    {item.projects.map((proj) => (
                      <span
                        key={proj}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-500/30"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                )}

                {/* Top Skills Tag Row */}
                {item.topSkills && item.topSkills.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 shrink-0 font-mono">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      Top 5 key skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.topSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-900 text-slate-200 border border-cyan-500/25 shadow-2xs"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Authentic Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Core Technical Deliverables */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Core Technical Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
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
                        className="font-mono text-[11px] bg-slate-900/90 text-cyan-300 hover:bg-slate-800 border-slate-800"
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
