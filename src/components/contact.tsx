"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto border-t border-border/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 text-center">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-primary" />
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Let&apos;s Build Together</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to take your application to the next level?
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Have an idea, project, or role in mind? Feel free to reach out. Let&apos;s engineer something remarkable.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:hello@example.com"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full gap-2 px-6 shadow-md"
                )}
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full gap-2 px-6"
                )}
              >
                GitHub Profile
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
