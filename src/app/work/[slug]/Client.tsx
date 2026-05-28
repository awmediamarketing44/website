"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import TiltCard from "@/components/TiltCard";
import PhoneFrame from "@/components/PhoneFrame";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { getProjectBySlug, projects } from "@/data/projects";

export default function ProjectPageClient({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);

  if (!project) return notFound();

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink/10 rounded-full blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted mb-8"
            >
              <Link href="/work" className="hover:text-white transition-colors">Work</Link>
              <span>/</span>
              <span className="text-pink">{project.title}</span>
            </motion.div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  <span className="rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink">
                    {project.category}
                  </span>
                  <span className="rounded-full border border-card-border bg-card px-4 py-1.5 text-xs font-medium text-muted">
                    {project.year}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight"
                >
                  {project.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-lg text-muted leading-relaxed max-w-xl"
                >
                  {project.brief}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-pink/5 border border-pink/10 px-3 py-1 text-xs text-pink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Client info card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-card-border bg-card p-6 lg:p-8"
              >
                <p className="text-xs uppercase tracking-widest text-pink mb-5 font-medium">Client</p>
                <div className="space-y-4">
                  {[
                    { label: "Name", value: project.client.name },
                    { label: "Industry", value: project.client.industry },
                    ...(project.client.location ? [{ label: "Location", value: project.client.location }] : []),
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-muted mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                  {project.client.website && (
                    <div>
                      <p className="text-xs text-muted mb-0.5">Website</p>
                      <a
                        href={project.client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-pink hover:underline"
                      >
                        Visit live site →
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hero image: 16:9 for web/landing, 1:1 contained for branding (logos), 4:5 portrait for social-only */}
        {(() => {
          const isSocialOnly = (!project.gallery || project.gallery.length === 0) && project.graphics && project.graphics.length > 0;
          const isBranding = project.category === "Branding / Logo Design";
          if (isBranding) {
            return (
              <section className="pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-2xl"
                  >
                    <div className="relative aspect-square rounded-2xl border border-card-border overflow-hidden bg-card">
                      {project.hasImages ? (
                        <Image
                          src={project.heroImage}
                          alt={`${project.title} logo`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 90vw, 640px"
                          className="object-contain"
                        />
                      ) : (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              </section>
            );
          }
          if (isSocialOnly) {
            return (
              <section className="pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-md"
                  >
                    <div className="relative rounded-2xl border border-card-border overflow-hidden bg-card" style={{ aspectRatio: "4 / 5" }}>
                      {project.hasImages ? (
                        <Image
                          src={project.heroImage}
                          alt={`${project.title} hero`}
                          fill
                          priority
                          sizes="(max-width: 768px) 90vw, 480px"
                          className="object-cover"
                        />
                      ) : (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              </section>
            );
          }
          return (
            <section className="pb-16 lg:pb-24">
              <div className="mx-auto max-w-7xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl border border-card-border overflow-hidden"
                >
                  <div className="aspect-[16/9] relative bg-card">
                    {project.hasImages ? (
                      <Image
                        src={project.heroImage}
                        alt={`${project.title} hero`}
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-4xl sm:text-6xl font-bold text-white/10">{project.title}</span>
                            <p className="text-sm text-muted/40 mt-2">Hero screenshot goes here</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })()}

        {/* The Challenge */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {["The", "challenge."].map((line, i) => (
                    <motion.span
                      key={i}
                      className={`block ${i > 0 ? "text-pink" : ""}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h2>
              </div>

              <div className="space-y-6">
                {project.challenge.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-6 hover:border-pink/30 transition-colors duration-300"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink/10 flex items-center justify-center text-pink text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["Our", "approach."].map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${i > 0 ? "text-pink" : ""}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <div className="space-y-6 max-w-3xl">
              {project.approach.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`leading-relaxed ${i === 0 ? "text-lg text-white/80" : "text-muted"}`}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery: only render if project has gallery items */}
        {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["The", "work."].map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${i > 0 ? "text-pink" : ""}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            {project.hasImages ? (
              (() => {
                const desktop = project.gallery.find((g) => g.includes('desktop') && !g.includes('full'));
                const mobile = project.gallery.find((g) => g.includes('mobile'));
                const full = project.gallery.find((g) => g.includes('full'));
                return (
                  <div className="space-y-6">
                    {/* Desktop hero shot */}
                    {desktop && (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl border border-card-border overflow-hidden"
                      >
                        <div className="aspect-[16/10] relative bg-card">
                          <Image
                            src={desktop}
                            alt={`${project.title} desktop`}
                            fill
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            className="object-cover object-top"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Phone frame + full-page scroll, side by side */}
                    {(mobile || full) && (
                      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6 items-center">
                        {mobile && (
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex justify-center"
                          >
                            <PhoneFrame src={mobile} alt={`${project.title} mobile`} className="w-full max-w-[280px]" />
                          </motion.div>
                        )}
                        {full && (
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="rounded-2xl border border-card-border overflow-hidden"
                          >
                            <div className="relative bg-card" style={{ aspectRatio: '16 / 22' }}>
                              <Image
                                src={full}
                                alt={`${project.title} full page`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover object-top"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`rounded-2xl border border-card-border overflow-hidden ${i === 0 ? 'sm:col-span-2' : ''}`}
                  >
                    <div className={`relative bg-card ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-pink/15 via-purple-500/10 to-card"
                        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm text-muted/40">
                          {i === 0 ? 'Desktop view' : i === 1 ? 'Mobile view' : `Detail ${i}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
        )}

        {/* Graphics / social deliverables */}
        {project.graphics && project.graphics.length > 0 && (
          <section className="py-24 border-t border-card-border">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {["Weekly", "graphics."].map((line, i) => (
                  <motion.span
                    key={i}
                    className={`block ${i > 0 ? "text-pink" : ""}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted text-base sm:text-lg max-w-2xl mb-16"
              >
                A weekly social pack designed to keep the brand sharp across launches, education, and athlete features.
              </motion.p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {project.graphics.map((img, i) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="group rounded-xl border border-card-border overflow-hidden bg-card"
                  >
                    <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                      <Image
                        src={img}
                        alt={`${project.title} graphic ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features built */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {["What we", "built."].map((line, i) => (
                    <motion.span
                      key={i}
                      className={`block ${i > 0 ? "text-pink" : ""}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-card-border bg-card p-8 lg:p-10"
              >
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="text-pink mt-0.5 flex-shrink-0">&#10003;</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results / Stats */}
        {project.results && (
          <section className="py-24 border-t border-card-border">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
                {["The", "numbers."].map((line, i) => (
                  <motion.span
                    key={i}
                    className={`block ${i > 0 ? "text-pink" : ""}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {project.results.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-card-border bg-card p-6 text-center group hover:border-pink/30 transition-colors duration-300"
                  >
                    <p className="text-3xl sm:text-4xl font-extrabold text-pink mb-2">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <section className="py-24 border-t border-card-border relative overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-pink/10 rounded-full blur-[120px]"
            />

            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="text-6xl text-pink/20">&ldquo;</span>
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl font-medium leading-relaxed"
              >
                {project.testimonial.quote}
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <p className="font-bold">{project.testimonial.name}</p>
                <p className="text-sm text-muted">{project.testimonial.role}</p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Related projects */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              {["More", "projects."].map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${i > 0 ? "text-pink" : ""}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/work/${p.slug}`}>
                      <TiltCard>
                        <div className="group relative rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                          <div className="aspect-[16/10] relative overflow-hidden bg-black">
                            {p.hasImages ? (
                              <Image
                                src={p.thumbnailImage}
                                alt={`${p.title} thumbnail`}
                                fill
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                className={`${p.category === 'Branding / Logo Design' ? 'object-contain p-4 sm:p-6' : 'object-cover object-top'} group-hover:scale-105 transition-transform duration-700`}
                              />
                            ) : (
                              <>
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-pink/15 via-purple-500/10 to-card"
                                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  style={{ backgroundSize: "200% 200%" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-2xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                                    {p.title}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="p-6">
                            <span className="text-xs font-medium text-pink uppercase tracking-wider">
                              {p.category}
                            </span>
                            <h3 className="mt-2 text-lg font-bold group-hover:text-pink transition-colors duration-300">
                              {p.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                              {p.brief}
                            </p>
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-card-border relative overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink/10 rounded-full blur-[120px]"
          />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            >
              Like what you see?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted text-lg"
            >
              Let&apos;s build something like this for your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <BookCallButton>Book a FREE Call</BookCallButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
