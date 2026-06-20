// Lightweight conversion tracking helper.
// Fires BOTH a GA4 gtag event and a GTM dataLayer push so the conversion is
// catchable whether you build the trigger in GTM or use GA4 directly.
//
// gtag is installed globally by src/components/Analytics.tsx (Google tag
// GT-NSKKQTV); dataLayer is the GTM-WKKHR3V container queue.

type TrackProps = Record<string, string | number | boolean | undefined>;

export function trackLead(formName: string, extra: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  const payload = { form_name: formName, ...extra };

  // GTM dataLayer — build a trigger on event === "form_complete"
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "form_complete", ...payload });

  // GA4 recommended lead event — mark "generate_lead" as a key event in GA4
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", payload);
  }
}
