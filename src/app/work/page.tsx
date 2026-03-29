"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";

const filters = ["All", "Web Design", "Branding", "Shopify", "Landing Page"];

const projects = [
  {
    title: "Hard to Kill",
    category: "Web Design",
    description: "Full website build for a premium fitness coaching brand. Dark, bold aesthetic with integrated booking system.",
    tags: ["Next.js", "Animations", "Booking"],
  },
  {
    title: "Glean App",
    category: "Web Design",
    description: "SaaS landing page for a fitness tracking application. Clean UI with interactive demo sections.",
    tags: ["React", "SaaS", "UI/UX"],
  },
  {
    title: "Lumina Stone",
    category: "Branding",
    description: "Complete brand identity including logo, colour palette, typography, and brand guidelines.",
    tags: ["Logo", "Brand Guide", "Print"],
  },
  {
    title: "Newgen Coaching",
    category: "Web Design",
    description: "Coaching platform with client portal, programme delivery, and payment integration.",
    tags: ["WordPress", "Portal", "Payments"],
  },
  {
    title: "Bridge2Fitness",
    category: "Web Design",
    description: "Personal training website with online booking, class timetables, and testimonial system.",
    tags: ["Booking", "Timetable", "SEO"],
  },
  {
    title: "Pyper Fitness",
    category: "Landing Page",
    description: "High-converting landing page for 1:1 online coaching. Optimised for ad traffic.",
    tags: ["Conversion", "Ads", "Copywriting"],
  },
  {
    title: "The Mind Architect",
    category: "Branding",
    description: "Brand identity for a behavioural performance coach. Minimal, premium positioning.",
    tags: ["Logo", "Social Templates", "Strategy"],
  },
  {
    title: "FitGear Store",
    category: "Shopify",
    description: "E-commerce store for fitness equipment and supplements with subscription model.",
    tags: ["Shopify", "E-commerce", "Subscriptions"],
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Our Work"
          title="Websites that convert"
          titleAccent="visitors into clients."
          description="Every project is built with one goal: make your fitness business look as good as the results you deliver."
        />

        {/* Filters */}
        <section className="pb-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-pink text-white shadow-[0_0_20px_rgba(249,38,114,0.3)]"
                      : "border border-card-border text-muted hover:border-pink/30 hover:text-white"
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <TiltCard>
                      <div className="group relative rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                        {/* Image placeholder */}
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-pink/15 via-purple-500/10 to-card"
                            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                              {project.title}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <span className="text-xs font-medium text-pink uppercase tracking-wider">
                            {project.category}
                          </span>
                          <h3 className="mt-2 text-lg font-bold group-hover:text-pink transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-pink/5 border border-pink/10 px-3 py-1 text-xs text-pink/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
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
              Want results like these?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted text-lg"
            >
              Let&apos;s talk about your project.
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
