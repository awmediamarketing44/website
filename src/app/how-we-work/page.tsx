"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import {
  packages,
  comparisonRows,
  type Lane,
  type PackageTier,
  type PackageVariant,
} from "@/data/packages";

const checkIcon = (
  <svg
    className="w-4 h-4 flex-shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const howWeWorkFaqs = [
  {
    question: "Is the AI version templated?",
    answer:
      "No. Every AW Media site is custom designed. AI helps us build it faster — it doesn't make it generic.",
  },
  {
    question: "Will my AI website look like everyone else's?",
    answer:
      "No. Your brand, your colours, your assets, your direction. AI just speeds up production — it doesn't decide what your site looks like.",
  },
  {
    question: "What's actually different between AI and Bespoke?",
    answer:
      "Process and depth. AI gets you a custom-designed site faster, with us doing less hands-on work — quicker turnaround, fewer revision rounds, no full strategy session. Bespoke gets you the deep dive, the strategy, more design exploration, more rounds. Both look great. One's optimised for speed and value, the other for depth.",
  },
  {
    question: "Can I upgrade from AI to Bespoke later?",
    answer:
      "Yes. If you start with an AI build and want to upgrade within 6 months, we credit your AI investment in full toward the bespoke version.",
  },
  {
    question: "What if I need something between AI and Bespoke?",
    answer:
      "Talk to us. We can mix elements where it makes sense — for example, a bespoke design with AI-generated copy, or an AI build with a custom strategy session bolted on.",
  },
  {
    question: "Do you do custom enterprise builds?",
    answer:
      "Yes — memberships, complex integrations, multi-language, anything beyond a standard store. Quoted separately on enquiry.",
  },
];

function VariantCard({
  tier,
  lane,
  variant,
  highlight,
}: {
  tier: PackageTier;
  lane: Lane;
  variant: PackageVariant;
  highlight?: boolean;
}) {
  const isAI = lane === "ai";
  const laneLabel = isAI ? "AI" : "Bespoke";
  const laneTagline = isAI
    ? "Speed-led. AI-accelerated."
    : "Strategy-led. Fully custom.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl border p-8 lg:p-10 flex flex-col h-full transition-all duration-300 ${
        highlight
          ? "border-pink/40 bg-gradient-to-b from-pink/[0.04] to-card hover:border-pink/60 hover:shadow-[0_0_60px_rgba(249,38,114,0.15)]"
          : "border-card-border bg-card hover:border-pink/20"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-8 rounded-full bg-pink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Most popular
        </span>
      )}

      <div className="flex items-baseline justify-between mb-2">
        <span
          className={`text-xs font-bold uppercase tracking-widest ${
            isAI ? "text-pink" : "text-white"
          }`}
        >
          {laneLabel} {tier.name}
        </span>
      </div>

      <p className="text-sm text-muted mb-6">{laneTagline}</p>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-4xl lg:text-5xl font-extrabold tracking-tight">
          {variant.turnaround}
        </span>
        <span className="text-xs text-muted uppercase tracking-widest">
          turnaround
        </span>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-8">
        {variant.tagline}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {variant.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-muted leading-relaxed"
          >
            <span className={isAI ? "text-pink" : "text-white"}>
              {checkIcon}
            </span>
            <span>{feature}</span>
          </li>
        ))}
        <li className="flex items-start gap-3 text-sm text-muted leading-relaxed">
          <span className={isAI ? "text-pink" : "text-white"}>{checkIcon}</span>
          <span>{variant.revisions}</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-muted leading-relaxed">
          <span className={isAI ? "text-pink" : "text-white"}>{checkIcon}</span>
          <span>{variant.support}</span>
        </li>
      </ul>

      <Link
        href={`/contact?lane=${lane}&package=${tier.slug}`}
        className={`mt-auto block rounded-full px-6 py-3 text-sm font-semibold text-center transition-all duration-300 ${
          highlight
            ? "bg-pink text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
            : "border border-card-border bg-background text-white hover:border-pink/50 hover:text-pink"
        }`}
      >
        Get a tailored quote
      </Link>
    </motion.div>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-card-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-base lg:text-lg font-semibold group-hover:text-pink transition-colors duration-200">
          {faq.question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-pink flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-sm lg:text-base text-muted leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HowWeWorkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="How We Work"
          title="AI-accelerated by default."
          titleAccent="Bespoke when it counts."
          description="We use AI to build faster, smarter websites — without losing the craft. When a project demands strategy and depth, we go full bespoke. Two lanes. Both fully custom. Neither templated."
        />

        {/* Two-lane explainer */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-pink/20 bg-gradient-to-br from-pink/[0.04] to-transparent p-8 lg:p-10"
              >
                <span className="inline-block rounded-full bg-pink/10 border border-pink/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-pink mb-5">
                  Lane 1 — AI
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Speed-led. AI-accelerated.
                </h3>
                <p className="text-muted leading-relaxed">
                  For coaches, consultants, and businesses who need a properly
                  designed website without the four-week timeline. AI handles
                  the heavy lifting. We handle the craft.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-card-border bg-card p-8 lg:p-10"
              >
                <span className="inline-block rounded-full bg-white/5 border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white mb-5">
                  Lane 2 — Bespoke
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Strategy-led. Fully custom.
                </h3>
                <p className="text-muted leading-relaxed">
                  For brands and businesses who want strategy, custom design,
                  and a website built around them — not their software. The
                  full AW Media experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tier deliverables */}
        <section className="py-12 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 max-w-3xl"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Three project types.{" "}
                <span className="gradient-text">Two lanes each.</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                Same custom design quality across the board. The only thing
                that changes is process and time investment.
              </p>
            </motion.div>

            <div className="space-y-20">
              {packages.map((tier, tierIndex) => (
                <div key={tier.slug}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-pink">
                      0{tierIndex + 1} — {tier.name}
                    </span>
                    <h3 className="mt-2 text-2xl lg:text-3xl font-bold">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-muted max-w-2xl">{tier.intro}</p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <VariantCard
                      tier={tier}
                      lane="ai"
                      variant={tier.ai}
                      highlight={tierIndex === 1}
                    />
                    <VariantCard
                      tier={tier}
                      lane="bespoke"
                      variant={tier.bespoke}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
                AI vs Bespoke
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                The differences,{" "}
                <span className="gradient-text">at a glance.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-card-border bg-card overflow-hidden"
            >
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-card-border bg-background/50">
                <div className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted">
                  What you get
                </div>
                <div className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-pink border-l border-card-border">
                  AI lane
                </div>
                <div className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-white border-l border-card-border">
                  Bespoke lane
                </div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.4fr_1fr_1fr] ${
                    i !== comparisonRows.length - 1
                      ? "border-b border-card-border"
                      : ""
                  }`}
                >
                  <div className="px-6 py-4 text-sm font-medium">
                    {row.label}
                  </div>
                  <div className="px-6 py-4 text-sm text-muted border-l border-card-border">
                    {row.ai}
                  </div>
                  <div className="px-6 py-4 text-sm text-muted border-l border-card-border">
                    {row.bespoke}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                The questions{" "}
                <span className="gradient-text">people actually ask.</span>
              </h2>
            </motion.div>

            <div>
              {howWeWorkFaqs.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-card-border relative overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink/10 rounded-full blur-[120px]"
          />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            >
              Not sure which lane?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-lg text-muted"
            >
              Tell us about the project. We&apos;ll tell you straight.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <BookCallButton>Book a FREE Call</BookCallButton>
              <Link
                href="/contact"
                className="text-sm text-muted hover:text-pink transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Or send a message →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
