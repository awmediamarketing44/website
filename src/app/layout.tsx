import type { Metadata } from "next";
import CalendlyProvider from "@/components/CalendlyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AW Media & Marketing | Web Design for Fitness Professionals",
  description:
    "Award-winning web design and digital services for fitness coaches, PTs, and gym owners. We build websites that convert visitors into paying clients.",
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
