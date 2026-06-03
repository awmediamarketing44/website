"use client";

import Script from "next/script";

// Tracking ported 1:1 from the old WordPress site so analytics/ads continuity
// is preserved at launch:
//   Google Tag Manager  GTM-WKKHR3V
//   Google Tag (gtag)   GT-NSKKQTV
//   Microsoft Clarity   uk9ecutvw0
//   Meta Pixel          1113693993052577
export default function Analytics() {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="lazyOnload">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WKKHR3V');
      `}</Script>

      {/* Google Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GT-NSKKQTV"
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GT-NSKKQTV');
      `}</Script>

      {/* Microsoft Clarity */}
      {/*
        Guarded loader. The GTM container (GTM-WKKHR3V) already ships a
        Microsoft Clarity tag, which initialises window.clarity as an object.
        The stock Clarity snippet's `c[a]=c[a]||function(){}` guard then
        short-circuits to that object, leaving window.clarity a non-function.
        The remote clarity.ms/tag script later calls window.clarity(...) and
        throws "a[c] is not a function" on every page load.

        Fix: only inject the Clarity tag (and install the queue stub) when
        window.clarity is NOT already a function. This prevents the double
        load + the runtime TypeError while preserving Clarity tracking
        (it still loads — via GTM if present, or via this snippet if not).
      */}
      <Script id="clarity" strategy="lazyOnload">{`
        (function(c,l,a,r,i){
          if (typeof c[a] === "function") return;        // already installed (stub or real)
          if (c[a] && typeof c[a] !== "function") return; // GTM (or other) loaded Clarity already
          c[a]=function(){(c[a].q=c[a].q||[]).push(arguments)};
          var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "uk9ecutvw0");
      `}</Script>

      {/* Meta Pixel */}
      <Script id="fb-pixel" strategy="lazyOnload">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1113693993052577');
        fbq('track', 'PageView');
      `}</Script>
    </>
  );
}

// GTM + Meta Pixel <noscript> fallbacks — render inside <body>.
export function AnalyticsNoscript() {
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WKKHR3V"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.facebook.com/tr?id=1113693993052577&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}
