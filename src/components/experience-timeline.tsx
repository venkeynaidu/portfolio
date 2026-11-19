"use client";

import Image from "next/image";
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
  Eye,
  Box,
  Activity,
  Layers,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { usePortfolio, CompanyOfficeKey } from "@/context/portfolio-context";
import { getCompanyOffice } from "@/lib/world-mapping";
import { cn } from "@/lib/utils";

// Company-specific office GIFs and vibrant branding
const companyOfficeVisuals: Record<
  CompanyOfficeKey,
  {
    gif: string;
    label: string;
    cardClass: string;
    badgeColor: string;
    titleColor: string;
    subheading: string;
  }
> = {
  microgenesis: {
    gif: "/office/command-center.gif",
    label: "🛰️ ADA Defense Command Lab",
    cardClass: "vibrant-card-cyan",
    badgeColor: "border-sky-300 bg-sky-100/90 text-sky-800",
    titleColor: "text-sky-700",
    subheading: "Aeronautical Development Agency // Secure Air-Gapped Network",
  },
  tulasi: {
    gif: "/office/office-desk-coding.gif",
    label: "🏭 Enterprise ERP & Logistics Hub",
    cardClass: "vibrant-card-emerald",
    badgeColor: "border-emerald-300 bg-emerald-100/90 text-emerald-800",
    titleColor: "text-emerald-700",
    subheading: "Godrej Foods, Central Poultry & SBL Enterprises // Supply Chain Operations",
  },
  arowana: {
    gif: "/office/team-collaboration.gif",
    label: "💻 Web Dev & E-Commerce Studio",
    cardClass: "vibrant-card-purple",
    badgeColor: "border-purple-300 bg-purple-100/90 text-purple-800",
    titleColor: "text-purple-700",
    subheading: "Full-Stack Development // E-Commerce & Matchmaking Platforms",
  },
};

export function ExperienceTimeline() {
  const { activeCompanyOffice, setActiveCompanyOffice } = usePortfolio();

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200/80 relative bg-transparent">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-300 text-sky-800 bg-sky-50 px-3.5 py-1">
          Scene 04 // Company Experience &amp; Tech Workspaces
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Professional Work Experience
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          6 years architecting mission-critical defense command systems, agri-industrial supply chain ERPs, and high-performance web applications.
        </p>

        {/* Office Environment Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-2xl">
          {[
            { key: "microgenesis" as CompanyOfficeKey, label: "🛰️ MicroGenesis (Defense ADA Lab)" },
            { key: "tulasi" as CompanyOfficeKey, label: "🏭 Tulasi Technologies (ERP Operations)" },
            { key: "arowana" as CompanyOfficeKey, label: "💻 Arowana (Dev Studio)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCompanyOffice(tab.key)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5",
                activeCompanyOffice === tab.key
                  ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md scale-105"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              )}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-l-2 border-sky-400 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-14">
        {portfolioData.experience.map((item, idx) => {
          const compKey = getCompanyOffice(item);
          const isSelected = activeCompanyOffice === compKey;
          const visual = companyOfficeVisuals[compKey] || companyOfficeVisuals.microgenesis;

          return (
            <motion.div
              key={item.company + item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 flex h-5 w-5 items-center justify-center">
                <span
                  className={cn(
                    "relative inline-flex h-3.5 w-3.5 rounded-full transition-all duration-300",
                    isSelected ? "bg-sky-600 ring-4 ring-sky-200 scale-125" : "bg-indigo-400"
                  )}
                >
                  {isSelected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  )}
                </span>
              </div>

              <motion.div
                viewport={{ amount: 0.3 }}
                onViewportEnter={() => setActiveCompanyOffice(compKey)}
              >
                <Card
                  onClick={() => setActiveCompanyOffice(compKey)}
                  className={cn(
                    "transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-white border",
                    isSelected ? "ring-2 ring-sky-500 border-sky-500" : "border-slate-200"
                  )}
                >
                  {/* Company Office GIF Banner */}
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black border-b border-slate-200">
                    <Image
                      src={visual.gif}
                      alt={visual.label}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Status Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-mono font-semibold border flex items-center gap-1.5 shadow-sm", visual.badgeColor)}>
                        <Activity className="h-3 w-3 animate-pulse" />
                        <span>{visual.label}</span>
                      </span>

                      {item.current && (
                        <Badge className="bg-emerald-600 text-white border-0 text-xs font-mono font-semibold shadow-sm">
                          Present Active Role
                        </Badge>
                      )}
                    </div>

                    {/* Bottom Title inside Banner */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        {item.role}
                      </div>
                      <div className="text-xs font-medium text-slate-200">
                        {item.company} &bull; {item.location}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 sm:p-8 space-y-5 bg-white">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <Building className="h-4 w-4 shrink-0 text-sky-600" />
                            <span className="text-slate-900 font-bold">{item.company}</span>
                          </div>
                          <span className="text-slate-400 hidden sm:inline">&bull;</span>
                          <span className="text-slate-600 text-xs flex items-center gap-1 font-normal">
                            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1 shrink-0 self-start sm:self-auto">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono font-medium">
                          <Calendar className="h-3.5 w-3.5 text-sky-600" />
                          <span>{item.period}</span>
                        </div>
                        {item.duration && (
                          <span className="text-xs text-slate-500 font-mono pr-2 font-medium">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Client / Organization Scope */}
                    {item.client && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex-wrap">
                        <span className="font-bold text-sky-700">Client / Industry:</span>
                        <span className="font-medium text-slate-800">{item.client}</span>
                      </div>
                    )}

                    {/* Projects Pill Tags */}
                    {item.projects && item.projects.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <FolderGit2 className="h-3.5 w-3.5 text-indigo-600" />
                          Projects:
                        </span>
                        {item.projects.map((proj) => (
                          <span
                            key={proj}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Top Skills Tag Row */}
                    {item.topSkills && item.topSkills.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-sky-700 flex items-center gap-1 shrink-0">
                          <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                          Top 5 key skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.topSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Authentic Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Core Technical Deliverables */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                        Core Technical Deliverables:
                      </span>
                      <ul className="space-y-2">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Environment Badges */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.environment.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="font-mono text-xs bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveCompanyOffice(compKey)}
                        className={cn(
                          "text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs",
                          isSelected
                            ? "bg-sky-600 text-white"
                            : "text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200"
                        )}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{isSelected ? "Active Workspace" : "Select Workspace"}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
