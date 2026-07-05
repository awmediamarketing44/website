import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "web-design-for-small-businesses-uk";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
