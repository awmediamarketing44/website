"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import BookCallButton from "./BookCallButton";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // Mobile path: no scroll listeners, no fancy motion, plain HTML so the SSR
  // paint is the visible final paint. We get 80% of traffic from phones, the
  // hero MUST render instantly without waiting for JS to fade things in.
  if (!isDesktop) return <MobileHero />;

  return <DesktopHero ref={ref} />;
}

function MobileHero() {
  return (
    <section className="relative min-h-[calc(100svh-1px)] flex items-center justify-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-cinematic.webp"
        alt="AW Media UK web design studio"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
        <span className="inline-block rounded-full border border-pink/40 bg-pink/10 px-5 py-2 text-[10px] font-medium uppercase tracking-widest text-pink mb-6 backdrop-blur-md">
          UK Web Design Studio · Since 2016
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]">
          <span className="block">Designed properly.</span>
          <span className="block gradient-text">Built faster.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base text-white/85 leading-relaxed">
          An award-winning UK studio shipping bespoke websites at AI-accelerated
          speed. Two lanes. Both fully custom. Neither templated.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <BookCallButton>Book a FREE Call</BookCallButton>
          <MagneticButton href="/work" variant="secondary">
            View Recent Work
          </MagneticButton>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-widest text-white/55">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-pink" />
            450+ websites shipped
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-pink" />
            4x award winner
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-pink" />
            A decade in
          </span>
        </div>
      </div>
    </section>
  );
}

function DesktopHero({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fgScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic background video */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-cinematic.webp"
          className="w-full h-full object-cover select-none pointer-events-none"
        >
          <source src="/videos/hero-cinematic.webm" type="video/webm" />
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Tint + vignette for text contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      {/* Subtle ambient pulse */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-pink/10 rounded-full blur-[180px] z-0 pointer-events-none"
      />

      {/* Foreground content, centred */}
      <motion.div
        style={{ opacity: fgOpacity, scale: fgScale }}
        className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-32 lg:py-40 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            animate={{
              boxShadow: [
                "0 0 20px rgba(249,38,114,0)",
                "0 0 30px rgba(249,38,114,0.4)",
                "0 0 20px rgba(249,38,114,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block rounded-full border border-pink/40 bg-pink/10 px-5 py-2 text-xs font-medium uppercase tracking-widest text-pink backdrop-blur-md"
          >
            UK Web Design Studio · Since 2016
          </motion.span>
        </motion.div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] leading-[1.02] mx-auto">
          {"Designed properly.".split(" ").map((word, i) => (
            <span key={`a-${i}`} className="inline-block mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          {"Built faster.".split(" ").map((word, i) => (
            <span key={`b-${i}`} className="inline-block mr-[0.3em]">
              <motion.span
                className="inline-block gradient-text"
                initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed"
        >
          An award-winning UK studio shipping bespoke websites at AI-accelerated
          speed. Two lanes. Both fully custom. Neither templated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <BookCallButton>Book a FREE Call</BookCallButton>
          <MagneticButton href="/work" variant="secondary">
            View Recent Work
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-white/55"
        >
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-pink" />
            450+ websites shipped
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] sm:text-xs text-white/45 uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-12 w-6 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-pink"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
