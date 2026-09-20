import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "booking-system-development-uk";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
