import { NextResponse } from "next/server";
import { analyseImage } from "@/lib/ai-label";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // needs Buffer + zlib for the byte walking

// Free "will this get an AI badge?" checker.
//
// POST multipart/form-data with one or more `files` → returns a per-file,
// per-platform verdict. Deliberately ungated and free: the whole thing is local
// CPU work, no Claude call and no third-party API, so it costs nothing per run.
//
// PRIVACY: files are parsed in memory and discarded. Nothing is written to
// disk, logged, or forwarded anywhere. The page says so, so keep it true.

const MAX_FILES = 10;
const MAX_FILE_BYTES = 40 * 1024 * 1024; // a phone photo can easily be 25MB+
const MAX_TOTAL_BYTES = 100 * 1024 * 1024;

// EXIF, XMP and the C2PA box all sit at the FRONT of a JPEG/PNG/WebP, before
// the image data. So we only ever need to parse the head, which keeps a 40MB
// photo as cheap to check as a 200KB one.
const HEAD_BYTES = 8 * 1024 * 1024;

// Crude per-IP limiter. Single PM2 process, so a module-level Map is fine and
// avoids standing up Redis for a free tool. Resets on deploy, which is fine.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the Map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_MAX;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "That is a lot of checks in one go. Give it a minute and try again." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);

  // The client uploads only the head of each file (metadata lives at the front),
  // so it sends the real sizes alongside for display. Absent when something POSTs
  // here directly, in which case the uploaded length is the real length.
  const trueSizes = form.getAll("sizes").map((s) => Number(s));

  if (!files.length) {
    return NextResponse.json({ error: "Pick at least one image." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Up to ${MAX_FILES} images at a time.` },
      { status: 400 },
    );
  }

  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Those files are too big altogether. Try fewer at once." },
      { status: 413 },
    );
  }

  const results = [];
  for (const [i, file] of files.entries()) {
    const name = file.name || "image";
    const realSize =
      Number.isFinite(trueSizes[i]) && trueSizes[i] > 0 ? trueSizes[i] : file.size;

    if (realSize > MAX_FILE_BYTES) {
      results.push({
        ok: false as const,
        filename: name,
        error: "That file is too big to check (40MB limit).",
      });
      continue;
    }

    try {
      const head = file.size > HEAD_BYTES ? file.slice(0, HEAD_BYTES) : file;
      const bytes = Buffer.from(await head.arrayBuffer());
      const result = analyseImage(bytes, name);
      // Report the real file size, not the size of the head we parsed.
      if (result.ok) result.sizeKb = Math.round(realSize / 1024);
      results.push(result);
    } catch (err) {
      console.error("ai-label-check: failed to parse", name, err);
      results.push({
        ok: false as const,
        filename: name,
        error: "Could not read that file.",
      });
    }
  }

  return NextResponse.json({ results });
}
