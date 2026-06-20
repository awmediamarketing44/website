import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import CalendlyProvider from "@/components/CalendlyProvider";
import FloatingOrbs from "@/components/FloatingOrbs";
import CursorSpotlight from "@/components/CursorSpotlight";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics, { AnalyticsNoscript } from "@/components/Analytics";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-rethink-sans",
});

const siteUrl = "https://awmedia.marketing";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AW Media & Marketing",
  url: siteUrl,
  logo: `${siteUrl}/images/aw-logo-website.png`,
  description:
    "UK web design studio. Bespoke design when the project demands it, AI-accelerated when speed matters. Building websites, brands and landing pages since 2016.",
  foundingDate: "2016",
  email: "alex@awmedia.marketing",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sheffield",
    addressCountry: "GB",
  },
  areaServed: "GB",
  sameAs: [
    "https://www.instagram.com/awmedia.marketing/",
    "https://www.facebook.com/awmedianmarketing",
    "https://www.threads.net/@awmedia.marketing",
    "https://www.linkedin.com/in/alex-whitehead-193549109/",
    "https://www.youtube.com/@awmedia.marketing/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AW Media & Marketing",
  url: siteUrl,
  publisher: { "@type": "Organization", name: "AW Media & Marketing" },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AW Media & Marketing | UK Web Design Studio",
    template: "%s | AW Media",
  },
  description:
    "Award-winning web design for ambitious UK businesses. Sheffield-based, UK-wide. Bespoke when the project demands it, AI-accelerated when speed matters.",
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
  verification: {
    google: "uJET3U5RDI-T3YL4UvjQdW0MFW0HTRnWtJFFLrxAGVM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rethinkSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Analytics />
        <AnalyticsNoscript />
        <FloatingOrbs />
        <CursorSpotlight />
        <CalendlyProvider>{children}</CalendlyProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
