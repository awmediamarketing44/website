import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustryBySlug, industries } from "@/data/industries";
import Client from "./Client";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry not found" };

  const description =
    industry.headerDescription?.slice(0, 160) ||
    `Web design for ${industry.title} businesses across the UK`;

  return {
    title: `${industry.title} Web Design`,
    description,
    openGraph: {
      title: `${industry.title} Web Design | AW Media`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Web Design`,
      description,
    },
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getIndustryBySlug(slug)) notFound();
  return <Client slug={slug} />;
}
