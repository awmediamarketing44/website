"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import TiltCard from "./TiltCard";
import { SplitText } from "./TextReveal";
import { getLatestPosts } from "@/data/blog";

const posts = getLatestPosts(3);

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
              key={post.slug}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30"
                >
                  {/* Cover image with animated gradient fallback */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-card">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover relative z-10"
                      loading="lazy"
                    />

                    {/* Floating tag */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="absolute top-4 left-4 z-20 inline-block rounded-full bg-black/60 backdrop-blur-sm border border-pink/20 px-3 py-1 text-xs font-medium text-pink"
                    >
                      {post.tag}
                    </motion.span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold leading-snug group-hover:text-pink transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readingMinutes} min</span>
                      </div>
                      <span className="text-xs text-pink/60 group-hover:text-pink transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
