import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import LazyWork from "@/components/LazyWork";
import { landingStats, type LandingPageData } from "@/data/landing-pages";

// Server component. The whole page body is static server-rendered HTML so it
// ships almost no JS to mobile. Only genuinely interactive pieces hydrate as
// islands: Navbar, PageHeader, BookCallButton, FloatingParticles (desktop-only),
// and the scroll-lazy Work carousel. FAQ uses native <details> (zero JS).

function Heading({ lines }: { lines: [string, string] }) {
  return (
    <h2 className="aw-reveal-left text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
      <span className="block">{lines[0]}</span>
      <span className="block text-pink">{lines[1]}</span>
    </h2>
  );
}

export default function SeoLandingClient({ data }: { data: LandingPageData }) {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag={data.tag}
          title={data.title}
          titleAccent={data.titleAccent}
          description={data.headerDescription}
        />

        {/* Intro + stats */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
              <div className="aw-reveal space-y-6 text-muted leading-relaxed">
                <h2 className="sr-only">
                  {data.introHeading[0]} {data.introHeading[1]}
                </h2>
                {data.introParas.map((para, i) => (
                  <p key={i} className={i === 0 ? "text-lg text-white/80" : ""}>
                    {para}
                  </p>
                ))}

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <BookCallButton>Book a FREE Call</BookCallButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-card-border px-6 py-3 text-sm font-semibold text-white hover:border-pink/50 hover:text-pink transition-colors duration-200"
                  >
                    Get a quote →
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {landingStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="aw-reveal rounded-2xl border border-card-border bg-card p-6 text-center hover:border-pink/30 transition-colors duration-300"
                  >
                    <p className="text-2xl lg:text-3xl font-extrabold text-pink mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <Heading lines={data.servicesHeading} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.services.map((service) => (
                <div
                  key={service.title}
                  className="aw-reveal rounded-2xl border border-card-border bg-card p-8 relative overflow-hidden group hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <h3 className="text-lg font-bold mb-3 group-hover:text-pink transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 w-1/2 bg-gradient-to-r from-pink to-transparent" />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200"
              >
                See how we work (AI vs Bespoke)
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <Heading lines={data.whyHeading} />

            <div className="grid sm:grid-cols-3 gap-6">
              {data.why.map((point, i) => (
                <div
                  key={point.title}
                  className="aw-reveal group rounded-2xl border border-card-border bg-card p-8 h-full transition-all duration-500 hover:border-pink/30 relative overflow-hidden hover:-translate-y-1"
                >
                  <span className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] group-hover:text-pink/[0.08] transition-colors duration-500">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-pink transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Named team (optional) — real, verifiable local staff */}
        {data.team && data.team.length > 0 && (
          <section className="py-24 border-t border-card-border">
            <div className="mx-auto max-w-7xl px-6">
              <Heading lines={data.teamHeading ?? ["Meet the team", "behind your website."]} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {data.team.map((member) => (
                  <div
                    key={member.name}
                    className="aw-reveal rounded-2xl border border-card-border bg-card p-6 text-center hover:border-pink/30 transition-colors duration-300"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                    />
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent work (scroll-lazy) */}
        <LazyWork />

        {/* FAQs — native <details>, zero JS */}
        <section className="py-24 border-t border-card-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="aw-reveal-left text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  {data.faqHeading} <span className="text-pink">questions.</span>
                </h2>
              </div>

              <div>
                {data.faqs.map((faq, i) => (
                  <details key={i} className="group border-b border-card-border">
                    <summary className="flex items-center justify-between py-6 cursor-pointer list-none text-base font-semibold hover:text-pink transition-colors duration-200">
                      <span className="pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 text-2xl text-pink transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-sm text-muted leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-card-border relative overflow-hidden">
          <div
            aria-hidden
            className="aw-glow absolute bottom-0 left-1/2 w-[600px] h-[300px] bg-pink/10 rounded-full blur-[100px]"
          />
          <div className="aw-reveal relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {data.ctaHeadline}
            </h2>
            <p className="mt-4 text-muted text-lg">{data.ctaSubtext}</p>
            <div className="mt-8">
              <BookCallButton>Book a FREE Call</BookCallButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
