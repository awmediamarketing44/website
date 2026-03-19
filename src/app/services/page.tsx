"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Web Design & Development",
    description:
      "Your website is the first impression most clients will ever have of your business. We design and develop fast, conversion-focused websites that look premium and actually drive enquiries. No templates. No page builders. Custom-built for your fitness brand.",
    features: [
      "Custom design tailored to your brand",
      "Mobile-first, responsive on all devices",
      "SEO-optimised from day one",
      "Fast loading speeds (under 2 seconds)",
      "Booking & payment integrations",
      "Content management system",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Logo Design & Branding",
    description:
      "Your brand is more than a logo — it's how people feel about your business before they've even spoken to you. We create complete brand identities that position you as the premium choice in your market.",
    features: [
      "Primary logo + variations",
      "Colour palette & typography",
      "Brand guidelines document",
      "Social media templates",
      "Business card & print design",
      "Brand strategy & positioning",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Social Media Graphics",
    description:
      "Your social media feed is often the first thing potential clients check. We design scroll-stopping graphics and templates so your content looks professional and consistent — without you spending hours in Canva.",
    features: [
      "Custom post & story templates",
      "Carousel designs",
      "Highlight covers",
      "Content calendar templates",
      "Branded quote & tip graphics",
      "Reel cover designs",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
  },
  {
    title: "SEO & Monthly Support",
    description:
      "A website without maintenance is like a gym without equipment. We provide ongoing SEO, security updates, performance monitoring, and content support so your site keeps working for you month after month.",
    features: [
      "Monthly SEO improvements",
      "Google Search Console management",
      "Performance & speed monitoring",
      "Security updates & backups",
      "Content updates & changes",
      "Priority support",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Shopify & E-Commerce",
    description:
      "Selling supplements, merch, or digital programmes? We build Shopify stores that look premium and are optimised for conversions. From product pages to checkout flows, every detail is designed to sell.",
    features: [
      "Custom Shopify theme design",
      "Product page optimisation",
      "Payment & shipping setup",
      "Subscription & membership integration",
      "Abandoned cart recovery",
      "Analytics & conversion tracking",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    title: "Landing Pages & Ads",
    description:
      "Running ads without a proper landing page is burning money. We build high-converting landing pages specifically designed for paid traffic — Facebook, Instagram, Google — with clear messaging and strong CTAs.",
    features: [
      "Conversion-optimised design",
      "A/B testing ready",
      "Facebook & Google Ads integration",
      "Lead capture forms",
      "Speed optimised for ad traffic",
      "Analytics & tracking setup",
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

const process = [
  { step: "01", title: "Discovery Call", description: "We learn about your business, goals, and what's not working right now." },
  { step: "02", title: "Strategy & Design", description: "We create a plan and design mockups tailored to your brand and audience." },
  { step: "03", title: "Build & Refine", description: "We build your site with your feedback at every stage. No surprises." },
  { step: "04", title: "Launch & Support", description: "We launch your site and stick around to make sure it keeps performing." },
];

export default function ServicesPage() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="What We Do"
          title="Everything your fitness"
          titleAccent="business needs online."
          description="Web design, branding, social media, SEO — all under one roof. No more juggling multiple agencies."
        />

        {/* Services */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6 space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard>
                  <div className="group rounded-2xl border border-card-border bg-card p-8 lg:p-12 transition-all duration-500 hover:border-pink/30 relative overflow-hidden">
                    {/* Background number */}
                    <span className="absolute top-6 right-8 text-7xl font-black text-white/[0.02] group-hover:text-pink/[0.05] transition-colors duration-500">
                      0{i + 1}
                    </span>

                    <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
                      <div>
                        <motion.div
                          className="mb-5 w-14 h-14 rounded-2xl bg-pink/10 flex items-center justify-center text-pink"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {service.icon}
                        </motion.div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-pink transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-pink mb-4 font-medium">What&apos;s included</p>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {service.features.map((feature, j) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + j * 0.05 }}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <span className="text-pink mt-0.5 flex-shrink-0">&#10003;</span>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["How it", "works."].map((line, i) => (
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-card-border bg-card p-8 relative overflow-hidden group"
                >
                  <span className="text-5xl font-black text-pink/10 group-hover:text-pink/20 transition-colors duration-500">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold group-hover:text-pink transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
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
              Ready to get started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted text-lg"
            >
              Book a free call and we&apos;ll figure out exactly what you need.
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
