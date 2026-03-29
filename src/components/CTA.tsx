"use client";

import { motion } from "motion/react";
import BookCallButton from "./BookCallButton";
import { SplitText } from "./TextReveal";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-40 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-pink/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[60px]"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(249,38,114,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,38,114,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink/30 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[0.9] sm:leading-[0.85] lg:leading-[0.8]"
        >
          <SplitText>Ready to stop losing clients to</SplitText>
          <br />
          <SplitText delay={0.3} className="gradient-text">better websites?</SplitText>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-lg text-muted max-w-2xl mx-auto"
        >
          Book a free 15-minute call. No pressure, no jargon — just an honest
          conversation about what your fitness business needs to grow online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          className="mt-12"
        >
          <BookCallButton className="text-base px-12 py-4">
            Book a FREE Call
          </BookCallButton>
        </motion.div>
      </div>
    </section>
  );
}
