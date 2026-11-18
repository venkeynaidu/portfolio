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
  Eye,
  Box,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { usePortfolio, CompanyOfficeKey } from "@/context/portfolio-context";

export function ExperienceTimeline() {
  const { activeCompanyOffice, setActiveCompanyOffice } = usePortfolio();

  const getCompanyKey = (companyName: string): CompanyOfficeKey => {
    if (companyName.includes("MicroGenesis")) return "microgenesis";
    if (companyName.includes("Tulasi")) return "tulasi";
    return "arowana";
  };

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-700 bg-sky-50">
          Scene 04 // Company-Specific 3D Offices
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Professional Work Experience
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          6 years architecting mission-critical defense command systems, agri-industrial supply chain ERPs, and high-performance web applications.
        </p>

        {/* 3D Office Environment Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-2xl pearl-glass max-w-2xl">
          {[
            { key: "microgenesis" as CompanyOfficeKey, label: "🛰️ MicroGenesis (Defense ADA Lab)" },
            { key: "tulasi" as CompanyOfficeKey, label: "🏭 Tulasi Technologies (ERP Operations Floor)" },
            { key: "arowana" as CompanyOfficeKey, label: "💻 Arowana (Collaborative Dev Studio)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCompanyOffice(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeCompanyOffice === tab.key
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative border-l-2 border-sky-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {portfolioData.experience.map((item, idx) => {
          const compKey = getCompanyKey(item.company);
          const isSelected = activeCompanyOffice === compKey;

          return (
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
                <span
                  className={`relative inline-flex h-3.5 w-3.5 rounded-full ${
                    isSelected ? "bg-sky-500 ring-4 ring-sky-200 scale-125" : "bg-indigo-400"
                  }`}
                >
                  {isSelected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  )}
                </span>
              </div>

              <Card
                onClick={() => setActiveCompanyOffice(compKey)}
                className={`pearl-glass transition-all duration-300 overflow-hidden shadow-sm cursor-pointer ${
                  isSelected
                    ? "border-sky-500 ring-2 ring-sky-300/40 shadow-lg"
                    : "hover:border-sky-400/40"
                }`}
              >
                <CardContent className="p-6 sm:p-8 space-y-5">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                          {item.role}
                        </h3>
                        {item.current && (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-mono font-semibold">
                            Present Active Role
                          </Badge>
                        )}
                        {item.noticePeriod && (
                          <Badge className="bg-amber-50 text-amber-800 border-amber-300 text-[11px] font-mono font-semibold flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.noticePeriod}
                          </Badge>
                        )}
                        {isSelected && (
                          <Badge className="bg-sky-100 text-sky-800 border-sky-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                            <Box className="h-3 w-3" />
                            Active 3D Office Environment
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mt-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Building className="h-4 w-4 shrink-0" />
                          <span>{item.company}</span>
                        </div>
                        <span className="text-slate-400 hidden sm:inline">&bull;</span>
                        <span className="text-slate-500 text-xs flex items-center gap-1 font-normal">
                          <MapPin className="h-3 w-3" />
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
                        <span className="text-[11px] text-slate-500 font-mono pr-2">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Client / Organization Scope */}
                  {item.client && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50/90 border border-sky-200 text-xs text-sky-900 flex-wrap">
                      <span className="font-bold text-sky-700">Client / Industry:</span>
                      <span className="font-medium">{item.client}</span>
                    </div>
                  )}

                  {/* Projects Pill Tags */}
                  {item.projects && item.projects.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <FolderGit2 className="h-3.5 w-3.5 text-indigo-600" />
                        Projects:
                      </span>
                      {item.projects.map((proj) => (
                        <span
                          key={proj}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50/90 text-indigo-700 border border-indigo-200"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Top Skills Tag Row */}
                  {item.topSkills && item.topSkills.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap bg-slate-50/90 p-3 rounded-xl border border-slate-200/70">
                      <span className="text-xs font-bold text-sky-800 flex items-center gap-1 shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                        Top 5 key skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.topSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Authentic Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Core Technical Deliverables */}
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

                  {/* Environment Badges & Switcher Pill */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
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

                    <button
                      onClick={() => setActiveCompanyOffice(compKey)}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                        isSelected
                          ? "bg-sky-500 text-white"
                          : "text-sky-600 bg-sky-50 hover:bg-sky-100"
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>{isSelected ? "View in 3D" : "Load 3D Office"}</span>
                    </button>
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
