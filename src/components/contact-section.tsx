"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate interactive submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
          Get in Touch
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Connect &amp; Collaborate
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          Interested in full-stack architecture, event-driven backends, or consulting? Reach out directly or send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Details & Resume Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="glass-card p-6 sm:p-7 space-y-6">
            <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              Direct Communication
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase font-mono block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-sm font-medium text-foreground hover:text-cyan-400 transition-colors font-mono"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase font-mono block">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${portfolioData.personal.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-sm font-medium text-foreground hover:text-cyan-400 transition-colors font-mono"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase font-mono block">
                    Current Location
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {portfolioData.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Resume Card */}
          <Card className="glass-card p-6 sm:p-7 border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-cyan-950/20 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
                <Download className="h-6 w-6" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base text-foreground">
                Official Curriculum Vitae
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Complete career documentation with verified experience, ADA credentials, and project outlines.
              </p>
            </div>

            <a
              href={portfolioData.personal.resumePdf}
              download="Garaga_Venkatesh_Resume.pdf"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full rounded-xl gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md font-medium"
              )}
            >
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </a>
          </Card>
        </div>

        {/* Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="glass-card p-6 sm:p-8">
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Have an enterprise inquiry, open role, or technical consultation? Fill out the form below.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-emerald-300">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out! I will review your inquiry and get back to you promptly at{" "}
                  <strong className="text-white">{formState.email || "your email"}</strong>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-xs"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Full-Stack Opportunity / Enterprise Project"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team goals, or timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-500/25 font-medium py-2.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Transmit Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
