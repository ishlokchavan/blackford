"use client";

import { motion } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-ivory" role="contentinfo">
      <div className="rule-gold" aria-hidden />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="font-display font-light text-xl tracking-[0.2em] uppercase text-ivory">
                BLACKFORD
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase font-body text-gold mt-1">
                Private Acquisitions
              </p>
            </div>
            <p className="font-body font-light text-xs text-ivory/40 leading-relaxed max-w-[220px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <p className="text-[9px] tracking-[0.2em] uppercase font-body text-gold mb-4">
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#categories"
                    className="hover-underline text-xs font-body text-ivory/50 hover:text-ivory transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {t.footer.links.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover-underline text-xs font-body text-ivory/50 hover:text-ivory transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {t.footer.links.contact}
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="hover-underline text-xs font-body text-ivory/50 hover:text-ivory transition-colors duration-300"
                  >
                    {t.footer.links.careers}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social + Legal */}
          <div>
            <p className="text-[9px] tracking-[0.2em] uppercase font-body text-gold mb-4">
              Connect
            </p>
            <ul className="space-y-2.5 mb-8">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline text-xs font-body text-ivory/50 hover:text-ivory transition-colors duration-300"
                  aria-label="Blackford on Instagram"
                >
                  {t.footer.social.instagram}
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline text-xs font-body text-ivory/50 hover:text-ivory transition-colors duration-300"
                  aria-label="Blackford on LinkedIn"
                >
                  {t.footer.social.linkedin}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[10px] font-body text-ivory/25 tracking-wide">
            {t.footer.copyright.replace("{year}", String(year))}
          </p>

          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: t.footer.legal.privacy, href: "/privacy" },
                { label: t.footer.legal.terms, href: "/terms" },
                { label: t.footer.legal.cookies, href: "/cookies" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[10px] font-body text-ivory/25 hover:text-ivory/50 transition-colors duration-300 tracking-wide"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 text-[9px] font-body text-ivory/15 leading-relaxed max-w-lg">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
