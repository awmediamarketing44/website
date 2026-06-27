import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "web-design-companies-chesterfield";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
