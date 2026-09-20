import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "client-portal-development";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
