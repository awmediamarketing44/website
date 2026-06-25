import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blog";
import Client from "./Client";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// Build an SEO-friendly <title> that stays inside Google's ~60-char display.
// Short headlines keep the full title plus the brand (unchanged behaviour);
// long ones are trimmed to the first natural break (a colon, dash or question),
// then word-boundary truncated as a last resort. The full headline still drives
// the H1 and the richer og:/twitter titles below.
function seoTitle(title: string): string {
  const inRange = (s: string) => s.length >= 30 && s.length <= 60;

  // 1. Short headlines: keep the full title plus the brand (unchanged behaviour).
  const withBrand = `${title} | AW Media`;
  if (withBrand.length <= 60) return withBrand;

  // 2. Lead with the keyword phrase before a natural break, plus brand, but only
  //    when that lands in the healthy 30-60 window (avoids tiny stubs like
  //    "Website Launched | AW Media" that would also collide across posts).
  for (const delimiter of [":", " - ", "?"]) {
    const i = title.indexOf(delimiter);
    if (i > 12 && i <= 58) {
      const base = title.slice(0, i).trim();
      const based = `${base} | AW Media`;
      if (inRange(based)) return based;
      if (inRange(base)) return base;
      break;
    }
  }

  // 3. The full headline already fits without the brand.
  if (inRange(title)) return title;

  // 4. Last resort: word-boundary truncation, keeping the title unique.
  return title.slice(0, 60).replace(/\s+\S*$/, "").trim();
}

// Keep meta descriptions inside the ~160-char snippet, trimmed on a word boundary.
function clampDescription(text: string): string {
  if (text.length <= 160) return text;
  return text.slice(0, 158).replace(/\s+\S*$/, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: { absolute: seoTitle(post.title) },
    description: clampDescription(post.metaDescription),
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
