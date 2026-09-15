// Lightweight conversion tracking helper.
// Fires BOTH a GA4 gtag event and a GTM dataLayer push so the conversion is
// catchable whether you build the trigger in GTM or use GA4 directly.
//
// gtag is installed globally by src/components/Analytics.tsx (Google tag
// GT-NSKKQTV); dataLayer is the GTM-WKKHR3V container queue.
//
// META PIXEL: opt-in per call, via opts.meta. This helper is deliberately used
// for tool RUNS as well as real lead captures (geo_audit_run, ai_label_check_run
// and so on), and firing a Meta `Lead` on a tool run would teach the ad account
// that a curious click is a conversion. So the pixel only fires where a caller
// says "this one is genuinely a lead".
//
// What reaches Meta is ONLY content_name/content_category plus whatever the
// caller puts in opts.metaParams. `extra` is NEVER forwarded — it routinely
// carries the visitor's own website URL, and advanced matching / identifying
// data is a separate consent decision that has not been made.

type TrackProps = Record<string, string | number | boolean | undefined>;

interface TrackOpts {
  /** Fire a Meta Pixel `Lead` as well. Only for real, captured leads. */
  meta?: boolean;
  /** Non-identifying qualifiers to send to Meta (e.g. a budget band). */
  metaParams?: TrackProps;
  /** Dedupe id, so a later Conversions API send matches this browser event. */
  eventId?: string;
}

export function trackLead(
  formName: string,
  extra: TrackProps = {},
  opts: TrackOpts = {},
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  const payload = { form_name: formName, ...extra };

  // GTM dataLayer — build a trigger on event === "form_complete"
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "form_complete", ...payload });

  // GA4 recommended lead event — mark "generate_lead" as a key event in GA4
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", payload);
  }

  // Meta Pixel — opt-in only, and never fed anything identifying.
  if (opts.meta && typeof w.fbq === "function") {
    w.fbq(
      "track",
      "Lead",
      {
        content_name: formName,
        content_category: formName,
        ...(opts.metaParams || {}),
      },
      opts.eventId ? { eventID: opts.eventId } : undefined,
    );
  }
}
