"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const stats = [
  {
    value: 400,
    suffix: "+",
    label: "Websites shipped",
    description:
      "Across the UK. Coaches, clinics, trades, services, e-commerce. Each one custom-built.",
  },
  {
    value: 10,
    suffix: " years",
    label: "In business",
    description:
      "Founded in 2016. A full decade of shipping websites that actually convert.",
  },
  {
    value: 4,
    suffix: "x",
    label: "Award winner",
    description:
      "Back-to-back industry awards. Recognition for the craft, not the marketing.",
  },
  {
    value: 5,
    suffix: "-star",
    label: "Trustpilot rated",
    description:
      "Verified reviews from real clients. The kind of feedback that compounds.",
  },
];

function AnimatedStat({
  index,
  stepIndex,
  value,
  suffix,
  label,
  description,
}: {
  index: number;
  stepIndex: MotionValue<number>;
  value: number;
  suffix: string;
  label: string;
  description: string;
}) {
  const opacity = useTransform(
    stepIndex,
    [index - 0.5, index - 0.2, index + 0.2, index + 0.5],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    [0.8, 1, 1.15]
  );
  const blur = useTransform(
    stepIndex,
    [index - 0.4, index, index + 0.4],
    [12, 0, 12]
  );

  const displayValue = useTransform(stepIndex, (current) => {
    const distance = current - index;
    if (distance >= 0) return value;
    if (distance <= -0.6) return 0;
    const t = (distance + 0.6) / 0.6;
    return Math.floor(value * t);
  });

  const [display, setDisplay] = useState(() => displayValue.get());

  useEffect(() => {
    setDisplay(displayValue.get());
    return displayValue.on("change", (v) => setDisplay(v));
  }, [displayValue]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      <p className="text-[6rem] sm:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black gradient-text leading-none mb-6 tabular-nums">
        {display}
        <span className="text-pink">{suffix}</span>
      </p>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-widest mb-3">
        {label}
      </p>
      <p className="max-w-xl text-base lg:text-lg text-muted leading-relaxed">
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
  const width = useTransform(
    stepIndex,
    [index - 0.5, index, index + 0.5],
    ["8px", "32px", "8px"]
  );
  return (
    <motion.div style={{ opacity, width }} className="h-2 rounded-full bg-pink" />
  );
}

export default function Stats() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const stepIndex = useTransform(scrollYProgress, [0, 1], [0, 3]);

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "radial-gradient(circle at 30% 50%, rgba(249,38,114,0.18), transparent 60%)",
      "radial-gradient(circle at 70% 50%, rgba(168,85,247,0.2), transparent 60%)",
      "radial-gradient(circle at 30% 50%, rgba(6,182,212,0.18), transparent 60%)",
      "radial-gradient(circle at 70% 50%, rgba(249,38,114,0.2), transparent 60%)",
    ]
  );

  return (
    <section
      ref={wrapperRef}
      className="relative border-t border-card-border"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ background: bgGradient }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative w-full h-full">
          <div className="relative w-full h-full">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                index={i}
                stepIndex={stepIndex}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>

          <div className="absolute bottom-12 left-0 right-0 flex gap-3 justify-center items-center">
            {stats.map((stat, i) => (
              <ProgressDot key={stat.label} index={i} stepIndex={stepIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
