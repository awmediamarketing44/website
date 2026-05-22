"use client";

import Link from "next/link";
import { motion } from "motion/react";
import TiltCard from "./TiltCard";
import { SplitText } from "./TextReveal";

const services = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    description:
      "Stop losing leads to better-looking websites. We build fast, conversion-focused sites that make any brand look as good as the work behind it.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    gradient: "from-pink/20 to-purple-500/10",
  },
  {
    slug: "branding",
    title: "Logo Design & Branding",
    description:
      "A Canva logo isn't cutting it. Get a brand identity that stands out in a saturated market and builds instant trust across every touchpoint.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    gradient: "from-orange-500/20 to-pink/10",
  },
  {
    slug: "social-media",
    title: "Social Media Graphics",
    description:
      "Stop wasting hours in Canva. We create scroll-stopping templates and graphics so your feed looks professional without eating into the day job.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
    gradient: "from-blue-500/20 to-pink/10",
  },
  {
    slug: "seo-support",
    title: "SEO & Monthly Support",
    description:
      "We don't just build it and disappear. Ongoing SEO, updates, and support so your site keeps ranking and converting long after launch.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    gradient: "from-green-500/20 to-pink/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
            {[
              { text: "Stop paying multiple agencies" },
              { text: "for things that should" },
              { text: "work together.", className: "text-pink" },
            ].map((line, i) => (
              <motion.span
                key={i}
                className={`block ${line.className || ""}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={`/services/${service.slug}`}>
              <TiltCard>
                <div className="group relative overflow-hidden rounded-2xl border border-card-border bg-card p-8 transition-all duration-500 hover:border-pink/30 cursor-pointer">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-pink/5"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 text-pink"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-pink transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* Animated arrow */}
                    <motion.div
                      className="mt-4 text-pink/50 group-hover:text-pink transition-colors"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Learn more →</span>
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
