import { ComparisonPage, comparisonMetadata } from "@/components/ComparisonPage";

const SLUG = "wix-vs-professional-web-design";

export const metadata = comparisonMetadata(SLUG);

export default function Page() {
  return <ComparisonPage slug={SLUG} />;
}
