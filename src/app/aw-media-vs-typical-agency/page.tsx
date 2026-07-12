import { ComparisonPage, comparisonMetadata } from "@/components/ComparisonPage";

const SLUG = "aw-media-vs-typical-agency";

export const metadata = comparisonMetadata(SLUG);

export default function Page() {
  return <ComparisonPage slug={SLUG} />;
}
