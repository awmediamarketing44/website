import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrowserShowcase from "@/components/BrowserShowcase";
import Intro from "@/components/Intro";
import PainPoint from "@/components/PainPoint";
import CompareLanes from "@/components/CompareLanes";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import SocialProof from "@/components/SocialProof";
import TrustTicker from "@/components/TrustTicker";
import WhyUs from "@/components/WhyUs";
import Stats from "@/components/Stats";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import { faqs } from "@/data/faqs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FloatingParticles count={35} />
      <Navbar />
      <main>
        <Hero />
        <BrowserShowcase />
        <Intro />
        <PainPoint />
        <CompareLanes />
        <Services />
        <Work />
        <Process />
        <SocialProof />
        <TrustTicker />
        <WhyUs />
        <Stats />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
