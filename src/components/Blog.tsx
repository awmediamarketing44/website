"use client";

import { motion } from "motion/react";

const posts = [
  {
    tag: "Web Design",
    title: "Why Your Fitness Coaching Website Isn't Turning Visitors Into Paying Clients",
    image: null,
  },
  {
    tag: "Marketing",
    title: "Why Your Fitness Coaching Website Isn't Turning Visitors Into Paying Clients",
    image: null,
  },
  {
    tag: "Branding",
    title: "Why Your Fitness Coaching Website Isn't Turning Visitors Into Paying Clients",
    image: null,
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            From our blog, <span className="text-pink">tips & tricks</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group block rounded-2xl border border-card-border bg-card overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-pink/10 to-card relative overflow-hidden">
                <div className="absolute inset-0 bg-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-pink/10 px-3 py-1 text-xs font-medium text-pink mb-3">
                  {post.tag}
                </span>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-pink transition-colors duration-200">
                  {post.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
