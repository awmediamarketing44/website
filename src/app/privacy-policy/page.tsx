import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AW Media & Marketing",
  description:
    "How AW Media & Marketing Ltd collects, uses, and protects your personal data in line with UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "1 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />
      <PageHeader
        tag="Legal"
        title="Privacy"
        titleAccent="Policy"
        description="How we collect, use, and protect your personal data, in plain English."
      />

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-muted mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-10 text-muted leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Who we are</h2>
              <p>
                This website is operated by <strong className="text-white">AW Media &amp; Marketing Ltd</strong>{" "}
                (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a web design and marketing studio based in
                Sheffield, United Kingdom. We are the data controller responsible for your personal data. If you have
                any questions about this policy, email us at{" "}
                <a href="mailto:alex@awmedia.marketing" className="text-pink hover:underline">
                  alex@awmedia.marketing
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. The data we collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Enquiry details</strong>: when you complete a contact or enquiry
                  form, we collect your name, email address, the service you&rsquo;re interested in, and anything you
                  write in your message.
                </li>
                <li>
                  <strong className="text-white">Marketing preferences</strong>: if you opt in, we record your
                  consent to receive marketing emails.
                </li>
                <li>
                  <strong className="text-white">Usage data</strong>: pages visited, device and browser type, and
                  approximate location, collected through analytics and advertising tools (see our{" "}
                  <a href="/cookie-policy" className="text-pink hover:underline">
                    Cookie Policy
                  </a>
                  ).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. How we use your data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your enquiry and provide the services you ask for.</li>
                <li>To send you marketing emails, where you have given consent (you can opt out at any time).</li>
                <li>To understand how our website is used so we can improve it.</li>
                <li>To meet our legal and accounting obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Legal basis for processing</h2>
              <p>
                We process enquiry data on the basis of <strong className="text-white">legitimate interests</strong>{" "}
                (responding to your request) and, where applicable, to take steps to enter into a contract. Marketing
                emails are sent on the basis of your <strong className="text-white">consent</strong>. Analytics and
                advertising cookies are set only with your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Who we share it with</h2>
              <p>
                We never sell your data. We share it only with trusted providers who help us run our business, including
                our email/CRM platform (ActiveCampaign), our hosting provider (20i), and analytics and advertising
                partners (Google, Microsoft, Meta). These providers process data on our behalf under contract.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. How long we keep it</h2>
              <p>
                We keep enquiry data for as long as needed to deal with your request and for our legitimate business
                records. Marketing data is kept until you unsubscribe. You can ask us to delete your data at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your rights</h2>
              <p>
                Under UK GDPR you have the right to access, correct, delete, or restrict the use of your personal data,
                to object to processing, and to data portability. To exercise any of these, email{" "}
                <a href="mailto:alex@awmedia.marketing" className="text-pink hover:underline">
                  alex@awmedia.marketing
                </a>
                . You also have the right to complain to the{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink hover:underline"
                >
                  Information Commissioner&rsquo;s Office (ICO)
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. Any changes will be posted on this page with a revised
                &ldquo;last updated&rdquo; date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
