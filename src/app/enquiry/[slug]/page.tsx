import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enquiries, getEnquiryBySlug } from "@/data/enquiries";
import Client from "./Client";

export function generateStaticParams() {
  return enquiries.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const enquiry = getEnquiryBySlug(slug);
  if (!enquiry) return { title: "Enquiry not found" };

  const title = `${enquiry.title} ${enquiry.titleAccent} | AW Media`;
  return {
    title,
    description: enquiry.description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/enquiry/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getEnquiryBySlug(slug)) notFound();
  return <Client slug={slug} />;
}
