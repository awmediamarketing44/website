import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "branding-agency-rotherham";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
