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
  ExternalLink,
  Clock,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.88a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45Z" />
    </svg>
  );
}

function NaukriIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#0066cc" />
      <path
        d="M8 8v8h2.2v-4.6l3.4 4.6H16V8h-2.2v4.6L10.4 8H8z"
        fill="#ffffff"
      />
    </svg>
  );
}

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
          Chapter 06 · Let&apos;s Build Together
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Connect &amp; Collaborate
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl">
          Interested in full-stack architecture, high-throughput microservices, or consulting? Reach out directly via LinkedIn, Naukri, or direct transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Details & Profile Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Official Profiles GUI Card */}
          <Card className="pearl-glass p-6 sm:p-7 space-y-4 border-sky-200 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <h3 className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-sky-600" />
                Verified Online Profiles
              </h3>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-mono flex items-center gap-1 font-semibold">
                <UserCheck className="h-3 w-3" />
                Verified
              </Badge>
            </div>

            {/* LinkedIn Profile Tile */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/80 to-blue-50/60 border border-sky-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0077b5] text-white shadow-sm">
                    <LinkedinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      LinkedIn Profile
                    </span>
                    <span className="text-[11px] text-sky-700 font-mono">
                      venkatesh-garaga-89a561199
                    </span>
                  </div>
                </div>
                <a
                  href={portfolioData.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "h-7 px-3 rounded-lg text-xs gap-1 bg-[#0077b5] hover:bg-[#006097] text-white font-semibold"
                  )}
                >
                  <span>Connect</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                &ldquo;{portfolioData.personal.linkedinNote}&rdquo;
              </p>
            </div>

            {/* Naukri Profile Tile */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/80 to-blue-50/60 border border-indigo-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0066cc] text-white shadow-sm">
                    <NaukriIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Naukri Recruiter Profile
                    </span>
                    <span className="text-[11px] text-indigo-700 font-semibold">
                      {portfolioData.personal.naukriProfile}
                    </span>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {portfolioData.personal.noticePeriod}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-600">
                  Searchable by verified recruiters across India
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </Card>

          {/* Direct Contact Communication Card */}
          <Card className="pearl-glass p-6 sm:p-7 space-y-4 shadow-sm">
            <h3 className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-sky-600" />
              Direct Contact
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors font-mono"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${portfolioData.personal.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors font-mono"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">
                    Current Location &amp; Base
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {portfolioData.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Resume Card */}
          <Card className="pearl-glass p-6 sm:p-7 border-sky-300 bg-gradient-to-br from-white via-sky-50/40 to-orange-50/40 text-center space-y-4 shadow-md">
            <div className="flex justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-orange-400 text-white shadow-lg shadow-sky-500/20">
                <Download className="h-5 w-5" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base text-slate-900">
                Official Curriculum Vitae
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Verified career documentation with complete ADA, ERP, and project architectural deliverables.
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
          <Card className="pearl-glass p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Have an engineering opportunity, open senior full-stack role, or architectural consulting query? Send a message below.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-lg">
                  Transmission Received
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been routed to Garaga Venkatesh. You will receive a response shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Stack Engineering Role / Project Inquiry"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details about the role, technical scope, or enterprise system..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm py-5 shadow-md shadow-sky-500/20"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                      Routing Transmission...
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
