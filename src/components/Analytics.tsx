"use client";

import Script from "next/script";

// Tracking ported 1:1 from the old WordPress site so analytics/ads continuity
// is preserved at launch:
//   Google Tag Manager  GTM-WKKHR3V
//   Google Tag (gtag)   GT-NSKKQTV
//   Microsoft Clarity   uk9ecutvw0
//   Meta Pixel          1113693993052577 (legacy, from old WP site)
//   Meta Pixel          2742460306123259 (current, for ad campaigns)
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

      {/* Microsoft Clarity (uk9ecutvw0) — guarded so the remote tag is only
          injected once, even if this inline snippet executes more than once
          (SSR + hydration). A double injection leaves window.clarity a
          non-function object and throws "a[c] is not a function". */}
      <Script id="clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i){
            if (l.getElementById("ms-clarity-tag")) return;
            // Force a function stub. Something on the page can leave window.clarity
            // a non-function object, which makes the remote tag throw
            // "a[c] is not a function" and abort before clarity.js loads.
            if (typeof c[a] !== "function") {
              c[a]=function(){(c[a].q=c[a].q||[]).push(arguments)};
            }
            var t=l.createElement(r);t.id="ms-clarity-tag";t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "uk9ecutvw0");
      `}</Script>

      {/* CRM form-submit bridge. The enquiry forms are embedded as iframes from
          crm.awmedia.marketing; on submit they postMessage { awcrm: 'submit' }
          up to the parent. Forward that to GA4 (generate_lead) + GTM dataLayer.
          Origin-checked so only the CRM can fire these events. */}
      <Script id="aw-crm-lead" strategy="afterInteractive">{`
        window.addEventListener('message', function(e){
          if (e.origin !== 'https://crm.awmedia.marketing') return;
          if (e.data && e.data.awcrm === 'submit') {
            if (typeof gtag === 'function') {
              gtag('event','generate_lead',{form_slug:e.data.form_slug, form_name:e.data.form_name});
            }
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event:'aw_form_submit', form_slug:e.data.form_slug, form_name:e.data.form_name});
          }
        });
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
        fbq('init', '2742460306123259');
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
          alt="Meta Pixel"
          src="https://www.facebook.com/tr?id=1113693993052577&ev=PageView&noscript=1"
        />
      </noscript>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt="Meta Pixel"
          src="https://www.facebook.com/tr?id=2742460306123259&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}
