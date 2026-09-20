import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "custom-app-development-uk";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
