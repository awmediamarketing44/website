"use client";

import { motion } from "motion/react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function SplitText({ children, className = "", delay = 0, once = true }: TextRevealProps) {
  const words = children.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  delay: delay + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <span>{children}</span>
      <motion.span
        className="absolute inset-0 text-pink"
        variants={{
          hover: {
            x: [0, -2, 2, -1, 1, 0],
            opacity: [0, 1, 1, 1, 1, 0],
            transition: { duration: 0.3 },
          },
        }}
        aria-hidden
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function CountUpText({ children, className = "" }: { children: string; className?: string }) {
  const chars = children.split("");

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
