"use client";

import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-slate-200/80 bg-slate-50/80 backdrop-blur-md text-xs text-slate-600 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-violet-500 text-white font-mono text-xs shadow-sm">
            GV
          </div>
          <div>
            <div className="font-bold text-slate-900">
              {portfolioData.personal.name}
            </div>
            <div className="text-[11px] text-slate-500">
              Full Stack Digital Twin &bull; Python &bull; React &bull; Kafka &bull; Kubernetes
            </div>
          </div>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <p className="font-medium text-slate-700">
            &copy; 2026 {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Engineered with Next.js 16, Three.js, React Three Fiber, Framer Motion &amp; Tailwind CSS.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:border-sky-400/50 hover:bg-sky-50 text-slate-600 hover:text-sky-600 transition-colors shadow-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
