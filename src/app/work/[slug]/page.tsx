import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import Client from "./Client";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const description = project.brief?.slice(0, 160) || `${project.title} case study by AW Media`;
  const ogImage = project.heroImage;

  return {
    title: { absolute: `${project.title} | Case Study | AW Media` },
    description,
    openGraph: {
      title: `${project.title} | AW Media Case Study`,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return <Client slug={slug} />;
}
