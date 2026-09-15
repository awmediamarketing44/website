"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { downloads, audits, featuredAudit } from "@/data/resources";

function Tick() {
  return (
    <svg
      className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function FreeResourcesClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free Resources"
          title="Everything we know,"
          titleAccent="given away."
          description="Practical guides written for business owners, not marketers, plus four free tools that check your site while you wait. Take what is useful. There is no catch and no sales call attached."
        />

        {/* ---------- Downloads ---------- */}
        <section id="downloads" className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-pink">
                Guides &amp; checklists
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold">
                Free to download
              </h2>
              <p className="mt-4 max-w-2xl text-muted leading-relaxed">
                Each one is a proper guide, not a two-page teaser. We will email
                it over so you have it saved rather than lost in a browser tab.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloads.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-2xl border border-card-border bg-card p-8 transition-all duration-500 hover:border-pink/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-pink">
                      {d.kicker}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                      {d.format}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl lg:text-2xl font-bold leading-tight">
                    {d.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">
                    {d.description}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {d.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-muted">
                        <Tick />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/free-resources/${d.slug}`}
                    className="mt-8 block rounded-full bg-pink px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
                  >
                    {d.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Audits ---------- */}
        <section id="audits" className="py-12 pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-pink">
                Free tools
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold">
                Audits you can run right now
              </h2>
              <p className="mt-4 max-w-2xl text-muted leading-relaxed">
                They run on your real website, profiles or files and give you a
                score plus the specific gaps. No obligation to do anything with
                the results.
              </p>
            </div>

            {/* Featured tool, pulled out of the grid below so the grid stays even */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="mb-6 rounded-2xl border border-pink/30 bg-card p-8 transition-all duration-500 hover:border-pink/50 lg:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-pink px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {featuredAudit.pill}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-pink">
                  {featuredAudit.kicker}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold lg:text-3xl">
                {featuredAudit.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                {featuredAudit.description}
              </p>
              <Link
                href={featuredAudit.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pink underline-offset-4 hover:underline"
              >
                {featuredAudit.cta}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {audits.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-2xl border border-card-border bg-card p-8 transition-all duration-500 hover:border-pink/30"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-pink">
                    {a.kicker}
                  </span>
                  <h3 className="mt-3 text-xl lg:text-2xl font-bold">{a.title}</h3>
                  <p className="mt-4 flex-1 text-sm text-muted leading-relaxed">
                    {a.description}
                  </p>
                  <Link
                    href={a.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pink hover:underline underline-offset-4"
                  >
                    {a.cta}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Close ---------- */}
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted mb-6">
                Read something you want a second opinion on? We will happily
                look at your site and tell you straight.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <BookCallButton>Book a FREE Call</BookCallButton>
                <span className="text-sm text-muted">
                  or{" "}
                  <Link
                    href="/enquiry"
                    className="whitespace-nowrap text-pink font-medium hover:underline underline-offset-4"
                  >
                    send a quick enquiry &rarr;
                  </Link>
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
