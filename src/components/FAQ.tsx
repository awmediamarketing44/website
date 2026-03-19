"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "How long does a website take to build?",
    answer:
      "Most fitness coaching websites are delivered within 2-4 weeks. More complex sites with e-commerce or membership features may take 4-6 weeks. We'll give you a clear timeline before we start.",
  },
  {
    question: "Do I need to provide all the content?",
    answer:
      "We'll guide you through everything. We provide a simple content questionnaire, and our team can help with copywriting, photography direction, and content strategy. You focus on coaching — we handle the rest.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Absolutely. Every site we build comes with an easy-to-use content management system. We'll walk you through it so you can update text, images, and blog posts without touching any code.",
  },
  {
    question: "What's included in monthly support?",
    answer:
      "Our monthly support covers hosting, security updates, performance monitoring, content updates, SEO improvements, and priority support. Think of it as having a web team on retainer without the overhead.",
  },
  {
    question: "Do you only work with fitness businesses?",
    answer:
      "While over 90% of our clients are fitness professionals — coaches, PTs, gym owners — we work with any ambitious business that wants a website that actually converts. Fitness is our specialty, but great design is universal.",
  },
];

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Everything you need to{" "}
              <span className="text-pink">know</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
