"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import scrollFrames from "@/data/scroll-frames.json";
import { motion, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export default function BrowserShowcase() {
  // 1024px breakpoint so iPads/tablets get the clean static layout, not the
  // scrollytelling collision the QA agent measured at 768px tablet width.
  const isDesktop = useIsDesktop(1024);

  // Lazy-load the video only when the section is near the viewport
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (!isDesktop || !sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVideoReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isDesktop]);

  // ---- Mobile path: the real site scrolls through the frame, no video ----
  // Desktop proves the work with a 3.7MB scroll-loop video, which a phone
  // should never be asked to carry. Instead a ~61KB full-page still travels
  // upward through the browser frame on a CSS scroll timeline. Same idea, no
  // video decode, no JS, and still lighter than the 98KB static screenshot it
  // replaced. See .aw-page-frame in motion.css.
  if (!isDesktop) {
    return (
      <section className="relative border-t border-card-border py-10">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 text-center">
          <span className="aw-rise-sm inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            Recent Build · Calibre Coaching
          </span>
          <h2 className="aw-rise-sm aw-late text-3xl font-black leading-[0.95] tracking-tight">
            Built <span className="gradient-text">like this.</span>
          </h2>

          <div className="aw-page-host aw-scale-in w-full max-w-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_12px_40px_-15px_rgba(249,38,114,0.4)]">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <div className="mx-2 flex h-3.5 flex-1 items-center rounded border border-white/10 bg-white/5 px-2 font-mono text-[9px] text-muted">
                calibre-coaching.com
              </div>
            </div>
            <div
              className="aw-page-frame aspect-[16/10] w-full bg-black"
              style={
                {
                  // How far the capture has to travel to show its full length.
                  // Read from the generated manifest rather than hard-coded,
                  // because it depends on the capture's aspect ratio: re-shoot
                  // the page at a different length and a fixed value would
                  // quietly stop short or scroll into blank space.
                  "--aw-page-travel": `${scrollFrames.calibre.travel}%`,
                } as CSSProperties
              }
            >
              <picture>
                <source srcSet="/images/scroll-frames/calibre.avif" type="image/avif" />
                <img
                  src="/images/scroll-frames/calibre.webp"
                  alt="Calibre Coaching, a recent AW Media build, scrolling through a browser frame."
                  width={scrollFrames.calibre.width}
                  height={scrollFrames.calibre.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          <p className="aw-rise-sm text-sm leading-relaxed text-muted">
            Real client work. AI-accelerated, shipped in weeks not months.
          </p>
        </div>
      </section>
    );
  }

  // ---- Desktop path: full pinned scrollytelling with the Calibre scroll loop ----
  return <DesktopBrowserShowcase wrapperRef={sectionRef} videoReady={videoReady} />;
}

function DesktopBrowserShowcase({
  wrapperRef,
  videoReady,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  videoReady: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 1, 1]);
  const browserOpacity = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0.95]);
  const browserY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -1]);

  const tagOpacity = useTransform(scrollYProgress, [0, 0.08, 0.32, 0.42], [0, 1, 1, 0]);
  const tagY = useTransform(scrollYProgress, [0, 0.08], [16, 0]);
  // Fade headline fully by 0.42 so it's gone before the browser frame finishes
  // scaling to ~96%, kills the visual "mockup sits on the title bar" bug.
  const headlineOpacity = useTransform(scrollYProgress, [0.04, 0.15, 0.32, 0.42], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.04, 0.15], [32, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.95, 1], [0, 1, 1, 0.9]);
  const subY = useTransform(scrollYProgress, [0.55, 0.72], [24, 0]);

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 pt-24 sm:pt-28 lg:pt-32 2xl:pt-36 pb-10 sm:pb-12 lg:pb-16">
          <div className="flex flex-col items-center text-center px-6 gap-3 sm:gap-5 z-20">
            <motion.span
              style={{ opacity: tagOpacity, y: tagY }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/85"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
              Recent Build · Calibre Coaching
            </motion.span>
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
            >
              Built <span className="gradient-text">like this.</span>
            </motion.h2>
          </div>

          <motion.div
            style={{
              scale,
              opacity: browserOpacity,
              y: browserY,
              rotateX: tilt,
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full flex items-center justify-center px-4 sm:px-8 z-10 h-[42vh] sm:h-[50vh] lg:h-[52vh] xl:h-[58vh] 2xl:h-[64vh]"
          >
            <div className="relative w-full h-full max-w-[1500px] flex items-center justify-center">
              <div className="relative w-full aspect-[1440/900] max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_120px_-20px_rgba(249,38,114,0.35)] bg-[#0a0a0a]">
                <div className="flex items-center gap-2 h-9 sm:h-11 px-3 sm:px-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-2 sm:mx-3 h-5 sm:h-6 rounded-md bg-white/5 border border-white/10 flex items-center px-3 text-[10px] sm:text-xs text-muted font-mono">
                    <span className="hidden sm:inline text-pink/70 mr-1">https://</span>
                    calibre-coaching.com
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 opacity-50">
                    <span className="w-3 h-3 rounded-sm border border-white/20" />
                    <span className="w-3 h-3 rounded-sm border border-white/20" />
                  </div>
                </div>
                {videoReady ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/calibre-hero.jpg"
                    className="block w-full h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] object-cover bg-black"
                  >
                    <source src="/videos/calibre-scroll-loop.webm" type="video/webm" />
                    <source src="/videos/calibre-scroll-loop.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src="/images/calibre-hero.jpg"
                    alt=""
                    className="block w-full h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] object-cover bg-black"
                  />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: subOpacity, y: subY }} className="z-20 px-6 text-center">
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
