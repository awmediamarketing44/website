import type { Metadata } from "next";
import CalendlyProvider from "@/components/CalendlyProvider";
import "./globals.css";

const siteUrl = "https://awmedia.marketing";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AW Media & Marketing | Web Design for Fitness Professionals",
    template: "%s | AW Media & Marketing",
  },
  description:
    "Award-winning web design and digital services for fitness coaches, PTs, and gym owners. We build websites that convert visitors into paying clients.",
  keywords: [
    "web design for fitness coaches",
    "personal trainer website",
    "gym website design",
    "fitness branding",
    "fitness web design Sheffield",
    "AW Media",
  ],
  authors: [{ name: "AW Media & Marketing" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "AW Media & Marketing",
    title: "AW Media & Marketing | Web Design for Fitness Professionals",
    description:
      "Award-winning web design for fitness coaches, PTs, and gym owners. 400+ websites built since 2019.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AW Media & Marketing | Web Design for Fitness Professionals",
    description:
      "Award-winning web design for fitness coaches, PTs, and gym owners. 400+ websites built since 2019.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CalendlyProvider>{children}</CalendlyProvider>
      </body>
    </html>
  );
}
