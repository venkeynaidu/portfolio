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
  Eye,
  Globe2,
  Film,
} from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio-data";
import { usePortfolio, ProjectWorldKey } from "@/context/portfolio-context";
import { getProjectWorld } from "@/lib/world-mapping";
import {
  PoultryAnimatedBanner,
  DefenseAnimatedBanner,
  BeverageAnimatedBanner,
  EcommerceAnimatedBanner,
  MatrimonyAnimatedBanner,
  HardwareAnimatedBanner,
} from "@/components/project-animated-visuals";

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
    <div className="w-full bg-[#050814] border-b border-slate-800 rounded-t-xl overflow-hidden font-mono text-xs shadow-inner">
      {/* IDE Top Window Chrome */}
      <div className="bg-[#03060f] px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded bg-slate-900 text-sky-400 text-[11px] font-medium border border-slate-800">
            <Code2 className="h-3 w-3 text-sky-400" />
            <span>{project.codeSnippet.filename}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("code")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              activeTab === "code"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Source
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors flex items-center gap-1 ${
              activeTab === "output"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
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
        <div className="p-4 overflow-x-auto text-[11px] leading-relaxed max-h-52 bg-[#060a17]">
          <div className="grid grid-cols-[24px_1fr] gap-3 text-slate-400">
            <div className="select-none text-right text-slate-600">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="overflow-x-auto text-slate-200 whitespace-pre">
              {lines.map((line, i) => (
                <div key={i} className="text-slate-300">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#03060f] text-[11px] text-emerald-400 leading-relaxed font-mono max-h-52 overflow-y-auto space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
            <Terminal className="h-3.5 w-3.5" />
            <span>Telemetry Response &bull; 200 OK</span>
          </div>
          <div className="p-2.5 rounded bg-black/80 border border-slate-800 text-slate-200 whitespace-pre-wrap">
            {project.codeSnippet.output}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── REALISTIC ANIMATED VISUAL HEADER WITH OPTIONAL CODE TOGGLE ──────────────
function ProjectVisualHeader({ project }: { project: ProjectItem }) {
  const [showCode, setShowCode] = useState(false);

  const renderBanner = () => {
    const title = project.title.toLowerCase();
    const cat = project.category.toLowerCase();

    if (title.includes("chicken") || title.includes("poultry")) {
      return <PoultryAnimatedBanner />;
    }
    if (title.includes("vcs") || title.includes("pms") || cat.includes("defense")) {
      return <DefenseAnimatedBanner />;
    }
    if (title.includes("food") || title.includes("beverage") || title.includes("sbl")) {
      return <BeverageAnimatedBanner />;
    }
    if (title.includes("cartel") || cat.includes("e-commerce")) {
      return <EcommerceAnimatedBanner />;
    }
    if (title.includes("catholica") || cat.includes("community")) {
      return <MatrimonyAnimatedBanner />;
    }
    if (title.includes("servo") || cat.includes("embedded")) {
      return <HardwareAnimatedBanner />;
    }
    return <DefenseAnimatedBanner />;
  };

  return (
    <div className="relative group/banner">
      {showCode ? <ProjectCodeTerminal project={project} /> : renderBanner()}

      {/* Code / Visual Mode Switcher */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowCode(!showCode);
        }}
        className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/85 hover:bg-slate-900 text-[10px] font-mono text-slate-200 border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-md"
      >
        {showCode ? (
          <>
            <Film className="h-3 w-3 text-emerald-400" />
            <span>Show Animation</span>
          </>
        ) : (
          <>
            <Code2 className="h-3 w-3 text-sky-400" />
            <span>View Code</span>
          </>
        )}
      </button>
    </div>
  );
}

export function ProjectsSection() {
  const { activeProjectWorld, setActiveProjectWorld } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const worldTabs = [
    { key: "poultry" as ProjectWorldKey, icon: "🐔", label: "Poultry Farm Hatchery" },
    { key: "defence" as ProjectWorldKey, icon: "🛡️", label: "ADA Defense Radar & Comms" },
    { key: "beverage" as ProjectWorldKey, icon: "🥤", label: "Beverage Bottling Line" },
    { key: "ecommerce" as ProjectWorldKey, icon: "🛍️", label: "E-Commerce Retail" },
    { key: "hardware" as ProjectWorldKey, icon: "⚙️", label: "Embedded Servo & Zigbee" },
  ];

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
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800 relative">
      <div className="flex flex-col items-center text-center mb-10">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-400 bg-sky-950/60">
          Scene 05 // Industry-Specific Realistic Animated Showcases
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Enterprise Systems &amp; Live Deliverables
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Realistic animated visuals, live telemetry dashboards, and interactive systems representing each domain.
        </p>

        {/* 3D World Transformation Switcher Bar */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Globe2 className="h-3.5 w-3.5" />
            Switch Active 3D Environment
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-3xl">
            {worldTabs.map((world) => (
              <button
                key={world.key}
                onClick={() => setActiveProjectWorld(world.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeProjectWorld === world.key
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 scale-105"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{world.icon}</span>
                <span>{world.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1 rounded-xl bg-slate-900/80 border border-slate-800 max-w-2xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-sky-500 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
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
            const pWorld = getProjectWorld(project);
            const isWorldActive = activeProjectWorld === pWorld;

            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                viewport={{ amount: 0.35 }}
                onViewportEnter={() => setActiveProjectWorld(pWorld)}
                className="h-full"
              >
                <Card
                  onClick={() => setActiveProjectWorld(pWorld)}
                  className={`h-full bg-[#0d1527] border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl cursor-pointer ${
                    isWorldActive
                      ? "ring-2 ring-sky-400 border-sky-400 shadow-sky-500/15"
                      : "border-slate-800 hover:border-sky-500/50"
                  }`}
                >
                  {/* Realistic Animated Visual Banner (with Code Switcher) */}
                  <ProjectVisualHeader project={project} />

                  {/* Body Content with High-Contrast Typography */}
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        {project.subtitle && (
                          <p className="text-xs font-medium text-sky-400 mt-1">
                            {project.subtitle}
                          </p>
                        )}
                      </div>
                      {isWorldActive && (
                        <Badge className="bg-sky-500 text-white text-[10px] font-mono shrink-0">
                          Active 3D World
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 flex-wrap gap-2">
                      <div className="text-indigo-400 font-semibold flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">Client:</span>
                        <span className="bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60 text-indigo-300">{project.client}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
                        <MapPin className="h-3 w-3 text-sky-400" />
                        <span>{project.locationType}</span>
                      </div>
                    </div>

                    <CardDescription className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 space-y-4">
                    {/* Architectural Highlights */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200 block flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-sky-400" />
                        Key Architectural Deliverables:
                      </span>
                      <ul className="space-y-1.5">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Environment Badges & 3D World Trigger */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.environment.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="font-mono text-[10px] bg-slate-800/80 text-slate-200 border border-slate-700/60"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProjectWorld(pWorld);
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                          isWorldActive
                            ? "bg-sky-500 text-white"
                            : "text-sky-400 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800/60"
                        }`}
                      >
                        <Eye className="h-3 w-3" />
                        <span>{isWorldActive ? "Viewing in 3D" : "Transform 3D"}</span>
                      </button>
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
