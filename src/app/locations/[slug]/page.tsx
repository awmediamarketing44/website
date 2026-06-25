import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocationBySlug,
  locations,
  metaTitle,
  metaDescription,
} from "@/data/locations";
import Client from "./Client";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return { title: "Location not found" };

  const title = metaTitle(loc);
  const description = metaDescription(loc);

  return {
    // metaTitle already carries the brand, so bypass the layout's "%s | AW Media"
    // template (it was double-appending) with an absolute title.
    title: { absolute: title },
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `/locations/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getLocationBySlug(slug)) notFound();
  return <Client slug={slug} />;
}
