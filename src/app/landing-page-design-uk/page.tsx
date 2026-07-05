import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "landing-page-design-uk";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
