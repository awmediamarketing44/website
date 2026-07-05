"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import { getPostBySlug, getRelatedPosts } from "@/data/blog";
import type { BlogSection } from "@/data/blog-types";

function SectionBlock({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "p":
      return (
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          {section.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-6">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-4">
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 pl-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base sm:text-lg text-muted leading-relaxed">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 pl-1 list-none counter-reset">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base sm:text-lg text-muted leading-relaxed">
              <span className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink/10 border border-pink/30 text-xs font-semibold text-pink mt-1">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-pink pl-5 italic text-lg sm:text-xl text-white/80 leading-relaxed">
          {section.text}
          {section.attribution && (
            <footer className="not-italic text-sm text-muted mt-2">{section.attribution}</footer>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border border-pink/25 bg-pink/[0.04] p-6">
          {section.label && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink mb-2">
              {section.label}
            </div>
          )}
          <p className="text-base sm:text-lg text-white/85 leading-relaxed">{section.text}</p>
          {section.href && (
            <Link
              href={section.href}
              className="mt-3 inline-block text-sm font-semibold text-pink hover:underline"
            >
              {section.linkLabel ?? "Find out more"} →
            </Link>
          )}
        </aside>
      );
  }
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink/10 rounded-full blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs text-muted hover:text-pink transition-colors"
              >
                <span>←</span>
                <span>Back to blog</span>
              </Link>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink mb-6"
            >
              {post.tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted"
            >
              <span>By Alex Whitehead</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </motion.div>
          </div>
        </section>

        {/* Cover image */}
        <section className="pb-12 lg:pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-card-border bg-card"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover relative z-10"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <article className="pb-20">
          <div className="mx-auto max-w-3xl px-6 space-y-6">
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
              {post.excerpt}
            </p>
            {post.body.map((section, i) => (
              <SectionBlock key={i} section={section} />
            ))}
          </div>
        </article>

        {/* Author bio — named-expert signal (E-E-A-T) */}
        <section className="pb-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-start gap-5 rounded-2xl border border-card-border bg-card p-6 sm:p-8">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border border-pink/25">
                <Image
                  src="/images/team/alex.jpg"
                  alt="Alex Whitehead, Director at AW Media & Marketing"
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Written by <span className="text-pink">Alex Whitehead</span>
                </p>
                <p className="mt-0.5 text-xs text-muted uppercase tracking-widest">
                  Director, Developer &amp; Award-Winning Web Designer
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Alex founded AW Media in Sheffield in 2016 and has led 500+ website,
                  branding and SEO projects since, picking up four back-to-back industry
                  awards along the way. He writes the way he works: straight answers,
                  no jargon, judged on results.
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-block text-xs text-pink/70 hover:text-pink transition-colors"
                >
                  More about the team →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border border-pink/25 bg-gradient-to-br from-pink/10 via-pink/[0.03] to-card p-8 sm:p-12 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Want this for your business?
              </h3>
              <p className="text-muted leading-relaxed max-w-xl mx-auto mb-6">
                Free 15-minute call. We&apos;ll look at your current site, tell you what&apos;s
                working, what isn&apos;t, and what we&apos;d do differently. No pitch.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300"
              >
                Book a free call
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="pb-24">
            <div className="mx-auto max-w-7xl px-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-8">Read next</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <TiltCard key={p.slug} className="h-full">
                    <Link
                      href={`/blog/${p.slug}`}
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
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover relative z-10"
                          loading="lazy"
                        />
                        <span className="absolute top-4 left-4 z-20 inline-block rounded-full bg-black/60 backdrop-blur-sm border border-pink/20 px-3 py-1 text-xs font-medium text-pink">
                          {p.tag}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="text-base font-bold leading-snug group-hover:text-pink transition-colors duration-200">
                          {p.title}
                        </h4>
                        <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                          {p.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted">{p.date}</span>
                          <span className="text-xs text-pink/60 group-hover:text-pink transition-colors">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
