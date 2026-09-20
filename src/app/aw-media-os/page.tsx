import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "aw-media-os";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
