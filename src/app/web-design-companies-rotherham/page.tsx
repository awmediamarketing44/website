import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "web-design-companies-rotherham";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
