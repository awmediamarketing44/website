import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blog";
import Client from "./Client";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: { absolute: `${post.title} | AW Media` },
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      images: [{ url: post.coverImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

const siteUrl = "https://awmedia.marketing";

// Convert a "Month Year" string (e.g. "June 2026") to an ISO date so AI engines
// and search crawlers get a machine-readable publish date.
function toIsoDate(monthYear: string): string {
  const parsed = new Date(`${monthYear} 1 UTC`);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${siteUrl}${post.coverImage}`,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.date),
    author: { "@type": "Organization", name: "AW Media & Marketing", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "AW Media & Marketing",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/aw-logo-website.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    articleSection: post.tag,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Client slug={slug} />
    </>
  );
}
