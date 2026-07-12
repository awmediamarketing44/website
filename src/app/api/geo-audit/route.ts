import { NextResponse } from "next/server";
import { runGeoAudit } from "./analysis";

export const dynamic = "force-dynamic";

// Free GEO audit endpoint. POST { url } → runs the GEO checks and returns the
// scored report. The Client then shows a Name + Email gate before revealing the
// full results and POSTs to /api/geo-audit/lead. Mirrors /api/website-audit.

// Validate + normalise the URL, and refuse anything pointing at internal hosts
// (basic SSRF guard, since we fetch the URL server-side).
function sanitizeUrl(raw: unknown): string | null {
  if (!raw || typeof raw !== "string") return null;
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!host.includes(".")) return null;
    const blockedHost =
      host === "localhost" ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host === "0.0.0.0" ||
      host === "::1" ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);
    if (blockedHost) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const url = sanitizeUrl(body.url);
  if (!url) {
    return NextResponse.json(
      { error: "Please enter a valid website address." },
      { status: 400 },
    );
  }

  try {
    const result = await runGeoAudit(url);
    return NextResponse.json(result);
  } catch (err) {
    console.error("GEO audit failed:", err);
    return NextResponse.json(
      { error: "We couldn't reach that site. Check the address and try again." },
      { status: 502 },
    );
  }
}
