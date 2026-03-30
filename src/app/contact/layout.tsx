import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Book a Free Discovery Call",
  description:
    "Book a free 15-minute call or send us a message. No pressure, no jargon. Just an honest conversation about what your fitness business needs.",
  openGraph: {
    title: "Get In Touch | AW Media & Marketing",
    description:
      "Book a free discovery call. 15 minutes, no obligation, no jargon.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
