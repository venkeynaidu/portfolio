"use client";

import { ArrowUp, Terminal, Heart } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-black/60 text-xs text-muted-foreground relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-xs">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {portfolioData.personal.name}
            </div>
            <div className="text-[11px] text-muted-foreground">
              Full Stack Developer &bull; Python &bull; React &bull; Kafka &bull; Kubernetes
            </div>
          </div>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <p>
            &copy; 2026 {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Engineered with Next.js 16, Three.js, React Three Fiber, Framer Motion &amp; Tailwind CSS.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:border-cyan-500/40 hover:bg-white/5 text-muted-foreground hover:text-cyan-400 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
