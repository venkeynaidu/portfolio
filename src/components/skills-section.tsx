"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Server, Bot, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend & Motion",
    icon: Code2,
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Turbopack"],
  },
  {
    title: "UI & Component Systems",
    icon: Palette,
    skills: ["shadcn/ui", "21st.dev Components", "Design Tokens", "Radix UI", "UI/UX Pro Max", "Lucide Icons"],
  },
  {
    title: "AI & Modern Tooling",
    icon: Bot,
    skills: ["AI Coding Agents", "Model Context Protocol (MCP)", "Prompt Engineering", "Git & CI/CD", "Vercel Deployments"],
  },
  {
    title: "Architecture & Backend",
    icon: Server,
    skills: ["Server Components", "API Routes", "PostgreSQL", "Edge Computing", "Web Vitals Optimization"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          Capabilities
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Technologies & Toolchain
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          The comprehensive tech stack and design intelligence systems driving this environment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Card className="h-full border-border/70 bg-card/60 hover:border-primary/40 transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-sm tracking-tight">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted/80 text-foreground/80 border border-border/40"
                      >
                        {skill}
                      </span>
                    ))}
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
