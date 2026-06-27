import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "small-business-web-design-chesterfield";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
