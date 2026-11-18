"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  CheckCircle2,
  Sparkles,
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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-3 font-mono text-xs border-sky-400/40 text-sky-700 bg-sky-50">
          Scene 06 // Connect &amp; Collaborate
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Connect &amp; Collaborate
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          Interested in full-stack architecture, event-driven backends, or consulting? Reach out directly or transmit a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Details & Resume Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="pearl-glass p-6 sm:p-7 space-y-6">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-sky-600" />
              Direct Communication
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-600 shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase font-mono block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors font-mono"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase font-mono block">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${portfolioData.personal.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors font-mono"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase font-mono block">
                    Current Location
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {portfolioData.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Resume Card in Warm Peach / Pearl Glass */}
          <Card className="pearl-glass p-6 sm:p-7 border-sky-300 bg-gradient-to-br from-white via-sky-50/40 to-orange-50/40 text-center space-y-4 shadow-lg">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-orange-400 text-white shadow-lg shadow-sky-500/25">
                <Download className="h-6 w-6" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base text-slate-900">
                Official Curriculum Vitae
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Complete career documentation with verified experience, ADA credentials, and project outlines.
              </p>
            </div>

            <a
              href={portfolioData.personal.resumePdf}
              download="Garaga_Venkatesh_Resume.pdf"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full rounded-xl gap-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 hover:opacity-95 text-white shadow-md font-semibold"
              )}
            >
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </a>
          </Card>
        </div>

        {/* Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="pearl-glass p-6 sm:p-8">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Have an enterprise inquiry, open role, or technical consultation? Fill out the form below.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">
                  Message Transmitted Successfully
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out! I will review your inquiry and get back to you promptly at{" "}
                  <strong className="text-slate-900">{formState.email || "your email"}</strong>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-xs border-slate-300"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Name <span className="text-sky-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Email <span className="text-sky-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Subject <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Full-Stack Opportunity / Enterprise Consultation"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Your Message <span className="text-sky-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, team goals, or timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl gap-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 hover:opacity-95 text-white shadow-lg shadow-sky-500/20 font-semibold py-2.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting Message...
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
