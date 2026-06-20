import type { Metadata } from "next";
import LocationsIndexClient from "./IndexClient";

export const metadata: Metadata = {
  title: "Locations We Cover | Web Design Agency UK",
  description:
    "Sheffield-based, working UK-wide. Web design, branding and SEO for businesses across Sheffield, Leeds, Manchester, Liverpool, Birmingham, Glasgow and beyond.",
  alternates: { canonical: "/locations" },
};

export default function Page() {
  return <LocationsIndexClient />;
}
