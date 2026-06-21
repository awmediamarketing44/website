import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "small-business-web-design-rotherham";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
