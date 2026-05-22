import type { Metadata } from "next";
import CalendlyProvider from "@/components/CalendlyProvider";
import FloatingOrbs from "@/components/FloatingOrbs";
import CursorSpotlight from "@/components/CursorSpotlight";
import "./globals.css";

const siteUrl = "https://awmedia.marketing";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AW Media & Marketing | UK Web Design Studio",
    template: "%s | AW Media & Marketing",
  },
  description:
    "Award-winning web design and digital services for ambitious UK businesses. Sheffield-based, UK-wide. Bespoke design when the project demands it, AI-accelerated when speed matters.",
  keywords: [
    "web design agency UK",
    "Sheffield web design agency",
    "bespoke web design UK",
    "Next.js web design",
    "modern web design agency",
    "AI-accelerated web design",
    "AW Media",
  ],
  authors: [{ name: "AW Media & Marketing" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "AW Media & Marketing",
    title: "AW Media & Marketing | UK Web Design Studio",
    description:
      "Award-winning bespoke and AI-accelerated web design for ambitious UK businesses. 400+ websites built since 2016. A decade of craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AW Media & Marketing | UK Web Design Studio",
    description:
      "Award-winning bespoke and AI-accelerated web design for ambitious UK businesses. 400+ websites built since 2016. A decade of craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FloatingOrbs />
        <CursorSpotlight />
        <CalendlyProvider>{children}</CalendlyProvider>
      </body>
    </html>
  );
}
