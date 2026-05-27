"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { projects } from "@/data/projects";

// Featured homepage projects — picked for visual variety + category mix
const FEATURED_SLUGS = [
  "team-procoach",
  "thecoachconsultant",
  "drug-free-bodybuilding",
  "jic",
  "nick-firth-tiles",
];

const work = FEATURED_SLUGS.map((slug) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Featured project not found: ${slug}`);
  return {
    slug: p.slug,
    title: p.title,
    category: `${p.client.industry}${p.client.location ? ` · ${p.client.location}` : ""}`,
    tags: p.tags.slice(0, 3),
    hero: p.heroImage,
    domain: (p.client.website || "")
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, ""),
  };
});

export default function Work() {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <section className="relative border-t border-card-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-pink mb-3">
              Recent work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="block">From idea to live.</span>
              <span className="block gradient-text">Sites that ship.</span>
            </h2>
          </div>

          <ul className="space-y-5">
            {work.map((item, i) => (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link href={`/work/${item.slug}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={item.hero}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 800px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-pink text-white text-[9px] font-bold uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold mb-1">
                          {item.category}
                        </p>
                        <h3 className="text-2xl font-black text-white leading-tight">
                          {item.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold uppercase tracking-widest text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-pink"
          >
            See all projects <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  return <DesktopWork />;
}

function DesktopWork() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(work.length - 1) * 100}%`]
  );

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border"
      style={{ height: `${work.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-20 pb-3 lg:pt-24 lg:pb-4 relative z-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-3">
                Recent work
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block">From idea to live.</span>
                <span className="block gradient-text">Sites that ship.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200 whitespace-nowrap"
            >
              See all projects
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 relative overflow-hidden min-h-0">
          <motion.div style={{ x }} className="flex h-full">
            {work.map((item, i) => (
              <div
                key={item.slug}
                className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 pb-12"
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="relative w-full max-w-6xl aspect-[3/2] max-h-[78vh] group"
                >
                  {/* Browser frame */}
                  <div className="relative h-full rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl p-3 sm:p-4 lg:p-5 shadow-[0_30px_120px_-20px_rgba(249,38,114,0.4)] flex flex-col">
                    {/* Chrome */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-pink/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60" />
                      <div className="flex-1 mx-3 h-7 rounded-full bg-white/5 border border-white/10 text-[11px] text-muted flex items-center px-4 font-mono">
                        {item.domain || `${item.slug}.com`}
                      </div>
                    </div>

                    {/* Viewport — real screenshot + overlay */}
                    <div className="flex-1 rounded-xl overflow-hidden relative border border-white/5 bg-card">
                      <Image
                        src={item.hero}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 1200px, 90vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Project info overlay */}
                      <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/70 font-bold mb-2">
                            {item.category}
                          </p>
                          <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Counter pill */}
                    <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-pink text-white text-[10px] font-bold uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs uppercase tracking-widest text-muted/60">
          <span>Scroll</span>
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
    </section>
  );
}
