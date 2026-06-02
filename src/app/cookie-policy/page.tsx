import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | AW Media & Marketing",
  description:
    "What cookies AW Media & Marketing Ltd uses, why we use them, and how you can control them.",
  alternates: { canonical: "/cookie-policy" },
};

const LAST_UPDATED = "1 June 2026";

const cookieRows = [
  {
    type: "Strictly necessary",
    purpose: "Make the site work: page routing, security, and load balancing. Always on.",
    examples: "Hosting / session cookies",
  },
  {
    type: "Analytics",
    purpose: "Help us understand how visitors use the site so we can improve it.",
    examples: "Google Analytics (GA4), Google Tag Manager, Microsoft Clarity",
  },
  {
    type: "Advertising",
    purpose: "Measure ad performance and show relevant ads on other platforms.",
    examples: "Meta (Facebook) Pixel",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />
      <PageHeader
        tag="Legal"
        title="Cookie"
        titleAccent="Policy"
        description="The cookies we use, what they do, and how to control them."
      />

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-muted mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-10 text-muted leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. What are cookies?</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They help the site work,
                remember your preferences, and let us understand how the site is used. Some are essential; others are
                optional and only set with your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Cookies we use</h2>
              <div className="overflow-x-auto rounded-2xl border border-card-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-card-border bg-card">
                      <th className="text-left font-semibold text-white px-5 py-3">Type</th>
                      <th className="text-left font-semibold text-white px-5 py-3">Purpose</th>
                      <th className="text-left font-semibold text-white px-5 py-3">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieRows.map((row) => (
                      <tr key={row.type} className="border-b border-card-border last:border-0">
                        <td className="px-5 py-4 font-medium text-white align-top">{row.type}</td>
                        <td className="px-5 py-4 align-top">{row.purpose}</td>
                        <td className="px-5 py-4 align-top">{row.examples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Managing cookies</h2>
              <p>
                You can control and delete cookies through your browser settings. Most browsers let you block or remove
                them. Blocking strictly necessary cookies may stop parts of the site working. To opt out of Google
                Analytics across all sites, you can install the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. More information</h2>
              <p>
                For how we handle the data these cookies collect, see our{" "}
                <a href="/privacy-policy" className="text-pink hover:underline">
                  Privacy Policy
                </a>
                . Any questions? Email{" "}
                <a href="mailto:alex@awmedia.marketing" className="text-pink hover:underline">
                  alex@awmedia.marketing
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
