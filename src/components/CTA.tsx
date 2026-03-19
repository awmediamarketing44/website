"use client";

import { motion } from "motion/react";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
        >
          Ready to stop losing clients to{" "}
          <span className="gradient-text">better websites?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto"
        >
          Book a free 15-minute call. No pressure, no jargon — just an honest
          conversation about what your fitness business needs to grow online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#"
            className="inline-block rounded-full bg-pink px-10 py-4 text-base font-semibold text-white hover:bg-pink-dark transition-colors duration-200"
          >
            Book a FREE Call
          </a>
        </motion.div>

        {/* Calendly placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-sm text-muted"
        >
          Calendly Here
        </motion.div>
      </div>
    </section>
  );
}
