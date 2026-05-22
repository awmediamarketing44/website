"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import BookCallButton from "./BookCallButton";
import { SplitText } from "./TextReveal";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-pink/20 rounded-full blur-[120px]"
          />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-pink/10 rounded-full blur-[80px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[80px]"
        />

        {/* Floating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-pink/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-pink/3 rounded-full"
        />
      </div>

      {/* Floating code/AI elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {["</>", "AI", "{}", "01", "//", "ML", "⚡", "λ"].map((text, i) => (
          <motion.span
            key={i}
            className="absolute text-pink/10 font-mono text-sm font-bold select-none"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40 - i * 10, 0],
              x: [0, 15 + i * 5, -10, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.span
            animate={{
              boxShadow: [
                "0 0 20px rgba(249,38,114,0)",
                "0 0 20px rgba(249,38,114,0.3)",
                "0 0 20px rgba(249,38,114,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block rounded-full border border-pink/30 bg-pink/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-pink"
          >
            AI-Accelerated · UK-Wide
          </motion.span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl leading-[1.1] sm:leading-tight lg:leading-none">
          <span className="block">
            {"Built with AI.".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block">
            {"Designed by humans.".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em]">
                <motion.span
                  className="inline-block gradient-text"
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-muted leading-relaxed"
        >
          Two ways to build a great website. AI-accelerated when speed matters.
          <br />
          Fully bespoke when the project demands it. We don&apos;t do templates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <BookCallButton>
            Book a FREE Call
          </BookCallButton>
          <MagneticButton href="#work" variant="secondary">
            View Recent Work
          </MagneticButton>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-24"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted/50 uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-6 rounded-full border-2 border-muted/20 flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-1 rounded-full bg-pink"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
