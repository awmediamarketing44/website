"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { enquiries } from "@/data/enquiries";

export default function EnquiryHubClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Quick Enquiry"
          title="Tell us what you need."
          titleAccent="We'll do the rest."
          description="Pick what you're after below and answer a few quick questions. Prefer to talk? You can book a free call or use the full contact form instead."
        />

        <section className="py-12 pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enquiries.map((enquiry, i) => (
                <motion.div
                  key={enquiry.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/enquiry/${enquiry.slug}`}>
                    <div className="group rounded-2xl border border-card-border bg-card p-7 h-full transition-all duration-500 hover:border-pink/30 cursor-pointer">
                      <h2 className="text-lg font-bold group-hover:text-pink transition-colors duration-300">
                        {enquiry.title} {enquiry.titleAccent}
                      </h2>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {enquiry.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-pink font-medium group-hover:gap-2 transition-all duration-300">
                        Start enquiry
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
            >
              <BookCallButton>Or book a FREE call</BookCallButton>
              <Link
                href="/contact"
                className="text-sm text-muted hover:text-pink transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Prefer the full contact form? →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
