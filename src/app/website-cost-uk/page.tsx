import { ComparisonPage, comparisonMetadata } from "@/components/ComparisonPage";

const SLUG = "website-cost-uk";

export const metadata = comparisonMetadata(SLUG);

export default function Page() {
  return <ComparisonPage slug={SLUG} />;
}
