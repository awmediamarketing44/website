import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "seo-agency-chesterfield";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
