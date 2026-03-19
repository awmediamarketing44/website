"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, target, count, rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { number: 400, suffix: "+", label: "websites built for fitness professionals" },
  { number: 4, suffix: " times", label: "back to back award winners" },
  { number: 5, suffix: "-star", label: "rated on Trustpilot & Google" },
  { number: 0, suffix: "", label: "providing work from Sheffield", text: "Sheffield" },
];

export default function Stats() {
  return (
    <section className="py-24 lg:py-32 border-t border-card-border">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16"
        >
          Numbers that <span className="gradient-text">speak volumes</span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-card-border bg-card p-8"
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-pink mb-3">
                {stat.text ? (
                  stat.text
                ) : (
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
