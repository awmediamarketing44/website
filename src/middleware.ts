import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 20i's edge runs PageSpeed, which rewrites our HTML (injects data-pagespeed
// attributes) and that mangled markup breaks React hydration (minified error
// #418). PageSpeed is contractually required to skip any response marked
// `Cache-Control: no-transform`, so we stamp it on every HTML document here.
// We also drop the edge's year-long HTML cache (no-cache / must-revalidate) so
// content changes show immediately instead of serving stale rewritten copies.
// Hashed static assets (/_next/static, images) are excluded and keep their
// long immutable cache.
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  const isAssetOrApi =
    pathname.startsWith("/api") || /\.[a-zA-Z0-9]+$/.test(pathname);
  if (!isAssetOrApi) {
    res.headers.set(
      "Cache-Control",
      "no-transform, no-cache, max-age=0, must-revalidate"
    );
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
