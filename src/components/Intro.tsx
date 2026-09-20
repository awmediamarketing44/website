"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import TiltCard from "./TiltCard";

/* Six cards, not four. Systems and AI were missing entirely, and Alex asked for
   the homepage listing to carry them (20 Sep 2026). Each card is now a link to
   its service page as well: they always looked clickable and never were. */
const workCards = [
  {
    tag: "Design",
    label: "Web Design & Development",
    blurb: "Custom sites built to bring enquiries in",
    href: "/services/web-design",
  },
  {
    tag: "Branding",
    label: "Logo & Brand Identity",
    blurb: "A brand that matches the work behind it",
    href: "/services/branding",
  },
  {
    tag: "Systems",
    label: "Bespoke Systems & Software",
    blurb: "CRMs, portals and booking systems",
    href: "/services/systems",
  },
  {
    tag: "AI",
    label: "AI for Your Business",
    blurb: "Set up round how you already work",
    href: "/services/ai-business-support",
  },
  {
    tag: "Social",
    label: "Social Media Graphics",
    blurb: "Your own design slot, every week",
    href: "/services/social-media",
  },
  {
    tag: "Marketing",
    label: "SEO & Monthly Support",
    blurb: "Get found, and stay looked after",
    href: "/services/seo-support",
  },
];

export default function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative py-14 lg:py-32 overflow-hidden">
      {/* Floating background accent */}
      <motion.div
        style={{ x }}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink/5 rounded-full blur-[100px]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left text - line by line animation */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-snug lg:leading-tight">
              {[
                { text: "Award-winning design,", className: "text-pink" },
                { text: "AI-accelerated where it counts," },
                { text: "bespoke where it matters." },
              ].map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${line.className || ""}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
            >
              Websites and brands, and the systems behind them. Client portals, booking diaries and CRMs built round
              how you already work, so the software bends instead of your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-5"
            >
              <Link href="/services" className="text-sm font-semibold text-pink hover:text-white transition-colors">
                All services &rarr;
              </Link>
              <Link
                href="/services/systems"
                className="text-sm font-semibold text-muted hover:text-white transition-colors"
              >
                What we build &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right cards - 2x3 grid with 3D tilt */}
          <div className="grid grid-cols-2 gap-4">
            {workCards.map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link href={card.href} className="block h-full">
                  <TiltCard className="h-full">
                    <div className="aw-sheen group relative overflow-hidden rounded-2xl border border-card-border bg-card p-4 sm:p-5 h-36 sm:h-40 flex flex-col justify-between transition-colors duration-300 hover:border-pink/30">
                      <span className="text-[11px] font-medium text-pink/70 uppercase tracking-wider">{card.tag}</span>
                      <div>
                        <p className="text-sm font-semibold leading-snug">{card.label}</p>
                        <p className="mt-1 text-xs leading-snug text-muted">{card.blurb}</p>
                        <motion.div
                          className="mt-2.5 h-0.5 bg-pink/30 group-hover:bg-pink transition-colors duration-300"
                          initial={{ width: 0 }}
                          whileInView={{ width: "40%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                        />
                      </div>
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}