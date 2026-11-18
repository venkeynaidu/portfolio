"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { Moon, Sun, Download, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-3 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav className="w-full max-w-5xl flex items-center justify-between px-4 py-2 rounded-full border border-white/10 bg-background/70 backdrop-blur-xl shadow-2xl shadow-black/40">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight px-1 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white font-mono text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            GV
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-tight leading-tight">
              Garaga Venkatesh
            </span>
            <span className="text-[10px] text-muted-foreground font-mono leading-none">
              Full Stack Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Download Resume Link */}
          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:inline-flex h-8 rounded-full text-xs gap-1.5 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground"
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
          className="absolute top-14 inset-x-4 p-4 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={portfolioData.personal.resumePdf}
            download="Garaga_Venkatesh_Resume.pdf"
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-2 w-full justify-center rounded-xl gap-2 bg-indigo-600 hover:bg-indigo-500 text-white"
            )}
          >
            <Download className="h-4 w-4" />
            Download Resume (PDF)
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
