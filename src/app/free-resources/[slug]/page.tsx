import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { downloads, getDownload } from "@/data/resources";
import Client from "./Client";

export function generateStaticParams() {
  return downloads.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const download = getDownload(slug);
  if (!download) return { title: "Resource not found" };

  return {
    // A metaTitle is used verbatim so the page can keep its title under 60 chars.
    title: download.metaTitle
      ? { absolute: download.metaTitle }
      : `${download.title} | Free Download`,
    description: download.metaDescription ?? download.description,
    alternates: { canonical: `/free-resources/${slug}` },
    openGraph: {
      title: download.title,
      description: download.description,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getDownload(slug)) notFound();
  return <Client slug={slug} />;
}
