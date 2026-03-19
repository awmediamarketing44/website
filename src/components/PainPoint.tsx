"use client";

import { motion } from "motion/react";

export default function PainPoint() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed text-muted"
        >
          You&apos;ve got a{" "}
          <span className="text-white font-bold">business to run</span>,
          clients to serve, and content to create.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-lg sm:text-xl leading-relaxed text-muted"
        >
          The last thing you need is a website that&apos;s costing you{" "}
          <span className="text-white font-semibold">opportunities</span>{" "}
          whilst you&apos;re stuck in Canva for six hours creating graphics
          you&apos;ll delete anyway.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#cta"
            className="inline-block rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:bg-pink-dark transition-colors duration-200"
          >
            Let&apos;s Fix That
          </a>
        </motion.div>
      </div>
    </section>
  );
}
