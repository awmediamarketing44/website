"use client";

import { motion } from "motion/react";
import { projects } from "@/data/projects";

// Real clients, pulled straight from the Work page so the ticker stays in sync
// as new projects are added. (Logos can replace these names later.)
const logos = projects.map((p) => p.title);

export default function TrustTicker() {
  return (
    <section className="py-16 border-y border-card-border overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl font-bold mb-10"
      >
        Trusted by <span className="text-pink">400+</span>
      </motion.p>

      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-ticker">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center"
            >
              <span className="text-xl font-bold text-muted/40 whitespace-nowrap tracking-wide uppercase">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
