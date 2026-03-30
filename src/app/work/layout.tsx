import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Fitness Websites That Convert",
  description:
    "See the websites, brands, and landing pages we've built for fitness coaches, PTs, and gym owners. Every project is built to convert visitors into clients.",
  openGraph: {
    title: "Our Work | AW Media & Marketing",
    description:
      "Portfolio of websites and brands built for the fitness industry. Custom design, real results.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
