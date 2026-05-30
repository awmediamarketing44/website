"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";

// Both audit tools are standalone apps (they capture the visitor's details
// before running/delivering the audit). Update these URLs once confirmed.
const WEBSITE_AUDIT_URL = "https://awmedia-production.up.railway.app/";
const SOCIAL_AUDIT_URL = "https://awmedia-production.up.railway.app/"; // TODO: replace with the live social-media-audit-tool URL

const audits = [
  {
    title: "Website Audit",
    tagline: "Google-powered, in 30 seconds.",
    description:
      "We run your site through Google's own analysis engine — performance, mobile, SEO, accessibility and best practices — and show you exactly what's costing you customers, plus what to fix first.",
    points: [
      "Mobile + desktop scores",
      "Performance & speed",
      "SEO & best practices",
      "Actionable fixes",
    ],
    cta: "Run my website audit",
    href: WEBSITE_AUDIT_URL,
  },
  {
    title: "Social Media Audit",
    tagline: "Your profiles, professionally reviewed.",
    description:
      "We review your social presence — profile setup, content, consistency and engagement — and hand you a clear, prioritised list of what to improve to grow and convert more followers.",
    points: [
      "Profile optimisation",
      "Content & consistency",
      "Engagement review",
      "30-day action plan",
    ],
    cta: "Run my social audit",
    href: SOCIAL_AUDIT_URL,
  },
];

export default function FreeAuditClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free Audit"
          title="See exactly what's"
          titleAccent="holding you back."
          description="Two free audits, no obligation. Pick your website or your socials, leave a few details, and we'll show you what's working, what's not, and what to fix first."
        />

        <section className="py-12 pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {audits.map((audit, i) => (
                <motion.div
                  key={audit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-2xl border border-card-border bg-card p-8 lg:p-10 transition-all duration-500 hover:border-pink/30"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-pink">
                    {audit.tagline}
                  </span>
                  <h2 className="mt-3 text-2xl lg:text-3xl font-bold">
                    {audit.title}
                  </h2>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {audit.description}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {audit.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-muted"
                      >
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={audit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block rounded-full bg-pink px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
                  >
                    {audit.cta}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="text-muted mb-6">
                Prefer to talk it through? We&apos;ll happily walk you through
                the results.
              </p>
              <BookCallButton>Book a FREE Call</BookCallButton>
              <span className="mx-3 text-muted">or</span>
              <Link
                href="/enquiry"
                className="text-sm text-pink font-medium hover:underline underline-offset-4"
              >
                send a quick enquiry →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
