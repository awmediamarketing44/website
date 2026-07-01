// Homepage FAQ content. Lives in a plain data module so both the client FAQ
// component and the server-rendered FAQPage JSON-LD can share one source.
export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "How long does a website take to build?",
    answer:
      "AI-accelerated builds ship in 2 to 6 weeks depending on scope. Fully bespoke builds run 4 to 10 weeks. Complex sites with e-commerce, memberships, or custom integrations sit at the longer end. We'll give you a clear timeline before we start and we stick to it.",
  },
  {
    question: "Do I need to provide all the content?",
    answer:
      "We'll guide you through everything. We provide a simple content questionnaire, and our team can help with copywriting, photography direction, and content strategy. You focus on running your business and we handle the rest.",
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
    question: "What kind of businesses do you work with?",
    answer:
      "Any ambitious UK business. We started in fitness and built deep expertise there (coaches, PTs, gym owners, online coaching brands), and we now work with clinics, trades, e-commerce, photographers, and professional services. The AI-accelerated process and the bespoke craft are the same regardless of industry.",
  },
];
