// Blog post types. Each post is structured as discriminated section blocks
// so the renderer can map each one to the right component.

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; text: string; label?: string; href?: string; linkLabel?: string };

export interface BlogPost {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  featured?: boolean;
  coverImage: string;
  body: BlogSection[];
  metaDescription: string;
  relatedSlugs?: string[];
}
