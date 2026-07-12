import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getComparisonBySlug } from "@/data/comparisons";
import { breadcrumb, faqPage, SITE_URL } from "@/lib/schema";

// Per-page Metadata for a comparison page. Called from each route's
// `export const metadata`.
export function comparisonMetadata(slug: string): Metadata {
  const data = getComparisonBySlug(slug);
  if (!data) return { title: "Page not found" };

  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: "website",
      url: `${SITE_URL}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

// Server component: injects BreadcrumbList + FAQPage JSON-LD, then renders the
// answer-first copy, the semantic comparison table and a visible FAQ list.
export function ComparisonPage({ slug }: { slug: string }) {
  const data = getComparisonBySlug(slug);
  if (!data) notFound();

  const breadcrumbSchema = breadcrumb([
    { name: data.tag, path: `/${slug}` },
  ]);
  const faqSchema = faqPage(data.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag={data.tag}
          title={data.title}
          titleAccent={data.titleAccent}
          description={data.headerDescription}
        />

        {/* Answer-first summary + key takeaways */}
        <section className="pb-8">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-lg lg:text-xl leading-relaxed text-white/90">
              {data.answer}
            </p>
            <div className="mt-8 rounded-2xl border border-pink/20 bg-pink/[0.03] p-6 lg:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-pink mb-4">
                The short version
              </p>
              <ul className="space-y-3">
                {data.takeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm lg:text-base text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-card-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <caption className="sr-only">{data.table.caption}</caption>
                  <thead>
                    <tr className="border-b border-card-border bg-background/50">
                      {data.table.columns.map((col, i) => (
                        <th
                          key={col}
                          scope="col"
                          className={`px-5 py-5 text-xs font-bold uppercase tracking-widest ${
                            i === 0 ? "text-muted" : "text-white"
                          } ${i === 1 ? "text-pink" : ""} ${
                            i > 0 ? "border-l border-card-border" : ""
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.table.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-card-border last:border-0"
                      >
                        <th
                          scope="row"
                          className="px-5 py-4 text-sm font-semibold text-white align-top"
                        >
                          {row.feature}
                        </th>
                        {row.cells.map((cell, i) => (
                          <td
                            key={i}
                            className="px-5 py-4 text-sm text-muted align-top border-l border-card-border"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {data.related && (
              <p className="mt-6 text-sm text-muted">
                <Link
                  href={data.related.href}
                  className="font-semibold text-pink hover:underline underline-offset-4"
                >
                  {data.related.label}
                </Link>
              </p>
            )}
          </div>
        </section>

        {/* FAQ (visible, static, crawlable) */}
        <section className="py-16 border-t border-card-border">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-10">
              Common <span className="gradient-text">questions.</span>
            </h2>
            <div className="space-y-8">
              {data.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
