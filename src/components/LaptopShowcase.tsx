"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function LaptopShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Laptop: starts small + low, scales up to dominate, lifts slightly into a settle
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.6, 1, 1.04]);
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.12, 0.92, 1], [0, 1, 1, 0.92]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -2]);

  // Pill: reveals first, settles in
  const tagOpacity = useTransform(scrollYProgress, [0, 0.08, 0.6, 0.75], [0, 1, 1, 0]);
  const tagY = useTransform(scrollYProgress, [0, 0.08], [16, 0]);

  // Headline: revealed alongside pill, hides as laptop dominates
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.18, 0.6, 0.75],
    [0, 1, 1, 0]
  );
  const headlineY = useTransform(scrollYProgress, [0.04, 0.18], [32, 0]);

  // Subhead: reveals as laptop settles
  const subOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.72, 0.92, 1],
    [0, 1, 1, 0.85]
  );
  const subY = useTransform(scrollYProgress, [0.55, 0.72], [32, 0]);

  // Subtle scroll-tied glow
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(60% 50% at 50% 60%, rgba(249,38,114,0.10), transparent 70%)",
      "radial-gradient(60% 50% at 50% 50%, rgba(168,85,247,0.14), transparent 65%)",
      "radial-gradient(60% 50% at 50% 40%, rgba(6,182,212,0.10), transparent 70%)",
    ]
  );

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border bg-black"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ background: bgGradient }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative h-full w-full flex flex-col items-center justify-between py-10 sm:py-14 lg:py-16">
          {/* TOP — pill + headline */}
          <div className="flex flex-col items-center text-center px-6 gap-3 sm:gap-5 z-20">
            <motion.span
              style={{ opacity: tagOpacity, y: tagY }}
              className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card/60 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
              Recent build · The Coach Consultant
            </motion.span>
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
            >
              Built <span className="gradient-text">like this.</span>
            </motion.h2>
          </div>

          {/* MIDDLE — laptop */}
          <motion.div
            style={{
              scale,
              opacity: laptopOpacity,
              y: laptopY,
              rotateX: tilt,
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full flex-1 flex items-center justify-center px-4 sm:px-8 z-10 min-h-0"
          >
            <div className="relative w-full max-w-[1400px] aspect-[2400/1340]">
              <Image
                src="/images/hero-laptop-tcc.webp"
                alt="A silver MacBook displaying The Coach Consultant — a recent AW Media build."
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* BOTTOM — subhead */}
          <motion.div
            style={{ opacity: subOpacity, y: subY }}
            className="z-20 px-6 text-center"
          >
            <p className="text-sm sm:text-base lg:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Real client work. AI-accelerated build, shipped in weeks not months.
              Same craft as a six-month bespoke.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
