"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BookCallButton from "./BookCallButton";
import { CountUpText } from "./TextReveal";

export default function PainPoint() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 8]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "60%"]);

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      {/* Animated line decorations */}
      <motion.div
        style={{ width: lineWidth }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-pink/40 to-transparent"
      />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-xl sm:text-2xl lg:text-4xl font-medium leading-relaxed text-muted">
            You&apos;ve got a{" "}
            <span className="text-white font-bold">business to run</span>,
            clients to serve, and content to create.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="mt-10 text-lg sm:text-xl leading-relaxed text-muted">
            The last thing you need is a website that&apos;s costing you{" "}
            <motion.span
              className="relative inline-block text-white font-semibold"
              whileInView={{ color: ["#ffffff", "#F92672", "#ffffff"] }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
            >
              opportunities
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-pink"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </motion.span>{" "}
            whilst you&apos;re stuck in Canva for six hours creating graphics
            you&apos;ll delete anyway.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          className="mt-12"
        >
          <BookCallButton>Let&apos;s Fix That</BookCallButton>
        </motion.div>
      </div>
    </section>
  );
}
