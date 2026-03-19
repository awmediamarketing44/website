"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-pink"
        >
          Web Design for Fitness Professionals
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Your website isn&apos;t{" "}
          <span className="gradient-text">performing.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed"
        >
          You know it. Your conversion rate knows it.
          <br />
          Let&apos;s build something that actually works for your fitness
          business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:bg-pink-dark transition-colors duration-200"
          >
            Book a FREE Call
          </a>
          <a
            href="#work"
            className="rounded-full border border-card-border px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors duration-200"
          >
            View Recent Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-10 w-6 rounded-full border-2 border-muted/30 flex items-start justify-center pt-2"
          >
            <div className="h-2 w-1 rounded-full bg-pink" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
