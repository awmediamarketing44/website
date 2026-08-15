"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { projects } from "@/data/projects";

const FEATURED_SLUGS = [
  "calibre-coaching",
  "physique-method",
  "titanom",
  "team-procoach",
  "newgen-coaching",
  "spotlight-dance",
  "drug-free-bodybuilding",
  "jic",
  "nick-firth-tiles",
  "dan-reeve",
];

const work = FEATURED_SLUGS.map((slug) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Featured project not found: ${slug}`);
  return {
    slug: p.slug,
    title: p.title,
    category: p.client.industry,
    location: p.client.location,
    tags: p.tags.slice(0, 2),
    hero: p.heroImage,
  };
});

const N = work.length;

export default function Work() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIdx = Math.max(0, N - perPage);
  const clampedIdx = Math.min(index, maxIdx);

  // Auto-advance, slide 1 at a time, pause on hover/focus
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i >= maxIdx ? 0 : i + 1));
    }, 4500);
    return () => clearInterval(t);
  }, [maxIdx, paused]);

  const goPrev = () => setIndex((i) => (i <= 0 ? maxIdx : i - 1));
  const goNext = () => setIndex((i) => (i >= maxIdx ? 0 : i + 1));

  const trackWidthPct = (N / perPage) * 100;
  const cardWidthPct = 100 / N;
  const translatePct = -(100 / N) * clampedIdx;

  return (
    <section className="relative border-t border-card-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-3">
              Recent work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block">From idea to live.</span>
              <span className="block gradient-text">Sites that ship.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/work"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200 mr-2"
            >
              See all <span>→</span>
            </Link>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous projects"
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-pink/20 hover:border-pink/40 flex items-center justify-center text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next projects"
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-pink/20 hover:border-pink/40 flex items-center justify-center text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            style={{ width: `${trackWidthPct}%` }}
            animate={{ x: `${translatePct}%` }}
            transition={{ type: "spring", stiffness: 110, damping: 22 }}
          >
            {work.map((item) => (
              <div
                key={item.slug}
                className="flex-shrink-0 px-2.5"
                style={{ width: `${cardWidthPct}%` }}
              >
                <Link href={`/work/${item.slug}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card aspect-[4/3] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                    <Image
                      src={item.hero}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                      Live
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-[10px] uppercase tracking-widest text-pink/80 font-bold mb-1.5">
                      {item.category}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-bold leading-tight group-hover:text-pink transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-widest text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === clampedIdx ? "w-10 bg-pink" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Mobile "see all" */}
        <div className="mt-8 flex sm:hidden justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink"
          >
            See all projects <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
