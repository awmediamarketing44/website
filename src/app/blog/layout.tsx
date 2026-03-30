import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tips & Insights for Fitness Professionals",
  description:
    "Practical advice on web design, branding, social media, and digital marketing for fitness coaches, PTs, and gym owners.",
  openGraph: {
    title: "Blog | AW Media & Marketing",
    description:
      "Web design and marketing insights for the fitness industry.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
