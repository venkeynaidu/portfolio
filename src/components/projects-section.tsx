"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
  Plane,
  Building2,
  Egg,
  Radio,
} from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio-data";

export function ProjectsSection() {
  const getProjectIcon = (title: string) => {
    if (title.includes("Aeronautical") || title.includes("PMS") || title.includes("Management")) {
      return Plane;
    }
    if (title.includes("Bhagya") || title.includes("Enterprises")) {
      return Building2;
    }
    if (title.includes("Poultry")) {
      return Egg;
    }
    return Radio;
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
          Selected Deliverables
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Featured Enterprise Projects
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Architectural deep-dives into mission-critical aerospace management systems, high-concurrency industrial ERP platforms, and distributed streaming engines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {portfolioData.projects.map((project, idx) => {
          const Icon = getProjectIcon(project.title);
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <Card className="h-full glass-card hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <CardHeader className="p-6 sm:p-7 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                      <Icon className="h-4 w-4" />
                      {project.category}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono border-white/10 text-muted-foreground">
                      {project.period}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </CardTitle>

                  {project.client && (
                    <div className="text-xs text-indigo-400 font-medium pt-1">
                      Client: <span className="text-foreground">{project.client}</span>
                    </div>
                  )}

                  <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 sm:p-7 pt-2 space-y-5">
                  {/* Architectural Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 block">
                      Architectural Highlights:
                    </span>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.environment.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-mono text-[10px] bg-slate-900/90 border border-white/5 text-slate-300"
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
      </div>
    </section>
  );
}
