"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Alex Whitehead",
    role: "Director, Developer & Award-Winning Web Designer",
    bio: "The one who builds your website, designs your brand, and probably messages you back at 11pm. Alex founded AW Media in 2019 with one goal: give fitness businesses the same quality digital presence that big brands take for granted.",
  },
  {
    name: "Beth Rendell",
    role: "Director & Operations",
    bio: "Keeps everything running smoothly behind the scenes. From project timelines to client communication, Beth makes sure nothing falls through the cracks.",
  },
  {
    name: "Paul Rendell",
    role: "Web Design & Development",
    bio: "Brings years of development experience to the team. Paul works alongside Alex to build fast, reliable websites that don't just look good — they perform.",
  },
  {
    name: "Lahcen",
    role: "Graphic Design",
    bio: "The creative eye behind our social media graphics, brand assets, and visual content. Lahcen turns ideas into scroll-stopping designs that make your brand stand out in a crowded feed.",
  },
];

const values = [
  {
    title: "No bullshit.",
    description: "We say what we mean. If something won't work, we'll tell you. If we can do better, we will. No jargon, no runaround.",
  },
  {
    title: "Built to convert.",
    description: "Every decision we make — from layout to copy to colour — is designed to turn visitors into clients. Pretty isn't enough.",
  },
  {
    title: "We actually care.",
    description: "Your business matters to us. We're not just ticking boxes. We invest in understanding your market, your clients, and your goals.",
  },
  {
    title: "Always improving.",
    description: "The web changes fast. We stay on top of design trends, SEO updates, and performance standards so your site never falls behind.",
  },
];

const timeline = [
  { year: "2019", event: "AW Media founded in Sheffield" },
  { year: "2020", event: "Pivoted to fitness industry during lockdown" },
  { year: "2021", event: "100th website delivered" },
  { year: "2022", event: "First award nomination" },
  { year: "2023", event: "4x back-to-back awards" },
  { year: "2024", event: "300+ websites, expanded team" },
  { year: "2025", event: "400+ websites, AI-powered workflows" },
  { year: "2026", event: "Relaunched with next-gen tech stack" },
];

export default function AboutPage() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="About Us"
          title="We're not your typical"
          titleAccent="web design agency."
          description="We're a small team in Sheffield that builds websites for fitness professionals. That's it. No fluff, no corporate waffle — just honest work for people who want results."
        />

        {/* Story */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  {["Started in a bedroom.", "Now trusted by 500+."].map((line, i) => (
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 text-muted leading-relaxed"
                >
                  <p>
                    AW Media started in 2019 when Alex realised that fitness coaches
                    were getting absolutely rinsed by agencies charging thousands for
                    template websites that didn&apos;t convert.
                  </p>
                  <p>
                    The pitch was simple: premium web design at a fair price, built
                    by someone who actually understands the fitness industry. No
                    middlemen, no account managers, no 6-week wait times.
                  </p>
                  <p>
                    Fast forward to today — we&apos;ve built over 400 websites, won
                    multiple awards back to back, and over 90% of our clients are
                    fitness professionals. We know this space inside out.
                  </p>
                </motion.div>
              </div>

              {/* Timeline */}
              <div className="relative pl-8 border-l border-card-border">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative mb-8 last:mb-0 group"
                  >
                    <div className="absolute -left-[2.55rem] top-1 w-3 h-3 rounded-full bg-card border-2 border-pink/50 group-hover:bg-pink transition-colors duration-300" />
                    <span className="text-sm font-bold text-pink">{item.year}</span>
                    <p className="text-sm text-muted mt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["What we", "stand for."].map((line, i) => (
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

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
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
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
              {["The people", "behind the pixels."].map((line, i) => (
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
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <TiltCard>
                    <div className="group rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                      {/* Photo placeholder */}
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/15 via-purple-500/10 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white/10">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold group-hover:text-pink transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-xs text-pink font-medium mt-1">{member.role}</p>
                        <p className="mt-3 text-sm text-muted leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </TiltCard>
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
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Want to work with us?
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8">
              <BookCallButton>Book a FREE Call</BookCallButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
