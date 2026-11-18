"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

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

  const getProjectScreenshot = (title: string) => {
    if (title.includes("Aeronautical") || title.includes("PMS") || title.includes("Management")) {
      return "/projects/progress-results.png";
    }
    if (title.includes("Bhagya") || title.includes("Enterprises")) {
      return "/projects/connection.png";
    }
    if (title.includes("Poultry")) {
      return "/projects/run-history.png";
    }
    return "/projects/encryption.png";
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-700 bg-sky-50">
          Scene 05 // 3D Work Exhibition &amp; Deliverables
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Featured Enterprise Platforms
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
          Architectural deep-dives into mission-critical aerospace management systems, high-concurrency industrial ERP platforms, and distributed streaming engines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {portfolioData.projects.map((project, idx) => {
          const Icon = getProjectIcon(project.title);
          const screenshot = getProjectScreenshot(project.title);

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <Card className="h-full pearl-glass hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg">
                {/* Real Project Interface Header */}
                <div className="relative w-full aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-200">
                  <Image
                    src={screenshot}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5 text-xs font-mono font-semibold bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      <Icon className="h-3.5 w-3.5 text-sky-400" />
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded">
                      {project.period}
                    </span>
                  </div>
                </div>

                <CardHeader className="p-6 pb-3">
                  <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </CardTitle>

                  {project.client && (
                    <div className="text-xs text-indigo-600 font-semibold pt-1">
                      Client: <span className="text-slate-800">{project.client}</span>
                    </div>
                  )}

                  <CardDescription className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-2 space-y-4">
                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
                      Architectural Innovations:
                    </span>
                    <ul className="space-y-1.5">
                      {project.highlights.slice(0, 3).map((highlight, hIdx) => (
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
      </div>
    </section>
  );
}
