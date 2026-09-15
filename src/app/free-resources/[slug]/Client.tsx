"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import CrmEmbed from "@/components/CrmEmbed";
import Footer from "@/components/Footer";
import { getDownload, magnetFormUrl, downloads } from "@/data/resources";

export default function Client({ slug }: { slug: string }) {
  const download = getDownload(slug);
  if (!download) return null;

  const others = downloads.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <>
      <FloatingParticles count={16} />
      <Navbar />
      <main>
        <PageHeader
          tag={`Free ${download.format}`}
          title={download.title}
          description={download.intro}
        />

        <section className="pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
              {/* What's inside */}
              <div className="rounded-2xl border border-card-border bg-card p-8">
                <h2 className="text-lg font-bold">What is inside</h2>
                <ul className="mt-6 space-y-4">
                  {download.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-muted">
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
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xs text-muted leading-relaxed">
                  We will email you the download link. We will not pass your
                  details to anyone, and you can unsubscribe from anything we
                  send in one click.
                </p>
              </div>

              {/* Capture form, hosted in the AW CRM */}
              <div>
                <CrmEmbed
                  src={magnetFormUrl(download.slug)}
                  title={`${download.title} download form`}
                />
                <p className="mt-4 text-center text-xs text-muted">
                  Trouble with the form?{" "}
                  <a
                    href={magnetFormUrl(download.slug)}
                    className="text-pink font-medium hover:underline underline-offset-4"
                  >
                    Open it in a new tab
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other guides */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold mb-6">While you are here</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {others.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/free-resources/${d.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-6 transition-all duration-300 hover:border-pink/30"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-pink">
                      {d.kicker}
                    </span>
                    <span className="mt-2 font-semibold leading-snug">
                      {d.title}
                    </span>
                    <span className="mt-3 text-sm text-pink">
                      {d.cta}{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-muted">
              Or see everything on the{" "}
              <Link
                href="/free-resources"
                className="text-pink font-medium hover:underline underline-offset-4"
              >
                free resources page
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
