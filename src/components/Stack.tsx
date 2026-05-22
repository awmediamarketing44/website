"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const stack = [
  {
    name: "Claude Code",
    role: "AI agent",
    description: "Code generation, content drafting, research at speed.",
  },
  {
    name: "Higgsfield",
    role: "Cinematic AI visuals",
    description: "Hero loops, product motion, generated imagery for every build.",
  },
  {
    name: "Next.js 16",
    role: "Framework",
    description: "Modern React framework. The same tech behind Vercel, Notion, and GitHub.",
  },
  {
    name: "Tailwind v4",
    role: "Styling",
    description: "Utility-first CSS. Fast to build with, faster to load.",
  },
  {
    name: "Motion",
    role: "Animations",
    description: "Production-grade animation engine. The reason this site feels alive.",
  },
  {
    name: "21st.dev Magic",
    role: "Components",
    description: "Premium component library curated for production sites.",
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -120]);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 border-t border-card-border relative overflow-hidden"
    >
      <motion.div
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(rgba(249,38,114,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,38,114,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
      />

      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/2 -right-40 w-[420px] h-[420px] bg-pink/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
            The stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="block">The tools that</span>
            <span className="block gradient-text">make us faster.</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Not vapour. Not gimmicks. These are the production tools we ship
            every project on. AI for speed. Modern frameworks for craft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {stack.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-card-border bg-card p-6 lg:p-8 transition-colors duration-300 hover:border-pink/30"
            >
              <motion.div
                className="absolute top-0 right-0 w-16 h-16 bg-pink/5"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
              />

              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink/60">
                  {tool.role}
                </span>
                <h3 className="mt-2 text-xl lg:text-2xl font-bold group-hover:text-pink transition-colors duration-300">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {tool.description}
                </p>

                <motion.div
                  className="mt-5 h-0.5 bg-gradient-to-r from-pink to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
