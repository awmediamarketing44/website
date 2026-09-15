"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { trackLead } from "@/lib/track";

/* ── Types mirroring src/lib/ai-label.ts ── */
type Verdict = "label" | "possible" | "clear";

interface PlatformVerdict {
  key: string;
  platform: string;
  verdict: Verdict;
  because: string;
}

interface Signals {
  iptcSourceType: string | null;
  iptcMeaning: { ai: boolean; plain: string; detail: string } | null;
  iptcIsAi: boolean;
  c2paPresent: boolean;
  c2paGenerator: string | null;
  c2paSourceType: string | null;
  c2paActions: string[];
  c2paIsAi: boolean;
  creatorTool: string | null;
  camera: string | null;
  toolsDetected: string[];
  hasAnyMetadata: boolean;
}

interface FileResult {
  ok: true;
  filename: string;
  format: string;
  sizeKb: number;
  signals: Signals;
  verdicts: PlatformVerdict[];
  flaggedBy: number;
  summary: string;
  stripped: boolean;
}

interface FileError {
  ok: false;
  filename: string;
  error: string;
}

type Result = FileResult | FileError;

const VERDICT_STYLE: Record<Verdict, { dot: string; text: string; label: string }> = {
  label: { dot: "#ff5c7a", text: "text-[#ff5c7a]", label: "Will label" },
  possible: { dot: "#febc2e", text: "text-[#febc2e]", label: "Possible" },
  clear: { dot: "#28c840", text: "text-[#28c840]", label: "Clear" },
};

/** Metadata lives at the front of the file, so this is all we need to upload. */
const HEAD_BYTES = 3 * 1024 * 1024;

const howSteps = [
  {
    number: "1",
    title: "Drop your image in",
    body: "The exact file you are about to post. Not a screenshot of it, and not one you have downloaded back off Instagram, because both of those have had the tags stripped already.",
  },
  {
    number: "2",
    title: "We read the tags",
    body: "We read the Content Credentials and the IPTC tag baked into the file. That is the same data Instagram, LinkedIn and TikTok read when they decide whether to badge your post.",
  },
  {
    number: "3",
    title: "See who flags it, and why",
    body: "Platform by platform, because they do not agree with each other. Plus what actually caused it, in plain English.",
  },
];

function VerdictRow({ v }: { v: PlatformVerdict }) {
  const s = VERDICT_STYLE[v.verdict];
  return (
    <div className="flex items-start gap-3 border-t border-card-border py-3 first:border-t-0">
      <span
        className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full"
        style={{ background: s.dot }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="font-medium">{v.platform}</span>
          <span className={`text-sm font-semibold ${s.text}`}>{s.label}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted">{v.because}</p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-card-border py-2 text-sm first:border-t-0">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium break-all">{value}</span>
    </div>
  );
}

function ResultCard({ r }: { r: Result }) {
  const [open, setOpen] = useState(false);

  if (!r.ok) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <p className="font-medium break-all">{r.filename}</p>
        <p className="mt-1 text-sm text-[#ff5c7a]">{r.error}</p>
      </div>
    );
  }

  const s = r.signals;
  const details: [string, string][] = [];
  if (s.iptcSourceType) details.push(["IPTC tag", s.iptcSourceType]);
  if (s.iptcMeaning) details.push(["Which means", s.iptcMeaning.plain]);
  if (s.c2paPresent) details.push(["Content Credentials", "Present"]);
  if (s.c2paGenerator) details.push(["Written by", s.c2paGenerator]);
  if (s.c2paSourceType) details.push(["Credential says", s.c2paSourceType]);
  if (s.c2paActions.length) details.push(["Recorded actions", s.c2paActions.join(", ")]);
  if (s.creatorTool) details.push(["Creator tool", s.creatorTool]);
  if (s.camera) details.push(["Camera", s.camera]);
  if (s.toolsDetected.length) details.push(["Tools detected", s.toolsDetected.join(", ")]);

  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semibold break-all">{r.filename}</p>
        <p className="text-xs uppercase tracking-widest text-muted">
          {r.format} · {r.sizeKb} KB
        </p>
      </div>

      {r.stripped ? (
        <div className="mt-4 rounded-xl border border-[#febc2e]/40 bg-[#febc2e]/5 p-5">
          <p className="font-semibold text-[#febc2e]">
            Can&apos;t check this one. This is not a pass.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            There is no metadata left in this file at all, so there is nothing for us
            to read and nothing for a platform to read either. That means it has been
            through something that strips tags. A screenshot, a re-save, or a download
            back off a social platform.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-white">To get a real answer:</span> upload
            the original file, straight out of whatever made it. Canva, Photoshop, your
            camera roll, the export your designer sent you. If you only have a screenshot,
            this check cannot tell you anything.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed text-muted">{r.summary}</p>
          <div className="mt-5">
            {r.verdicts.map((v) => (
              <VerdictRow key={v.key} v={v} />
            ))}
          </div>
        </>
      )}

      {details.length > 0 && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-sm font-medium text-pink hover:opacity-80 transition-opacity"
          >
            {open ? "Hide what is in the file" : "What is actually in the file"}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3">
                  {details.map(([k, v]) => (
                    <DetailRow key={k} label={k} value={v} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function AiLabelCheckClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function pick(list: FileList | null) {
    if (!list) return;
    const picked = Array.from(list).slice(0, 10);
    setFiles(picked);
    setResults(null);
    setError("");
  }

  async function run() {
    if (!files.length) {
      setError("Pick an image first.");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);

    try {
      // Only send the HEAD of each file. EXIF, XMP and the C2PA box all sit at
      // the front, before the image data, so a 3MB slice carries everything we
      // read. That keeps a 30MB phone photo under the proxy's body limit, and
      // makes the upload near-instant on mobile. True sizes ride alongside so
      // the result card can still show the real figure.
      const fd = new FormData();
      for (const f of files) {
        const head = f.size > HEAD_BYTES ? f.slice(0, HEAD_BYTES, f.type) : f;
        fd.append("files", head, f.name);
        fd.append("sizes", String(f.size));
      }

      const res = await fetch("/api/ai-label-check", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Check failed.");

      setResults(data.results as Result[]);
      trackLead("ai_label_check_run", { count: files.length });
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // A stripped file is UNREADABLE, not clean. Counting it as "0 flags" and
  // announcing "nothing will trigger a badge" tells people their content is
  // safe when we could not read a single tag. Split the three states out.
  const readable =
    results?.filter((r): r is FileResult => r.ok && !r.stripped) ?? [];
  const strippedCount = results?.filter((r) => r.ok && r.stripped).length ?? 0;
  const flagged = readable.filter((r) => r.flaggedBy > 0).length;

  const headline =
    readable.length === 0
      ? "We could not read these files"
      : flagged === 0
        ? `Nothing to flag in ${readable.length === 1 ? "this one" : `these ${readable.length}`}`
        : `${flagged} of ${readable.length} will get flagged`;

  const subline =
    readable.length === 0
      ? "The tags have been stripped out, so there is nothing left to check. This is almost always a screenshot."
      : strippedCount > 0
        ? `${strippedCount} of the ${results?.length} could not be read, so ${strippedCount === 1 ? "it is" : "they are"} not counted above.`
        : "";

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free AI Label Checker"
          title="Your post is real."
          titleAccent="The AI badge says otherwise."
          description="Platforms decide the badge from tags hidden inside your file, and one AI remove or generative fill stamps that tag across the whole thing. Your carousels, your graphics, your photos. Drop one in and see which platforms will flag it, and why."
        />

        {/* ── Upload ── */}
        <section className="pb-10">
          <div className="mx-auto max-w-2xl px-6">
            {/* Set expectations BEFORE the upload. The instinct is to screenshot
                someone else's post and drop that in, which can never work. */}
            <div className="mb-5 rounded-2xl border border-pink/30 bg-pink/5 p-5">
              <p className="text-sm font-semibold">
                Upload the original file, not a screenshot
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The tags we read live inside the file itself. A screenshot throws every
                one of them away, and so does downloading an image back off Instagram.
                Both come back blank, which tells you nothing.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                That also means you cannot check somebody else&apos;s post. This is a
                pre-flight check on your own work, before it goes out.
              </p>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                pick(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
                dragging ? "border-pink bg-pink/5" : "border-card-border bg-card"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => pick(e.target.files)}
              />
              <p className="font-semibold">
                {files.length
                  ? `${files.length} image${files.length > 1 ? "s" : ""} ready`
                  : "Tap to choose an image"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {files.length
                  ? files.map((f) => f.name).join(", ")
                  : "Or drag it in. JPG, PNG or WebP, up to 10 at once for a whole carousel."}
              </p>
            </div>

            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="mt-4 w-full rounded-full bg-pink px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Checking…" : "Check my image"}
            </button>

            {error && <p className="mt-3 text-sm text-[#ff5c7a]">{error}</p>}

            <p className="mt-4 text-center text-xs leading-relaxed text-muted">
              Your images are read in memory and thrown away immediately. Nothing
              is saved, stored or sent anywhere.
            </p>
          </div>
        </section>

        {/* ── Results ── */}
        {results && (
          <section ref={resultsRef} className="pb-20">
            <div className="mx-auto max-w-3xl px-6">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">{headline}</h2>
                {subline && (
                  <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{subline}</p>
                )}
              </div>

              <div className="space-y-4">
                {results.map((r, i) => (
                  <ResultCard key={`${r.filename}-${i}`} r={r} />
                ))}
              </div>

              {/* Honest caveat. This matters more than the result. */}
              <div className="mt-8 rounded-2xl border border-card-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted">
                  Worth knowing
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  This reads the tags inside the file, which is how the automatic
                  labelling works. Platforms also run their own detection on top,
                  and we cannot see that, so a clear result here is not a promise.
                  If your content genuinely is AI, label it yourself. Getting
                  caught not declaring it costs you far more than the badge does.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <p className="text-lg font-semibold">
                  Want content that never has this problem?
                </p>
                <p className="mx-auto mt-1 max-w-lg text-sm text-muted">
                  We design social content for businesses every week, properly, so
                  you are not guessing what a platform is about to do to your post.
                </p>
                <div className="mt-5 flex justify-center">
                  <BookCallButton>Book a free call</BookCallButton>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── How it works ── */}
        {!results && !loading && (
          <section className="pb-24">
            <div className="mx-auto max-w-5xl px-6">
              <div className="grid gap-6 sm:grid-cols-3">
                {howSteps.map((s) => (
                  <div
                    key={s.number}
                    className="rounded-2xl border border-card-border bg-card p-7"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink/10 font-bold text-pink">
                      {s.number}
                    </span>
                    <h3 className="mt-4 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-card-border bg-card p-7">
                <h3 className="font-semibold">
                  Why one post gets badged and the next one does not
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The platforms do not read the same thing. Instagram reads one
                  tag, LinkedIn and TikTok read a different one, and plenty of
                  files only carry one of the two. So the identical image can be
                  badged in one place and completely clean in another. That is not
                  you doing something wrong, it is the platforms disagreeing.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
