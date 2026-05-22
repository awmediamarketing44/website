"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import BookCallButton from "./BookCallButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const browserY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const browserRotate = useTransform(scrollYProgress, [0, 1], [3, 12]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Aurora gradient mesh background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-pink/25 rounded-full blur-[160px]"
          />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.3, 0.85, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[12%] w-[460px] h-[460px] bg-purple-500/20 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 60, -40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] left-[10%] w-[380px] h-[380px] bg-cyan-500/15 rounded-full blur-[110px]"
        />

        {/* Floating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-pink/[0.06] rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/[0.04] rounded-full"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main split layout */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div className="text-center lg:text-left">
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
                    "0 0 25px rgba(249,38,114,0.35)",
                    "0 0 20px rgba(249,38,114,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block rounded-full border border-pink/30 bg-pink/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-pink"
              >
                UK Web Design Studio · Since 2016
              </motion.span>
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] sm:leading-[1.05] lg:leading-[1.02]">
              <span className="block">
                {"Designed properly.".split(" ").map((word, i) => (
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
                {"Built faster.".split(" ").map((word, i) => (
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
              className="mx-auto lg:mx-0 mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
            >
              An award-winning UK studio shipping bespoke websites at AI-accelerated speed. Two lanes. Both fully custom. Neither templated.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <BookCallButton>Book a FREE Call</BookCallButton>
              <MagneticButton href="/work" variant="secondary">
                View Recent Work
              </MagneticButton>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-muted/60"
            >
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink" />
                400+ websites shipped
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink" />
                4x award winner
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink" />
                A decade in
              </span>
            </motion.div>
          </div>

          {/* RIGHT — glass browser showpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: browserY, rotate: browserRotate }}
            className="relative hidden lg:block"
          >
            {/* Glow halo */}
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-12 bg-gradient-to-br from-pink/30 via-purple-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl"
            />

            {/* Browser frame */}
            <div className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl p-5 shadow-[0_30px_120px_-20px_rgba(249,38,114,0.4)]">
              {/* Chrome */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-pink/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-3 h-7 rounded-full bg-white/5 border border-white/10 text-[11px] text-muted flex items-center px-4 font-mono">
                  awmedia.marketing
                </div>
                <span className="w-3 h-3 rounded-sm border border-white/20" />
              </div>

              {/* Browser viewport */}
              <div className="aspect-[16/11] rounded-xl overflow-hidden relative bg-background/60 border border-white/5">
                {/* Animated gradient mesh */}
                <motion.div
                  animate={{
                    background: [
                      "radial-gradient(circle at 15% 20%, rgba(249,38,114,0.5), transparent 50%), radial-gradient(circle at 85% 80%, rgba(168,85,247,0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.2), transparent 60%)",
                      "radial-gradient(circle at 85% 20%, rgba(249,38,114,0.5), transparent 50%), radial-gradient(circle at 15% 80%, rgba(168,85,247,0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.25), transparent 60%)",
                      "radial-gradient(circle at 15% 20%, rgba(249,38,114,0.5), transparent 50%), radial-gradient(circle at 85% 80%, rgba(168,85,247,0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.2), transparent 60%)",
                    ],
                  }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                />

                {/* Fake website content */}
                <div className="absolute inset-0 p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-2.5 w-16 rounded-full bg-white/40" />
                    <div className="flex gap-2">
                      <div className="h-2 w-8 rounded-full bg-white/15" />
                      <div className="h-2 w-8 rounded-full bg-white/15" />
                      <div className="h-2 w-8 rounded-full bg-white/15" />
                      <div className="h-2 w-10 rounded-full bg-pink/60" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <motion.div
                      animate={{ width: ["40%", "65%", "40%"] }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="h-3 rounded-full bg-white/50"
                    />
                    <motion.div
                      animate={{ width: ["55%", "75%", "55%"] }}
                      transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
                      className="h-3 rounded-full bg-pink/70 mt-2"
                    />
                    <div className="h-2 w-3/4 rounded-full bg-white/15 mt-4" />
                    <div className="h-2 w-2/3 rounded-full bg-white/15 mt-1.5" />

                    <div className="flex gap-2 mt-4">
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-8 px-4 rounded-full bg-pink flex items-center"
                      >
                        <span className="block h-1.5 w-12 rounded-full bg-white/70" />
                      </motion.div>
                      <div className="h-8 px-4 rounded-full border border-white/20 flex items-center">
                        <span className="block h-1.5 w-10 rounded-full bg-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Floating UI card */}
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-5 w-24 rounded-lg border border-white/15 bg-white/[0.06] backdrop-blur-md p-2"
                  >
                    <div className="h-1.5 w-12 rounded-full bg-pink mb-1.5" />
                    <div className="h-1 w-16 rounded-full bg-white/30" />
                    <div className="h-1 w-10 rounded-full bg-white/15 mt-1" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating accent shapes */}
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-10 w-20 h-20 rounded-2xl border border-pink/40 bg-gradient-to-br from-pink/20 to-purple-500/10 backdrop-blur-md shadow-lg"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-6 -right-8 w-24 h-24 rounded-full border border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-cyan-500/10 backdrop-blur-md shadow-lg"
            />
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-1/2 -right-6 w-12 h-12 rounded-xl border border-cyan-500/40 bg-cyan-500/10 backdrop-blur-md rotate-12"
            />
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
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
