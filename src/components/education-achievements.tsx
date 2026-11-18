"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Trophy, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function EducationAchievements() {
  return (
    <section id="achievements" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/80 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/40 text-cyan-400 bg-cyan-950/40">
          Recognition &amp; Credentials
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Education &amp; Key Milestones
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          Academic foundation in engineering and milestones achieved across high-stakes software environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Academic Qualifications
            </h3>
          </div>

          <div className="space-y-4">
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <Card className="pearl-glass hover:border-cyan-400/50 transition-all duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-base text-white">
                        {edu.degree}
                      </h4>
                      <span className="flex items-center gap-1 font-mono text-xs text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/40 shrink-0 font-semibold">
                        <Calendar className="h-3 w-3" />
                        {edu.year}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-indigo-400">
                      {edu.institution}
                    </div>

                    {edu.details && (
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {edu.details}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Career Achievements Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-500/30">
              <Trophy className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Career Milestones
            </h3>
          </div>

          <div className="space-y-4">
            {portfolioData.achievements.map((ach, idx) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <Card className="pearl-glass hover:border-indigo-400/50 transition-all duration-300">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-white">
                        {ach.title}
                      </h4>
                      <Badge className="bg-indigo-950/80 text-indigo-300 border-indigo-500/40 text-[10px] font-mono shrink-0 font-semibold">
                        {ach.metric}
                      </Badge>
                    </div>

                    <div className="text-xs font-semibold text-cyan-400">
                      {ach.organization}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {ach.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
