"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  CheckCircle2,
  Layers,
  ShieldCheck,
  Cpu,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
  HeartHandshake,
  Bot,
  Terminal,
  Code2,
  Play,
  Copy,
  Check,
} from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio-data";

function ProjectCodeTerminal({ project }: { project: ProjectItem }) {
  const [activeTab, setActiveTab] = useState<"code" | "output">("code");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = project.codeSnippet.code.split("\n");

  return (
    <div className="w-full bg-[#0a0f1d] border-b border-slate-200/80 rounded-t-xl overflow-hidden font-mono text-xs shadow-inner">
      {/* IDE Top Window Chrome */}
      <div className="bg-[#050814] px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded bg-slate-800/90 text-sky-300 text-[11px] font-medium border border-slate-700">
            <Code2 className="h-3 w-3 text-sky-400" />
            <span>{project.codeSnippet.filename}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("code")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              activeTab === "code"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Source
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 ${
              activeTab === "output"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Play className="h-2.5 w-2.5" />
            Output
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Code / Output Area */}
      {activeTab === "code" ? (
        <div className="p-4 overflow-x-auto text-[11px] leading-relaxed max-h-52 bg-[#080d1a]">
          <div className="grid grid-cols-[24px_1fr] gap-3 text-slate-400">
            <div className="select-none text-right text-slate-600">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="overflow-x-auto text-slate-200 whitespace-pre">
              {lines.map((line, i) => {
                // Realistic syntax coloring
                const isComment = line.trim().startsWith("#") || line.trim().startsWith("//");
                const isDecorator = line.trim().startsWith("@");
                const hasKeyword = /\b(class|def|async|await|return|import|from|with|try|except|if|for)\b/.test(line);

                return (
                  <div key={i}>
                    {isComment ? (
                      <span className="text-slate-500 italic">{line}</span>
                    ) : isDecorator ? (
                      <span className="text-amber-400 font-semibold">{line}</span>
                    ) : hasKeyword ? (
                      <span>
                        {line.split(/\b(class|def|async|await|return|import|from|with|try|except|if|for)\b/g).map((part, pIdx) =>
                          ["class", "def", "async", "await", "return", "import", "from", "with", "try", "except", "if", "for"].includes(part) ? (
                            <span key={pIdx} className="text-purple-400 font-bold">{part}</span>
                          ) : (
                            <span key={pIdx} className="text-sky-200">{part}</span>
                          )
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-300">{line}</span>
                    )}
                    {i === lines.length - 1 && (
                      <span className="inline-block w-1.5 h-3 bg-sky-400 ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#050914] text-[11px] text-emerald-400 leading-relaxed font-mono max-h-52 overflow-y-auto space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
            <Terminal className="h-3.5 w-3.5" />
            <span>Telemetry Response &bull; 200 OK</span>
          </div>
          <div className="p-2.5 rounded bg-black/60 border border-slate-800 text-slate-300 whitespace-pre-wrap">
            {project.codeSnippet.output}
          </div>
          <div className="text-[10px] text-slate-500">
            Verified execution in production environment &bull; Latency &lt; 20ms
          </div>
        </div>
      )}

      {/* Terminal Footer Strip */}
      <div className="bg-[#050814] px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>{project.codeSnippet.language}</span>
        </span>
        <span className="text-slate-500">{project.client}</span>
      </div>
    </div>
  );
}

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
    if (title.includes("Chicken") || title.includes("Poultry")) return EggIcon;
    if (title.includes("Food") || title.includes("SBL")) return Building2Icon;
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
          Scene 05 // Live Architecture &amp; Deliverables
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Enterprise Systems &amp; Live Architecture
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
                  {/* Interactive Code & Telemetry Window */}
                  <ProjectCodeTerminal project={project} />

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

                    <div className="flex items-center justify-between text-xs pt-2 flex-wrap gap-2">
                      <div className="text-indigo-700 font-semibold flex items-center gap-1.5">
                        <span className="text-slate-500 font-normal">Client:</span>
                        <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-slate-500 text-[11px]">
                        <MapPin className="h-3 w-3 text-sky-600" />
                        <span>{project.locationType}</span>
                      </div>
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

function EggIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3C8 3 5 9 5 15a7 7 0 0 0 14 0c0-6-3-12-7-12Z" />
    </svg>
  );
}

function Building2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 10h4v12h-4ZM2 14h4v8H2Z" />
    </svg>
  );
}
