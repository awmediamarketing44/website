"use client";

import { motion } from "motion/react";
import TiltCard from "./TiltCard";
import { SplitText } from "./TextReveal";

const posts = [
  {
    tag: "Web Design",
    title: "Why Your Fitness Coaching Website Isn't Turning Visitors Into Paying Clients",
  },
  {
    tag: "Marketing",
    title: "The 5 Biggest Mistakes Fitness Coaches Make With Their Online Presence",
  },
  {
    tag: "Branding",
    title: "How to Stand Out in a Saturated Fitness Market With Better Branding",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-14 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            <SplitText>From our blog,</SplitText>{" "}
            <SplitText delay={0.15} className="text-pink">tips & tricks</SplitText>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard>
                <a href="#" className="group block rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                  {/* Image placeholder with animated gradient */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <div className="absolute inset-0 bg-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating tag */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="absolute top-4 left-4 inline-block rounded-full bg-black/60 backdrop-blur-sm border border-pink/20 px-3 py-1 text-xs font-medium text-pink"
                    >
                      {post.tag}
                    </motion.span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-pink transition-colors duration-200">
                      {post.title}
                    </h3>
                    <motion.span
                      className="inline-block mt-3 text-xs text-pink/60 group-hover:text-pink transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      Read more →
                    </motion.span>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
