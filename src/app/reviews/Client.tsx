"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { TRUSTPILOT_PROFILE_URL } from "@/components/TrustpilotWidget";
import { testimonials } from "@/data/reviews";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-pink" : "text-white/15"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Reviews"
          title="Don't take"
          titleAccent="our word for it."
          description="A decade of work, hundreds of websites, and clients across every industry. Here's what they actually say about working with AW Media."
        />

        {/* Trustpilot link strip (static badge — full profile lives on Trustpilot) */}
        <section className="pb-8">
          <div className="mx-auto max-w-5xl px-6 flex justify-center">
            <motion.a
              href={TRUSTPILOT_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 rounded-full border border-card-border bg-card px-5 py-2.5 hover:border-pink/30 transition-colors duration-200"
            >
              <Stars count={5} />
              <span className="text-sm font-semibold">Reviewed on Trustpilot</span>
              <span className="text-xs text-muted">Read them all &rarr;</span>
            </motion.a>
          </div>
        </section>

        {/* Curated testimonials (only if populated) */}
        {testimonials.length > 0 && (
          <section className="py-16 border-t border-card-border">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08 }}
                    className="rounded-2xl border border-card-border bg-card p-7 flex flex-col"
                  >
                    <Stars count={t.rating ?? 5} />
                    <p className="mt-4 text-sm text-white/90 leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-5">
                      <p className="text-sm font-bold">{t.name}</p>
                      {t.business && (
                        <p className="text-xs text-muted">{t.business}</p>
                      )}
                      {t.source && (
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-pink/70">
                          via {t.source}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

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
              Want to be the next happy client?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-lg text-muted"
            >
              Book a free call, or read every review over on Trustpilot.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <BookCallButton>Book a FREE Call</BookCallButton>
              <a
                href={TRUSTPILOT_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-pink transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Read all reviews on Trustpilot →
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
