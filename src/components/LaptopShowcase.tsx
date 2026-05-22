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

  // Laptop transform
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.75, 1, 1.04]);
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0.95]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -2]);

  // Pill: reveals first
  const tagOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.6], [0, 1, 1, 0]);
  const tagY = useTransform(scrollYProgress, [0, 0.08], [16, 0]);

  // Headline: revealed alongside pill, fades before laptop dominates
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.18, 0.45, 0.6],
    [0, 1, 1, 0]
  );
  const headlineY = useTransform(scrollYProgress, [0.04, 0.18], [32, 0]);

  // Subhead: reveals as laptop settles, holds to end
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
        <div className="relative h-full w-full flex flex-col items-center pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 gap-6 sm:gap-8">
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

          {/* MIDDLE — laptop (explicit height, not flex-1 so subhead always has room) */}
          <motion.div
            style={{
              scale,
              opacity: laptopOpacity,
              y: laptopY,
              rotateX: tilt,
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full flex items-center justify-center px-4 sm:px-8 z-10 h-[45vh] sm:h-[55vh] lg:h-[60vh]"
          >
            {/* Aspect-locked wrapper so the screen polygon coords stay aligned with the image */}
            <div className="relative w-full h-full max-w-[1400px] flex items-center justify-center">
              <div className="relative w-full aspect-[2400/1340] max-h-full">
                <Image
                  src="/images/hero-laptop-tcc.webp"
                  alt="A silver MacBook displaying The Coach Consultant — a recent AW Media build."
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 1400px"
                  className="object-contain select-none pointer-events-none"
                />

                {/*
                  Screen overlay: TCC scrolling video, clipped to the laptop's
                  screen trapezoid. Bbox lives inside the 2400×1340 image at
                  (37.5%, 24%) → (80.5%, 67.5%). Polygon in local coords:
                    TL 0% 0%, TR 100% 9.2%, BR 88.4% 100%, BL 1.2% 95.4%.
                */}
                <div
                  aria-hidden
                  className="absolute overflow-hidden pointer-events-none"
                  style={{
                    left: "38%",
                    top: "27%",
                    width: "42%",
                    height: "40%",
                    clipPath:
                      "polygon(0% 0%, 100% 7.5%, 88% 100%, 0% 95%)",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/tcc-scroll-loop.webm" type="video/webm" />
                    <source src="/videos/tcc-scroll-loop.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM — subhead */}
          <motion.div
            style={{ opacity: subOpacity, y: subY }}
            className="z-20 px-6 text-center mt-auto"
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
