"use client";

import { motion } from "motion/react";

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
    <path d="M17.55 11.13c-.09-.04-.18-.08-.27-.12-.16-2.92-1.74-4.59-4.4-4.61h-.04c-1.59 0-2.91.68-3.73 1.92l1.46.99c.61-.92 1.57-1.12 2.27-1.12h.03c.88.01 1.54.27 1.97.76.31.36.52.86.62 1.49-.78-.13-1.62-.17-2.52-.12-2.54.14-4.17 1.62-4.06 3.68.06 1.04.58 1.94 1.46 2.53.75.5 1.71.74 2.71.68 1.33-.07 2.37-.58 3.1-1.51.55-.7.9-1.62 1.06-2.78.65.4 1.13.91 1.4 1.53.45 1.06.48 2.81-.95 4.23-1.25 1.25-2.75 1.79-5.01 1.81-2.51-.02-4.41-.82-5.65-2.39-1.16-1.47-1.76-3.6-1.78-6.32.02-2.72.62-4.84 1.78-6.31C5.99 4 7.89 3.2 10.4 3.18c2.53.02 4.46.83 5.74 2.4.63.77 1.1 1.74 1.41 2.87l1.71-.46c-.38-1.4-.97-2.6-1.78-3.59C15.86 2.4 13.5 1.4 10.41 1.38h-.01c-3.08.02-5.41 1.02-6.92 2.97C2.04 6.13 1.34 8.6 1.32 11.7v.02c.02 3.1.72 5.57 2.16 7.35 1.51 1.95 3.84 2.95 6.92 2.97h.01c2.73-.02 4.66-.74 6.25-2.32 2.08-2.08 2.02-4.69 1.33-6.29-.49-1.16-1.43-2.1-2.71-2.7-.21.59-.55 1.05-1 1.36-.45.32-.99.4-1.62.25-.49-.11-.93-.39-1.21-.78-.43-.6-.39-1.4.09-1.93.37-.42.9-.65 1.51-.65.2 0 .42.02.64.07.4.09.74.31 1.06.59-.04-.6-.14-1.13-.32-1.55-.27-.62-.71-1.06-1.26-1.34l-.01-.01.01.01z"/>
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/awmedia.marketing/", icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/awmedianmarketing", icon: FacebookIcon },
  { name: "Threads", href: "https://www.threads.net/@awmedia.marketing", icon: ThreadsIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alex-whitehead-193549109/", icon: LinkedInIcon },
];

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Locations", href: "/locations" },
    { label: "Contact", href: "/contact" },
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

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-card-border py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo column */}
          <div>
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

        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} AW Media & Marketing Ltd. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
