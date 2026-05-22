"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SplitText } from "./TextReveal";
import TiltCard from "./TiltCard";

const workCards = [
  { label: "Web Design & Development", tag: "Design" },
  { label: "Logo & Brand Identity", tag: "Branding" },
  { label: "Social Media Graphics", tag: "Social" },
  { label: "SEO & Growth", tag: "Marketing" },
];

export default function Intro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Floating background accent */}
      <motion.div
        style={{ x }}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink/5 rounded-full blur-[100px]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
          </div>

          {/* Right cards - 2x2 grid with 3D tilt */}
          <div className="grid grid-cols-2 gap-4">
            {workCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <TiltCard className="h-full">
                  <div className="group relative overflow-hidden rounded-2xl border border-card-border bg-card p-4 sm:p-6 h-36 sm:h-44 flex flex-col justify-between transition-colors duration-300 hover:border-pink/30">
                    <span className="text-xs font-medium text-pink/60 uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{card.label}</p>
                      <motion.div
                        className="mt-2 h-0.5 bg-pink/30"
                        initial={{ width: 0 }}
                        whileInView={{ width: "40%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                      />
                    </div>
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
