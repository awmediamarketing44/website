import { NextResponse } from "next/server";
import { audits } from "../../_engine";

export const dynamic = "force-dynamic";

// ============================================================
// GET /api/social-audit/status/[id]
// Polling endpoint that replaces the Express tool's SSE + polling-
// fallback flow. Returns per-platform statuses while scanning, and the
// full results payload once the job is complete. The client polls this
// every ~2.5s on the loading screen, then renders results in place.
// ============================================================
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const audit = audits.get(id);

  if (!audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  if (audit.status === "complete") {
    return NextResponse.json({
      status: "complete",
      platformStatuses: audit.platformStatuses,
      results: audit.results,
      metrics: audit.metrics,
      lead: { name: audit.leadData.name },
    });
  }

  return NextResponse.json({
    status: audit.status,
    platformStatuses: audit.platformStatuses,
  });
}
