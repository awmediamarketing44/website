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

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <span className="anim-fade-up inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
          {tag}
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] sm:leading-[1.05] lg:leading-none tracking-tight">
          {[title, ...(titleAccent ? [titleAccent] : [])].map((line, i) => (
            <span
              key={i}
              className={`anim-fade-up block text-balance ${i > 0 ? "gradient-text" : ""}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {line}
            </span>
          ))}
        </h1>

        {description && (
          <p
            className="anim-fade-up mt-6 max-w-2xl mx-auto text-lg text-muted leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
