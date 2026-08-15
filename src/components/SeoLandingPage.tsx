import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { ORG_ID } from "@/lib/schema";
import SeoLandingClient from "@/components/SeoLandingClient";

const siteUrl = "https://awmedia.marketing";

// Build the per-page Metadata for a landing page. Called from each route's
// `export const metadata`.
export function landingMetadata(slug: string): Metadata {
  const data = getLandingPageBySlug(slug);
  if (!data) return { title: "Page not found" };

  const { metaTitle, metaDescription } = data;
  return {
    // Override the layout title template — these pages carry their own full title.
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `${siteUrl}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

// Server wrapper: injects Service + FAQPage JSON-LD, then renders the client UI.
export function SeoLandingPage({ slug }: { slug: string }) {
  const data = getLandingPageBySlug(slug);
  if (!data) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.serviceName,
    serviceType: data.serviceType,
    description: data.metaDescription,
    url: `${siteUrl}/${slug}`,
    provider: {
      // Same @id as the sitewide Organization node, so these 15 landing pages
      // strengthen one entity instead of declaring 15 separate businesses.
      "@id": ORG_ID,
      "@type": "Organization",
      name: "AW Media & Marketing",
      url: siteUrl,
      ...(data.team && data.team.length > 0
        ? {
            employee: data.team.map((m) => ({
              "@type": "Person",
              name: m.name,
              jobTitle: m.role,
            })),
          }
        : {}),
    },
    areaServed: "GB",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoLandingClient data={data} />
    </>
  );
}
