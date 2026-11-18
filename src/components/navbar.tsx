"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Download, Menu, X, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Intro", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Workstation", href: "#skills" },
    { label: "Timeline", href: "#experience" },
    { label: "Exhibition", href: "#projects" },
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
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-violet-500 text-white font-mono text-xs shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            GV
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-tight text-slate-800 leading-tight">
              Garaga Venkatesh
            </span>
            <span className="text-[10px] text-sky-600 font-mono leading-none">
              Full Stack Digital Twin
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-slate-600 hover:text-sky-600 hover:bg-sky-50/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex h-8 rounded-full text-xs gap-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 hover:opacity-95 text-white shadow-sm font-semibold"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            Resume (PDF)
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600"
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
              className="px-3.5 py-2 text-sm font-semibold rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-600"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-2 w-full justify-center rounded-xl gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold"
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
