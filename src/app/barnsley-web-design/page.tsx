import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "barnsley-web-design";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
