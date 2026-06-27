import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "seo-agency-barnsley";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
