"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function BrowserShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Browser: starts smaller, scales up to fill — capped at 1.0 so it never overflows the viewport on laptops
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 1, 1]);
  const browserOpacity = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0.95]);
  const browserY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -1]);

  // Pill
  const tagOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.6], [0, 1, 1, 0]);
  const tagY = useTransform(scrollYProgress, [0, 0.08], [16, 0]);

  // Headline
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.18, 0.45, 0.6],
    [0, 1, 1, 0]
  );
  const headlineY = useTransform(scrollYProgress, [0.04, 0.18], [32, 0]);

  // Subhead
  const subOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.72, 0.95, 1],
    [0, 1, 1, 0.9]
  );
  const subY = useTransform(scrollYProgress, [0.55, 0.72], [24, 0]);

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full flex flex-col items-center justify-between pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-10 lg:pb-12">
          {/* TOP — pill + headline */}
          <div className="flex flex-col items-center text-center px-6 gap-3 sm:gap-5 z-20">
            <motion.span
              style={{ opacity: tagOpacity, y: tagY }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/85"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
              Recent Build · The Coach Consultant
            </motion.span>
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
            >
              Built <span className="gradient-text">like this.</span>
            </motion.h2>
          </div>

          {/* MIDDLE — browser frame with scrolling video */}
          <motion.div
            style={{
              scale,
              opacity: browserOpacity,
              y: browserY,
              rotateX: tilt,
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full flex items-center justify-center px-4 sm:px-8 z-10 h-[44vh] sm:h-[56vh] lg:h-[60vh] xl:h-[66vh] 2xl:h-[72vh]"
          >
            <div className="relative w-full h-full max-w-[1500px] flex items-center justify-center">
              <div
                className="relative w-full aspect-[1440/900] max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_120px_-20px_rgba(249,38,114,0.35)] bg-[#0a0a0a]"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 h-9 sm:h-11 px-3 sm:px-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-2 sm:mx-3 h-5 sm:h-6 rounded-md bg-white/5 border border-white/10 flex items-center px-3 text-[10px] sm:text-xs text-muted font-mono">
                    <span className="hidden sm:inline text-pink/70 mr-1">https://</span>
                    thecoachconsultant.uk
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 opacity-50">
                    <span className="w-3 h-3 rounded-sm border border-white/20" />
                    <span className="w-3 h-3 rounded-sm border border-white/20" />
                  </div>
                </div>

                {/* Video viewport */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="block w-full h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] object-cover bg-black"
                >
                  <source src="/videos/tcc-scroll-loop.webm" type="video/webm" />
                  <source src="/videos/tcc-scroll-loop.mp4" type="video/mp4" />
                </video>
              </div>
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
