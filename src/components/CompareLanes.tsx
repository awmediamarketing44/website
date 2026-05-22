"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";

type Lane = "ai" | "bespoke";

const laneData: Record<
  Lane,
  {
    badge: string;
    title: string;
    tagline: string;
    bullets: string[];
    best: string;
  }
> = {
  ai: {
    badge: "Lane 1 · AI-Accelerated",
    title: "Speed-led. AI-accelerated.",
    tagline:
      "Same custom design. Half the timeline. AI handles production, we handle the craft.",
    bullets: [
      "1 to 3 weeks turnaround",
      "AI-led design exploration, refined by our team",
      "AI-generated copy, lightly edited",
      "1 round of revisions",
      "14 days post-launch support",
      "Custom-designed. Never templated.",
    ],
    best: "Best for businesses who need a site fast without sacrificing quality.",
  },
  bespoke: {
    badge: "Lane 2 · Bespoke",
    title: "Strategy-led. Fully custom.",
    tagline:
      "The full AW Media experience. Strategy session, human-led design, more rounds, deeper craft.",
    bullets: [
      "4 to 6 weeks turnaround",
      "Strategy session before design starts",
      "Human-led design, AI assisting",
      "2 to 3 rounds of revisions",
      "30 days post-launch support",
      "Custom-designed. Never templated.",
    ],
    best: "Best for brands where strategy and depth matter more than speed.",
  },
};

export default function CompareLanes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbAY = useTransform(scrollYProgress, [0, 1], [140, -120]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [-100, 140]);

  const [lane, setLane] = useState<Lane>("ai");
  const data = laneData[lane];

  return (
    <section
      ref={sectionRef}
      className="py-14 lg:py-32 border-t border-card-border relative overflow-hidden"
    >
      <motion.div
        style={{ y: orbAY }}
        className="absolute top-0 -left-40 w-[420px] h-[420px] bg-pink/[0.05] rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        style={{ y: orbBY }}
        className="absolute bottom-0 -right-40 w-[340px] h-[340px] bg-purple-500/[0.05] rounded-full blur-[110px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
            Two lanes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="block">Pick your speed.</span>
            <span className="block gradient-text">Pick your depth.</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Both lanes are fully custom. Neither is templated. The only thing
            that changes is process and time investment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-grid grid-cols-2 p-1.5 rounded-full border border-card-border bg-card mb-10 relative"
        >
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-pink"
            initial={false}
            animate={{ left: lane === "ai" ? "6px" : "calc(50% + 0px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <button
            type="button"
            onClick={() => setLane("ai")}
            className={`relative z-10 min-w-[160px] sm:min-w-[180px] py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
              lane === "ai" ? "text-white" : "text-muted hover:text-white"
            }`}
          >
            AI-Accelerated
          </button>
          <button
            type="button"
            onClick={() => setLane("bespoke")}
            className={`relative z-10 min-w-[160px] sm:min-w-[180px] py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
              lane === "bespoke" ? "text-white" : "text-muted hover:text-white"
            }`}
          >
            Bespoke
          </button>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={lane}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl border border-card-border bg-card p-8 lg:p-12 overflow-hidden"
            >
              <motion.div
                key={`accent-${lane}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink via-pink/50 to-transparent origin-left"
              />

              <span className="inline-block rounded-full bg-pink/10 border border-pink/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-pink mb-5">
                {data.badge}
              </span>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {data.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted leading-relaxed mb-8">
                    {data.tagline}
                  </p>

                  <div className="rounded-xl border border-pink/20 bg-pink/[0.03] p-5 mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink/70 mb-1">
                      Best for
                    </p>
                    <p className="text-sm text-white leading-relaxed">
                      {data.best}
                    </p>
                  </div>

                  <Link
                    href="/how-we-work"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200"
                  >
                    See the full breakdown
                    <span>→</span>
                  </Link>
                </div>

                <ul className="space-y-3">
                  {data.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink/10 border border-pink/30 flex items-center justify-center mt-0.5">
                        <span className="block w-1.5 h-1.5 rounded-full bg-pink" />
                      </span>
                      <span className="leading-relaxed pt-0.5">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
