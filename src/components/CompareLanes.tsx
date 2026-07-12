"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

// Head-to-head comparison of the two delivery lanes. Rendered as a real
// semantic <table> that is ALWAYS in the DOM (both columns, no tab gating), so
// AI answer engines and search crawlers can extract the full side-by-side.
// This is the single most citable block on the homepage.
type Row = {
  feature: string;
  ai: string;
  bespoke: string;
};

const rows: Row[] = [
  {
    feature: "Turnaround",
    ai: "2 to 6 weeks",
    bespoke: "4 to 10 weeks",
  },
  {
    feature: "Design process",
    ai: "AI-led exploration, refined by our team",
    bespoke: "Strategy session first, then human-led design",
  },
  {
    feature: "Copywriting",
    ai: "AI-generated, edited by us",
    bespoke: "Human-led, AI assisting",
  },
  {
    feature: "Post-launch support",
    ai: "14 days",
    bespoke: "30 days",
  },
  {
    feature: "Custom vs templated",
    ai: "Custom-designed. Never templated.",
    bespoke: "Custom-designed. Never templated.",
  },
  {
    feature: "Website from",
    ai: "£1,495",
    bespoke: "£2,500",
  },
  {
    feature: "Best for",
    ai: "Businesses who need a site fast without dropping quality",
    bespoke: "Brands where strategy and depth matter more than speed",
  },
];

export default function CompareLanes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbAY = useTransform(scrollYProgress, [0, 1], [140, -120]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [-100, 140]);

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
          className="rounded-2xl border border-card-border bg-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                AW Media AI-Accelerated lane versus Bespoke lane: turnaround,
                design process, copywriting, support, and pricing compared.
              </caption>
              <thead>
                <tr className="border-b border-card-border">
                  <th
                    scope="col"
                    className="p-4 lg:p-5 text-xs font-bold uppercase tracking-widest text-muted"
                  >
                    <span className="sr-only">Feature</span>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:p-5 align-bottom"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-pink mb-1">
                      Lane 1
                    </span>
                    <span className="block text-lg lg:text-xl font-bold">
                      AI-Accelerated
                    </span>
                    <span className="block text-sm text-muted font-normal mt-1">
                      Speed-led. Same custom design, half the timeline.
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="p-4 lg:p-5 align-bottom border-l border-card-border"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-pink mb-1">
                      Lane 2
                    </span>
                    <span className="block text-lg lg:text-xl font-bold">
                      Bespoke
                    </span>
                    <span className="block text-sm text-muted font-normal mt-1">
                      Strategy-led. The full AW Media experience.
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-card-border last:border-0"
                  >
                    <th
                      scope="row"
                      className="p-4 lg:p-5 text-sm font-semibold text-white align-top whitespace-nowrap"
                    >
                      {row.feature}
                    </th>
                    <td className="p-4 lg:p-5 text-sm text-muted align-top">
                      {row.ai}
                    </td>
                    <td className="p-4 lg:p-5 text-sm text-muted align-top border-l border-card-border">
                      {row.bespoke}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-8">
          <Link
            href="/how-we-work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200"
          >
            See the full breakdown
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
