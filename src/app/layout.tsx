import type { Metadata } from "next";
import Script from "next/script";
import { Rethink_Sans } from "next/font/google";
import CalendlyProvider from "@/components/CalendlyProvider";
import RouteTransition from "@/components/RouteTransition";
import FloatingOrbs from "@/components/FloatingOrbs";
import CursorSpotlight from "@/components/CursorSpotlight";
import Analytics, { AnalyticsNoscript } from "@/components/Analytics";
import { aggregateRating, offerCatalog } from "@/lib/schema";
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
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: "AW Media & Marketing",
  alternateName: ["AW Media", "awmedia"],
  legalName: "AWMEDIA.MARKETING LTD",
  url: siteUrl,
  logo: `${siteUrl}/images/aw-logo-website.png`,
  image: `${siteUrl}/images/aw-logo-website.png`,
  description:
    "UK web design studio. Bespoke design when the project demands it, AI-accelerated when speed matters. Building websites, brands and landing pages since 2016.",
  slogan: "Designed properly. Built faster.",
  foundingDate: "2016",
  founder: { "@type": "Person", name: "Alex Whitehead" },
  email: "alex@awmedia.marketing",
  telephone: "+44-7932-815405",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 4 Broadfield Court",
    addressLocality: "Sheffield",
    addressRegion: "South Yorkshire",
    postalCode: "S8 0XF",
    addressCountry: "GB",
  },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    "Sheffield",
    "Rotherham",
    "Barnsley",
    "Chesterfield",
    "Leeds",
    "Manchester",
    "Liverpool",
  ],
  knowsAbout: [
    "Web Design",
    "Bespoke Website Development",
    "Branding and Brand Identity",
    "Logo Design",
    "Social Media Graphics",
    "Search Engine Optimisation",
    "E-commerce Websites",
    "Landing Page Design",
    "AI-Accelerated Web Design",
    "Bespoke Business Software",
    "Custom CRM Development",
    "Client and Customer Portals",
    "Booking and Scheduling Systems",
    "Business Process Automation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "alex@awmedia.marketing",
    telephone: "+44-7932-815405",
    areaServed: "GB",
    availableLanguage: "English",
  },
  aggregateRating: aggregateRating(),
  hasOfferCatalog: offerCatalog(),
  sameAs: [
    "https://www.instagram.com/awmedia.marketing/",
    "https://www.facebook.com/awmedianmarketing",
    "https://www.threads.net/@awmedia.marketing",
    "https://www.linkedin.com/in/alex-whitehead-193549109/",
    "https://www.youtube.com/@awmedia.marketing/",
    "https://uk.trustpilot.com/review/awmedia.marketing",
    "https://share.google/8yAimVy5LjqKfStKc",
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
      "Award-winning bespoke and AI-accelerated web design for ambitious UK businesses. 450+ websites built since 2016. A decade of craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AW Media & Marketing | UK Web Design Studio",
    description:
      "Award-winning bespoke and AI-accelerated web design for ambitious UK businesses. 450+ websites built since 2016. A decade of craft.",
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
        <RouteTransition />
        <CalendlyProvider>{children}</CalendlyProvider>
        {/* The floating WhatsApp circle moved INTO the Live chat pill the CRM
            widget draws bottom left (WhatsApp + AI chat in one). */}
        {/* Website live chat (AI in Alex's voice, hands over to him in the CRM).
            Served by the CRM; while it is in test mode there it only shows for a
            browser that has opened the site with ?chat=test. */}
        <Script src="https://crm.awmedia.marketing/chat-embed.php" strategy="lazyOnload" />
      </body>
    </html>
  );
}
