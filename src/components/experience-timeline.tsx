"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Building, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-700 bg-sky-50">
          Scene 04 // Career Timeline
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Professional Work Experience
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          6 years of delivering robust backend architectures, distributed event pipelines, and scalable enterprise web apps.
        </p>
      </div>

      <div className="relative border-l-2 border-sky-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
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
              <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${item.current ? "bg-sky-500 ring-4 ring-sky-100" : "bg-indigo-400"}`}>
                {item.current && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                )}
              </span>
            </div>

            <Card className="pearl-glass hover:border-sky-400/40 transition-all duration-300 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-5">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                        {item.role}
                      </h3>
                      {item.current && (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-mono">
                          Present Active Role
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mt-1">
                      <Building className="h-4 w-4 shrink-0" />
                      <span>{item.company}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500 text-xs flex items-center gap-1 font-normal">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono font-medium self-start sm:self-auto">
                    <Calendar className="h-3.5 w-3.5 text-sky-600" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Client / Project Scope Callout */}
                {item.client && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50/90 border border-sky-200 text-xs text-sky-900">
                    <span className="font-bold text-sky-700">Client / Platform:</span>
                    <span className="font-medium">{item.client}</span>
                    {item.project && <span className="text-slate-500 font-normal">({item.project})</span>}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                    Core Technical Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
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
                        className="font-mono text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
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
