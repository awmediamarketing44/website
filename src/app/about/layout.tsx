import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Sheffield Web Design Agency",
  description:
    "Meet the team behind AW Media. Founded in 2019, we've built 400+ websites for fitness professionals. No corporate waffle, just honest work for people who want results.",
  openGraph: {
    title: "About AW Media & Marketing",
    description:
      "A small team in Sheffield building websites for fitness professionals since 2019. 400+ sites. Multiple awards. No fluff.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
