"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Download, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Intro", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Workstation", href: "#skills" },
    { label: "Timeline", href: "#experience" },
    { label: "Systems", href: "#projects" },
    { label: "Connect", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="w-full max-w-5xl flex items-center justify-between px-5 py-2.5 rounded-full pearl-glass">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight px-1 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-black font-mono text-xs font-bold shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            GV
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-tight text-white leading-tight">
              Garaga Venkatesh
            </span>
            <span className="text-[10px] text-cyan-400 font-mono leading-none">
              Full Stack Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={portfolioData.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/60 transition-colors shadow-2xs"
          >
            <LinkedinIcon className="h-4 w-4 fill-current" />
          </a>

          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex h-8 rounded-full text-xs gap-1.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:opacity-95 text-black shadow-md shadow-cyan-500/20 font-bold"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            Resume (PDF)
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 inset-x-4 p-4 rounded-2xl pearl-glass flex flex-col gap-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={portfolioData.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 text-cyan-400 flex items-center gap-2"
          >
            <LinkedinIcon className="h-4 w-4 fill-current" />
            <span>LinkedIn: venkatesh-garaga-89a561199</span>
          </a>
          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-2 w-full justify-center rounded-xl gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-bold"
            )}
          >
            <Download className="h-4 w-4" />
            Download Official CV
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
