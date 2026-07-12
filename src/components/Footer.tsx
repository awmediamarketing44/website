"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const iconClass = "h-4 w-4 fill-current";

const InstagramIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.39 2.13c.66.66 1.34 1.07 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
  </svg>
);

const FacebookIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
);

const ThreadsIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 4.379 3.616 6.499 3.535 9.95l.011 2.099c.081 3.45.772 5.57 2.119 7.117 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.36-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z"/>
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const YouTubeIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>
  </svg>
);

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/awmedia.marketing/", icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/awmedianmarketing", icon: FacebookIcon },
  { name: "Threads", href: "https://www.threads.net/@awmedia.marketing", icon: ThreadsIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alex-whitehead-193549109/", icon: LinkedInIcon },
  { name: "YouTube", href: "https://www.youtube.com/@awmedia.marketing/", icon: YouTubeIcon },
];

// Local + service landing pages. Linked here so they're part of the site's
// internal link graph (sitemap-only orphan pages read as doorways to Google).
const areaLinks = [
  { label: "Web Design Sheffield", href: "/web-design-sheffield" },
  { label: "Web Design Agency Sheffield", href: "/web-design-agency-sheffield" },
  { label: "Ecommerce Web Design Sheffield", href: "/ecommerce-web-design-sheffield" },
  { label: "AI Web Design Sheffield", href: "/ai-web-design-sheffield" },
  { label: "SEO Agency Sheffield", href: "/seo-agency-sheffield" },
  { label: "Local SEO Sheffield", href: "/local-seo-sheffield" },
  { label: "Website Redesign Sheffield", href: "/website-redesign-sheffield" },
  { label: "Logo Design Sheffield", href: "/logo-design-sheffield" },
  { label: "Web Design Rotherham", href: "/web-design-agency-rotherham" },
  { label: "Web Design Barnsley", href: "/web-design-agency-barnsley" },
  { label: "Web Design Chesterfield", href: "/web-design-agency-chesterfield" },
  { label: "AI Web Design", href: "/ai-web-design" },
  { label: "Landing Page Design", href: "/landing-page-design-uk" },
  { label: "Small Business Web Design", href: "/web-design-for-small-businesses-uk" },
];

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Reviews", href: "/reviews" },
    { label: "AI Portal", href: "/portal" },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
  ],
  Compare: [
    { label: "AW Media vs an Agency", href: "/aw-media-vs-typical-agency" },
    { label: "What a Website Costs", href: "/website-cost-uk" },
    { label: "Wix vs a Pro Build", href: "/wix-vs-professional-web-design" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Free GEO Audit", href: "/geo-audit" },
  ],
  Services: [
    { label: "Web Design", href: "/services/web-design" },
    { label: "Branding", href: "/services/branding" },
    { label: "AI Design", href: "/services/ai-design" },
    { label: "SEO & Support", href: "/services/seo-support" },
    { label: "All Services", href: "/services" },
  ],
  Industries: [
    { label: "Fitness & PTs", href: "/industries/fitness" },
    { label: "Construction", href: "/industries/construction" },
    { label: "Dental", href: "/industries/dental" },
    { label: "Photography", href: "/industries/photography" },
    { label: "Aesthetics", href: "/industries/aesthetics" },
    { label: "EV & Automotive", href: "/industries/ev-automotive" },
  ],
  Contact: [
    { label: "Book a Call", href: "/contact" },
    { label: "alex@awmedia.marketing", href: "mailto:alex@awmedia.marketing" },
  ],
};

// Build-time baseline year. Both the server-rendered HTML and the first client
// render use this constant, so hydration text matches (no React #418). After
// mount we swap in the live year — only ever a no-op or a +1 once a year rolls
// over while the tab is open, which the user won't notice.
const BASE_YEAR = 2026;

export default function Footer() {
  const [year, setYear] = useState(BASE_YEAR);
  useEffect(() => {
    const current = new Date().getFullYear();
    if (current !== BASE_YEAR) setYear(current);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-card-border py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10">
          {/* Logo column */}
          <div className="col-span-2 lg:col-span-1">
            <span className="text-xl font-bold tracking-tight">
              aw<span className="text-pink">media</span>
            </span>
            <p className="mt-1 text-xs text-muted">marketing ltd</p>
            <p className="mt-4 text-sm text-muted">
              Award-winning web design. AI-accelerated when speed matters, bespoke when craft does.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-card-border text-muted hover:text-pink hover:border-pink/30 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Areas & specialisms */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <h4 className="text-sm font-semibold mb-4">
            Web design across South Yorkshire &amp; the UK
          </h4>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {areaLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-muted hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {year} AW Media & Marketing Ltd. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-xs text-muted hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/cookie-policy" className="text-xs text-muted hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
