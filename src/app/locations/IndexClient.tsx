"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";

export default function LocationsIndexClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Locations"
          title="Sheffield-based."
          titleAccent="Working UK-wide."
          description="We're proud to call Sheffield home, but we work with ambitious businesses all over the country. Find your area below — or just get in touch wherever you are."
        />

        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/locations/${loc.slug}`}>
                    <div className="group rounded-2xl border border-card-border bg-card p-7 h-full transition-all duration-500 hover:border-pink/30 cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-pink/70 mb-2">
                        {loc.region}
                      </p>
                      <h2 className="text-xl font-bold group-hover:text-pink transition-colors duration-300">
                        Web Designer {loc.city}
                      </h2>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {loc.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-pink font-medium group-hover:gap-2 transition-all duration-300">
                        View {loc.city}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
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
              className="mt-16 text-center"
            >
              <p className="text-muted mb-6">
                Don&apos;t see your area? It doesn&apos;t matter where you are —
                we work with clients all over the UK.
              </p>
              <BookCallButton>Book a FREE Call</BookCallButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
