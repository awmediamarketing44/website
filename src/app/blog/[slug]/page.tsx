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
    title: `${post.title} | AW Media Blog`,
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getPostBySlug(slug)) notFound();
  return <Client slug={slug} />;
}
