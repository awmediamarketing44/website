"use client";

import { motion } from "motion/react";

export default function SocialProof() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-card-border">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed"
        >
          Over 90% of our clients{" "}
          <span className="text-pink font-bold">
            are fitness professionals.
          </span>{" "}
          We know what works in your industry because we&apos;ve built hundreds
          of websites for coaches, PTs, and gym owners.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 text-xl font-bold"
        >
          We speak your language.
        </motion.p>
      </div>
    </section>
  );
}
