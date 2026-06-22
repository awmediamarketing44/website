"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import Footer from "@/components/Footer";
import { blogPosts, getFeaturedPost, getNonFeaturedPosts } from "@/data/blog";

export default function BlogPage() {
  const featured = getFeaturedPost();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Topic chips, ordered by how many posts each topic has (most first).
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    blogPosts.forEach((p) => counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  // "All" shows the featured hero + the rest of the posts (original layout).
  // A selected topic hides the hero and shows every post in that topic.
  const showFeatured = activeTag === null;
  const posts = showFeatured
    ? getNonFeaturedPosts()
    : blogPosts.filter((p) => p.tag === activeTag);

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Blog"
          title="Tips, tricks &"
          titleAccent="honest advice."
          description="Practical guides for ambitious businesses that want a better online presence. No fluff. Just stuff that actually works."
        />

        {/* Topic filter chips */}
        <section className="pb-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                aria-pressed={activeTag === null}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTag === null
                    ? "border-pink/40 bg-pink/15 text-pink"
                    : "border-card-border bg-card text-muted hover:border-pink/30 hover:text-white"
                }`}
              >
                All
                <span className="ml-1.5 text-xs opacity-60">{blogPosts.length}</span>
              </button>
              {tags.map(([tag, count]) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "border-pink/40 bg-pink/15 text-pink"
                        : "border-card-border bg-card text-muted hover:border-pink/30 hover:text-white"
                    }`}
                  >
                    {tag}
                    <span className="ml-1.5 text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured post */}
        {showFeatured && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Cover image with animated gradient fallback */}
                    <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-card">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                      />
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover relative z-10"
                        priority
                      />
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block w-fit rounded-full bg-pink/10 border border-pink/20 px-3 py-1 text-xs font-medium text-pink">
                          {featured.tag}
                        </span>
                        <span className="text-xs text-muted uppercase tracking-wider">Featured</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold group-hover:text-pink transition-colors duration-300 leading-tight">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-muted leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <span>{featured.date}</span>
                          <span>·</span>
                          <span>{featured.readingMinutes} min read</span>
                        </div>
                        <span className="text-sm text-pink font-medium group-hover:translate-x-1 transition-transform duration-300">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          </div>
        </section>
        )}

        {/* All posts */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.5) }}
                >
                  <TiltCard className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden bg-card">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/10 via-purple-500/5 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
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
                        <span
                          className="absolute top-4 left-4 z-20 inline-block rounded-full bg-black/60 backdrop-blur-sm border border-pink/20 px-3 py-1 text-xs font-medium text-pink"
                        >
                          {post.tag}
                        </span>
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
      </main>
      <Footer />
    </>
  );
}
