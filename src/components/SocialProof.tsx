"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function SocialProof() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      id="about"
      className="py-24 lg:py-40 border-t border-card-border relative overflow-hidden"
    >
      {/* Floating percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white pointer-events-none select-none"
      >
        90%
      </motion.div>

      <motion.div
        style={{ scale, opacity }}
        className="mx-auto max-w-4xl px-6 text-center relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-2xl sm:text-3xl lg:text-5xl font-medium leading-relaxed"
        >
          Over 90% of our clients{" "}
          <motion.span
            className="text-pink font-bold inline-block"
            whileInView={{
              textShadow: [
                "0 0 0px rgba(249,38,114,0)",
                "0 0 30px rgba(249,38,114,0.5)",
                "0 0 0px rgba(249,38,114,0)",
              ],
            }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            are fitness professionals.
          </motion.span>{" "}
          We know what works in your industry because we&apos;ve built hundreds
          of websites for coaches, PTs, and gym owners.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
          className="mt-10 text-2xl font-bold"
        >
          We speak your language.
        </motion.p>
      </motion.div>
    </section>
  );
}
