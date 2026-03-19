"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "./TextReveal";

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
    const controls = animate(count, target, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
    });
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
    <section className="py-24 lg:py-32 border-t border-card-border relative overflow-hidden">
      {/* Background floating elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-64 h-64 border border-pink/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-48 h-48 border border-white/5 rounded-full"
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16"
        >
          <SplitText>Numbers that</SplitText>{" "}
          <SplitText delay={0.15} className="gradient-text">speak volumes</SplitText>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                type: "spring",
                stiffness: 150,
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px rgba(249,38,114,0.1)",
              }}
              className="rounded-2xl border border-card-border bg-card p-8 relative overflow-hidden group"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <p className="text-4xl lg:text-5xl font-extrabold text-pink mb-3">
                  {stat.text ? (
                    <motion.span
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    >
                      {stat.text}
                    </motion.span>
                  ) : (
                    <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  )}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
