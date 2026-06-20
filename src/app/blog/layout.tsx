import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tips, Tricks & Honest Advice",
  description:
    "Practical advice on web design, branding, social media, and digital marketing for ambitious UK businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | AW Media & Marketing",
    description:
      "Web design and marketing insights for ambitious UK businesses.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
