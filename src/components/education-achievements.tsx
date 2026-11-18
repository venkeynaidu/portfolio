"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Trophy, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function EducationAchievements() {
  return (
    <section id="achievements" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-indigo-400/40 text-indigo-700 bg-indigo-50">
          Recognition &amp; Credentials
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Education &amp; Key Milestones
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          Academic foundation in engineering and milestones achieved across high-stakes software environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 border border-sky-200">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
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
                <Card className="pearl-glass hover:border-sky-400/30 transition-all duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-base text-slate-900">
                        {edu.degree}
                      </h4>
                      <span className="flex items-center gap-1 font-mono text-xs text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 shrink-0 font-semibold">
                        <Calendar className="h-3 w-3" />
                        {edu.year}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-indigo-600">
                      {edu.institution}
                    </div>

                    {edu.details && (
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Trophy className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
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
                <Card className="pearl-glass hover:border-indigo-400/30 transition-all duration-300">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        {ach.title}
                      </h4>
                      <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] font-mono shrink-0 font-semibold">
                        {ach.metric}
                      </Badge>
                    </div>

                    <div className="text-xs text-sky-600 font-mono font-semibold">
                      {ach.organization}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
