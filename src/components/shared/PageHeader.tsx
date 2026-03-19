"use client";

import { motion } from "motion/react";

interface PageHeaderProps {
  tag: string;
  title: string;
  titleAccent?: string;
  description?: string;
}

export default function PageHeader({ tag, title, titleAccent, description }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6"
        >
          {tag}
        </motion.span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
          {[title, ...(titleAccent ? [titleAccent] : [])].map((line, i) => (
            <motion.span
              key={i}
              className={`block ${i > 0 ? "gradient-text" : ""}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg text-muted leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
