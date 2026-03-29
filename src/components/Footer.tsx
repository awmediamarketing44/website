"use client";

import { motion } from "motion/react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
  ],
  Services: [
    { label: "Web Design", href: "/services" },
    { label: "Branding", href: "/services" },
    { label: "SEO & Support", href: "/services" },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo column */}
          <div>
            <span className="text-xl font-bold tracking-tight">
              aw<span className="text-pink">media</span>
            </span>
            <p className="mt-1 text-xs text-muted">marketing ltd</p>
            <p className="mt-4 text-sm text-muted">
              Award-winning web design for fitness professionals.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { name: "Instagram", href: "https://www.instagram.com/awmedia.marketing/", icon: "Ig" },
                { name: "Facebook", href: "https://www.facebook.com/awmedianmarketing", icon: "Fb" },
                { name: "Threads", href: "https://www.threads.net/@awmedia.marketing", icon: "Th" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/alex-whitehead-193549109/", icon: "Li" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-card-border text-muted hover:text-pink hover:border-pink/30 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">
                    {social.icon}
                  </span>
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
