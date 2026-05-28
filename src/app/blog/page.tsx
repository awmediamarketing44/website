"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import TiltCard from "@/components/TiltCard";
import Footer from "@/components/Footer";

const featuredPost = {
  tag: "Web Design",
  title: "Why Your Fitness Coaching Website Isn't Turning Visitors Into Paying Clients",
  excerpt:
    "You're getting traffic but nobody's booking a call. Here's why, and the 7 things you can fix today to start converting visitors into paying clients.",
  date: "March 2026",
};

const posts = [
  {
    tag: "Branding",
    title: "How to Stand Out in a Saturated Fitness Market With Better Branding",
    excerpt: "Everyone's got a logo. But a logo isn't a brand. Here's what actually makes fitness clients choose you over the coach next door.",
    date: "March 2026",
  },
  {
    tag: "Marketing",
    title: "The 5 Biggest Mistakes Fitness Coaches Make With Their Online Presence",
    excerpt: "From broken links to missing CTAs, these are the errors we see on almost every fitness coach's website. Number 3 is costing you clients daily.",
    date: "February 2026",
  },
  {
    tag: "SEO",
    title: "Local SEO for Personal Trainers: How to Rank in Your Area",
    excerpt: "Your ideal clients are searching 'personal trainer near me' right now. Here's how to make sure they find you instead of your competitor.",
    date: "February 2026",
  },
  {
    tag: "Social Media",
    title: "Stop Wasting Hours in Canva: A Fitness Coach's Guide to Efficient Content",
    excerpt: "You don't need to spend 6 hours making graphics. Here's the system we use to create a month's worth of social content in under 2 hours.",
    date: "January 2026",
  },
  {
    tag: "Web Design",
    title: "Website Speed Matters: Why Your Slow Site Is Losing You Clients",
    excerpt: "Every second your site takes to load, you lose 7% of conversions. Here's how to check your speed and what to do about it.",
    date: "January 2026",
  },
  {
    tag: "Business",
    title: "How Much Should a Fitness Coach Spend on a Website in 2026?",
    excerpt: "From DIY to agency, we break down the real costs, what you get at each price point, and when it's worth investing more.",
    date: "December 2025",
  },
];

export default function BlogPage() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Blog"
          title="Tips, tricks &"
          titleAccent="honest advice."
          description="Practical guides for ambitious businesses that want a better online presence. No fluff. Just stuff that actually works."
        />

        {/* Featured post */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard>
                <a href="#" className="group block rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-card"
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/5">Featured</span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block w-fit rounded-full bg-pink/10 border border-pink/20 px-3 py-1 text-xs font-medium text-pink mb-4">
                        {featuredPost.tag}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-bold group-hover:text-pink transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-muted leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-muted">{featuredPost.date}</span>
                        <span className="text-sm text-pink font-medium group-hover:translate-x-1 transition-transform duration-300">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* All posts */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <TiltCard className="h-full">
                    <a href="#" className="group block h-full rounded-2xl border border-card-border bg-card overflow-hidden transition-all duration-500 hover:border-pink/30">
                      {/* Image placeholder */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink/10 via-purple-500/5 to-card"
                          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="absolute top-4 left-4 inline-block rounded-full bg-black/60 backdrop-blur-sm border border-pink/20 px-3 py-1 text-xs font-medium text-pink"
                        >
                          {post.tag}
                        </motion.span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-base font-bold leading-snug group-hover:text-pink transition-colors duration-200">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted">{post.date}</span>
                          <span className="text-xs text-pink/60 group-hover:text-pink transition-colors">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
