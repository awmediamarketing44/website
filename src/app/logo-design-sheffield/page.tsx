import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "logo-design-sheffield";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
