"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

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
    label: "Exploration",
    title: "We move fast. With more options.",
    description:
      "Mood-boards, copy directions, layout concepts. Modern tooling lets us explore broadly in days, not weeks. More directions on the table means a sharper final result.",
  },
  {
    number: "03",
    label: "Refinement",
    title: "Designers take it from concept to great.",
    description:
      "Exploration outputs are the raw material. Our designers shape the work into something that reflects your brand, hits your audience, and actually converts. The craft never leaves the loop.",
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

function StepNumber({
  index,
  stepIndex,
  number,
}: {
  index: number;
  stepIndex: MotionValue<number>;
  number: string;
}) {
  const opacity = useTransform(
    stepIndex,
    [index - 0.7, index - 0.25, index + 0.25, index + 0.7],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    stepIndex,
    [index - 0.7, index, index + 0.7],
    [0.7, 1, 1.35]
  );
  return (
    <motion.span
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-start text-[8rem] sm:text-[12rem] lg:text-[16rem] xl:text-[18rem] font-black gradient-text leading-none select-none"
    >
      {number}
    </motion.span>
  );
}

function StepContent({
  index,
  stepIndex,
  label,
  title,
  description,
}: {
  index: number;
  stepIndex: MotionValue<number>;
  label: string;
  title: string;
  description: string;
}) {
  const opacity = useTransform(
    stepIndex,
    [index - 0.5, index - 0.2, index + 0.2, index + 0.5],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    [50, 0, -50]
  );
  const blur = useTransform(
    stepIndex,
    [index - 0.4, index, index + 0.4],
    [10, 0, 10]
  );
  return (
    <motion.div
      style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-pink mb-3">
        {label}
      </span>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
        {title}
      </h3>
      <p className="text-base lg:text-lg text-muted leading-relaxed max-w-lg">
        {description}
      </p>
    </motion.div>
  );
}

function ProgressDot({
  index,
  stepIndex,
}: {
  index: number;
  stepIndex: MotionValue<number>;
}) {
  const opacity = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    [0.25, 1, 0.25]
  );
  const scale = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    [1, 1.6, 1]
  );
  const width = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    ["8px", "32px", "8px"]
  );
  return (
    <motion.div
      style={{ opacity, scale, width }}
      className="h-2 rounded-full bg-pink"
    />
  );
}

export default function Process() {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <section className="relative border-t border-card-border py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-2xl"
          >
            <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-pink mb-3">
              How we work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="block">From brief to live site,</span>
              <span className="block gradient-text">in five clear steps.</span>
            </h2>
          </motion.div>

          <ol className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 sm:gap-6 items-start"
              >
                <span className="text-4xl sm:text-5xl font-black gradient-text leading-none tabular-nums shrink-0 min-w-[3rem]">
                  {step.number}
                </span>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-pink mb-2">
                    {step.label}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return <DesktopProcess />;
}

function DesktopProcess() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, 4]);

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "radial-gradient(circle at 25% 30%, rgba(249,38,114,0.18), transparent 60%)",
      "radial-gradient(circle at 75% 30%, rgba(168,85,247,0.2), transparent 60%)",
      "radial-gradient(circle at 25% 70%, rgba(6,182,212,0.18), transparent 60%)",
      "radial-gradient(circle at 75% 70%, rgba(249,38,114,0.2), transparent 60%)",
      "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.18), transparent 60%)",
    ]
  );

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-24">
        <motion.div
          style={{ background: bgGradient }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-4">
              How we work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block">From brief to live site,</span>
              <span className="block gradient-text">in five clear steps.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-[280px] sm:h-[360px] lg:h-[440px]">
              {steps.map((step, i) => (
                <StepNumber
                  key={step.number}
                  index={i}
                  stepIndex={stepIndex}
                  number={step.number}
                />
              ))}
            </div>

            <div className="relative h-[280px] sm:h-[320px] lg:h-[360px]">
              {steps.map((step, i) => (
                <StepContent
                  key={step.number}
                  index={i}
                  stepIndex={stepIndex}
                  label={step.label}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-3 justify-center items-center">
            {steps.map((step, i) => (
              <ProgressDot key={step.number} index={i} stepIndex={stepIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
