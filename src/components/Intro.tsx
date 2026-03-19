"use client";

import { motion } from "motion/react";

const workCards = [
  { label: "Social media work (graphics, web, branding)" },
  { label: "Social media work (graphics, web, branding)" },
];

export default function Intro() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-pink">Award-winning</span> web design and
              digital services for fitness professionals and business owners who
              are <span className="underline decoration-pink underline-offset-4">done wasting time</span> on
              things that should just work.
            </h2>
          </motion.div>

          {/* Right cards */}
          <div className="space-y-4">
            {workCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-card-border bg-card p-6 h-48 flex items-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="relative z-20 text-sm text-muted">
                  {card.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
