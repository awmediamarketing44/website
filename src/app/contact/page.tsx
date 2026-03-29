"use client";

import { useState } from "react";
import Script from "next/script";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/Footer";

const contactMethods = [
  {
    title: "Email us",
    value: "alex@awmedia.marketing",
    href: "mailto:alex@awmedia.marketing",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Call us",
    value: "Book a free call below",
    href: "#calendly",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Location",
    value: "Sheffield, UK",
    href: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Get In Touch"
          title="Let's build something"
          titleAccent="that actually works."
          description="Book a free 15-minute call or send us a message. No pressure, no jargon — just an honest conversation about what your business needs."
        />

        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
              {/* Left - contact info */}
              <div className="space-y-6">
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-4 rounded-2xl border border-card-border bg-card p-6 transition-all duration-300 hover:border-pink/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center text-pink flex-shrink-0 group-hover:bg-pink/20 transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted">{method.title}</p>
                      <p className="font-semibold group-hover:text-pink transition-colors duration-300">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                ))}

                {/* Social */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <p className="text-sm text-muted mb-3">Follow us</p>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { name: "Instagram", href: "https://www.instagram.com/awmedia.marketing/" },
                      { name: "Facebook", href: "https://www.facebook.com/awmedianmarketing" },
                      { name: "Threads", href: "https://www.threads.net/@awmedia.marketing" },
                      { name: "LinkedIn", href: "https://www.linkedin.com/in/alex-whitehead-193549109/" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-card-border bg-card px-4 py-2 text-xs font-medium text-muted hover:text-pink hover:border-pink/30 transition-colors duration-200"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right - form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-pink/30 bg-card p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <span className="text-3xl text-pink">&#10003;</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                    <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-2xl border border-card-border bg-card p-8 lg:p-10 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">What do you need?</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white focus:border-pink/50 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option value="web-design">Web Design & Development</option>
                        <option value="branding">Logo Design & Branding</option>
                        <option value="social">Social Media Graphics</option>
                        <option value="seo">SEO & Monthly Support</option>
                        <option value="shopify">Shopify & E-Commerce</option>
                        <option value="landing">Landing Page</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tell us about your project</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors resize-none"
                        placeholder="What's your business? What are you struggling with? What's your budget and timeline?"
                      />
                    </div>

                    <div>
                      <MagneticButton href="#" className="w-full text-center">
                        Send Message
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Calendly section */}
        <section id="calendly" className="py-24 border-t border-card-border relative overflow-hidden">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              Or just book a call.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted text-lg mb-12"
            >
              15 minutes. Free. No obligation.
            </motion.p>

            {/* Calendly embed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-card-border bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/awmedia-marketing/aw-discovery-call?hide_event_type_details=1&hide_gdpr_banner=1"
                style={{ minWidth: "320px", height: "700px" }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
