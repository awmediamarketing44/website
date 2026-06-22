import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "bespoke-wordpress-website";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
