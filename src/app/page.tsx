import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingParticles count={35} />
      <Navbar />
      <main>
        <Hero />
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
