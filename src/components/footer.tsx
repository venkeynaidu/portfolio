"use client";

import { ArrowUp, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

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
              Senior Full Stack Engineer &bull; Python &bull; React &bull; Kafka &bull; Kubernetes &bull; {portfolioData.personal.noticePeriod}
            </div>
          </div>
        </div>

        {/* Social / Profiles */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <a
            href={portfolioData.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#0077b5] transition-colors"
          >
            <LinkedinIcon className="h-4 w-4 fill-current" />
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-600">
            Naukri: <strong className="text-slate-800">{portfolioData.personal.naukriProfile}</strong>
          </span>
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
