"use client";

import { notFound } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/Footer";
import TypeformEmbed from "@/components/TypeformEmbed";
import CrmEmbed from "@/components/CrmEmbed";
import { getEnquiryBySlug } from "@/data/enquiries";

export default function EnquiryPageClient({ slug }: { slug: string }) {
  const enquiry = getEnquiryBySlug(slug);
  if (!enquiry) return notFound();

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag={enquiry.tag}
          title={enquiry.title}
          titleAccent={enquiry.titleAccent}
          description={enquiry.description}
        />

        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-card-border bg-card p-2 sm:p-4"
            >
              {enquiry.crmUrl ? (
                <CrmEmbed
                  src={enquiry.crmUrl}
                  title={`${enquiry.title} enquiry`}
                />
              ) : enquiry.typeformId ? (
                <TypeformEmbed id={enquiry.typeformId} />
              ) : null}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
