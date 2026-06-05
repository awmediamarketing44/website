import type { Metadata } from "next";
import Script from "next/script";
import WebsiteAuditClient from "./Client";

export const metadata: Metadata = {
  title: "Free Website Audit | Instant Results",
  description:
    "Run a free, instant website audit. Get scored on performance, mobile experience, SEO, accessibility and best practices, with plain-English recommendations for your business.",
  alternates: { canonical: "/website-audit" },
  openGraph: {
    title: "Free Instant Website Audit",
    description:
      "Find out what's stopping your website from converting. Get instant scores and actionable recommendations.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/*
        Meta Pixel 2742460306123259 — page-scoped to /website-audit for ad campaigns.
        Separate from the site-wide pixel in Analytics.tsx. Uses trackSingle so this
        PageView is attributed only to the ads pixel and doesn't pollute the main one.
      */}
      <Script id="fb-pixel-website-audit" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2742460306123259');
        fbq('trackSingle', '2742460306123259', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.facebook.com/tr?id=2742460306123259&ev=PageView&noscript=1"
        />
      </noscript>
      <WebsiteAuditClient />
    </>
  );
}
