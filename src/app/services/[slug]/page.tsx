import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/data/services";
import { breadcrumb } from "@/lib/schema";
import Client from "./Client";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  const description =
    service.headerDescription?.slice(0, 160) || `${service.title} services by AW Media`;

  return {
    title: `${service.title} | UK Services`,
    description,
    openGraph: {
      title: `${service.title} | AW Media`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description,
    },
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const breadcrumbSchema = breadcrumb([
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Client slug={slug} />
    </>
  );
}
