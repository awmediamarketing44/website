"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    label: "Discovery",
    title: "We figure out exactly what you need.",
    description:
      "Brief form for AI-accelerated builds. Full strategy session for bespoke. Either way, we don't start designing until we've understood your business, your audience, and what success looks like.",
  },
  {
    number: "02",
    label: "AI Exploration",
    title: "We generate. You don't wait.",
    description:
      "Our team uses AI to rapidly explore mood-boards, copy directions, and layout concepts. What used to take a week of solo design work now takes a day, with more options on the table to choose from.",
  },
  {
    number: "03",
    label: "Human Refinement",
    title: "Designers take it from generated to great.",
    description:
      "AI outputs the raw material. Our designers shape it into something that reflects your brand, hits your audience, and actually converts. The craft never leaves the loop.",
  },
  {
    number: "04",
    label: "Build",
    title: "Engineered on a modern stack.",
    description:
      "Next.js, Tailwind, Motion. Production-grade code, sub-2-second load times, mobile-first, SEO-ready. The same stack the biggest brands in the world ship on.",
  },
  {
    number: "05",
    label: "Launch + Support",
    title: "We ship, then we stick around.",
    description:
      "Domain, hosting, analytics, search console, all wired up. 14 or 30 days of post-launch support depending on the lane. Then optional ongoing care if you want it.",
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 border-t border-card-border relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6">
            How we work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="block">From brief to live site,</span>
            <span className="block gradient-text">in five clear steps.</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Same process, two lanes. AI-accelerated when speed matters, fully
            bespoke when the project demands it.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[24px] sm:left-[34px] top-2 bottom-2 w-px bg-gradient-to-b from-pink/40 via-pink/15 to-transparent" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-16 sm:pl-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    type: "spring",
                  }}
                  className="absolute left-0 top-0 flex items-center justify-center w-[48px] sm:w-[68px] h-[48px] sm:h-[68px] rounded-full border border-pink/40 bg-background"
                >
                  <span className="text-sm sm:text-base font-bold text-pink">
                    {step.number}
                  </span>
                </motion.div>

                <div className="pt-3 sm:pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-pink/60">
                    {step.label}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-muted leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
