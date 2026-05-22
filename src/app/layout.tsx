import type { Metadata } from "next";
import CalendlyProvider from "@/components/CalendlyProvider";
import FloatingOrbs from "@/components/FloatingOrbs";
import "./globals.css";

const siteUrl = "https://awmedia.marketing";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AW Media & Marketing | AI-Accelerated Web Design Agency",
    template: "%s | AW Media & Marketing",
  },
  description:
    "Award-winning AI-accelerated web design and digital services for ambitious UK businesses. Sheffield-based, UK-wide. Bespoke design when the project demands it, AI-accelerated when speed matters.",
  keywords: [
    "AI-accelerated web design",
    "AI web design agency UK",
    "web design agency Sheffield",
    "Next.js web design",
    "bespoke web design UK",
    "modern web design agency",
    "AW Media",
  ],
  authors: [{ name: "AW Media & Marketing" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "AW Media & Marketing",
    title: "AW Media & Marketing | AI-Accelerated Web Design Agency",
    description:
      "Award-winning AI-accelerated and bespoke web design for ambitious UK businesses. 400+ websites built since 2016. A decade of craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AW Media & Marketing | AI-Accelerated Web Design Agency",
    description:
      "Award-winning AI-accelerated and bespoke web design for ambitious UK businesses. 400+ websites built since 2016. A decade of craft.",
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
        <CalendlyProvider>{children}</CalendlyProvider>
      </body>
    </html>
  );
}
