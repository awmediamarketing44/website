"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/Footer";
import { getServiceBySlug, services } from "@/data/services";

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-card-border">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-semibold pr-4 group-hover:text-pink transition-colors duration-200">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-2xl text-pink"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-muted leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const params = useParams();
  const service = getServiceBySlug(params.slug as string);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) return notFound();

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag={service.tag}
          title={service.headerTitle}
          titleAccent={service.headerAccent}
          description={service.headerDescription}
        />

        {/* Long description */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-muted leading-relaxed"
              >
                {service.longDescription.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={i === 0 ? "text-lg text-white/80" : ""}
                  >
                    {para}
                  </motion.p>
                ))}
              </motion.div>

              {/* What's included */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-card-border bg-card p-8 lg:p-10"
              >
                <p className="text-xs uppercase tracking-widest text-pink mb-6 font-medium">
                  What&apos;s included
                </p>
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
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
                <div className="mt-8">
                  <MagneticButton href="/contact">Get Started</MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["What this means", "for your business."].map((line, i) => (
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

            <div className="grid sm:grid-cols-3 gap-6">
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <TiltCard>
                    <div className="group rounded-2xl border border-card-border bg-card p-8 h-full transition-all duration-500 hover:border-pink/30 relative overflow-hidden">
                      <span className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] group-hover:text-pink/[0.08] transition-colors duration-500">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-pink transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {["Is this", "right for you?"].map((line, i) => (
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
                  transition={{ delay: 0.3 }}
                  className="text-muted leading-relaxed mt-4"
                >
                  This service is perfect if any of the following sound like you:
                </motion.p>
              </div>

              <div className="space-y-4">
                {service.whoIsThisFor.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-5 hover:border-pink/30 transition-colors duration-300"
                  >
                    <span className="text-pink text-lg mt-0.5 flex-shrink-0">&#10003;</span>
                    <p className="text-sm text-muted leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Common{" "}
                  <span className="text-pink">questions.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {service.faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    faq={faq}
                    isOpen={openFaq === i}
                    toggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              {["Explore our other", "services."].map((line, i) => (
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
              {services
                .filter((s) => s.slug !== service.slug)
                .slice(0, 3)
                .map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/services/${s.slug}`}>
                      <div className="group rounded-2xl border border-card-border bg-card p-8 h-full transition-all duration-500 hover:border-pink/30 cursor-pointer">
                        <span className="text-xs font-medium text-pink uppercase tracking-wider">
                          {s.tag}
                        </span>
                        <h3 className="mt-2 text-lg font-bold group-hover:text-pink transition-colors duration-300">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                          {s.headerDescription}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm text-pink font-medium group-hover:gap-2 transition-all duration-300">
                          Learn more
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
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
              {service.ctaHeadline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted text-lg"
            >
              {service.ctaSubtext}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <MagneticButton href="/contact">Book a FREE Call</MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
