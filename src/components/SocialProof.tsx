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
        <p className="text-2xl sm:text-3xl lg:text-5xl font-medium leading-relaxed">
          {[
            { text: "Over 90% of our clients" },
            { text: "are fitness professionals.", className: "text-pink font-bold" },
            { text: "We know what works in your industry" },
            { text: "because we've built hundreds of websites" },
            { text: "for coaches, PTs, and gym owners." },
          ].map((line, i) => (
            <motion.span
              key={i}
              className={`block ${line.className || ""}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 text-2xl font-bold"
        >
          We speak your language.
        </motion.p>
      </motion.div>
    </section>
  );
}
