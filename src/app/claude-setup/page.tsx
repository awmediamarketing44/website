import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Set Claude up properly",
  description:
    "The setup we give clients: how to build a Claude project that actually knows your business, plus the ten company brain files to fill in and upload.",
  // Hidden page. Handed out on calls and in follow-ups, never linked from the
  // nav and deliberately NOT added to sitemap.ts. Noindex only works if the
  // crawler is allowed in to read it, so it is not disallowed in robots.ts
  // either.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return <Client />;
}
