import { SeoLandingPage, landingMetadata } from "@/components/SeoLandingPage";

const SLUG = "access-database-replacement";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  return <SeoLandingPage slug={SLUG} />;
}
