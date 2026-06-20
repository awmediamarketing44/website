import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | UK Web Design Agency",
  description:
    "Meet the team behind AW Media. Founded in Sheffield in 2016, we've built 400+ websites for ambitious UK businesses. Honest work, real results.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AW Media & Marketing",
    description:
      "A small team in Sheffield building AI-accelerated websites for UK businesses since 2016. 400+ sites. Multiple awards. A decade in.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
