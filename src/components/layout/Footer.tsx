"use client";

import type { Translations } from "@/lib/i18n/translations/en";

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-black border-t border-white/8" role="contentinfo">

      {/* Trust strip */}
      <div className="border-b border-white/8">
        <div className="inner gutter py-5 flex items-center justify-center">
          <p className="text-white/25 text-center">
            Trusted by private families, family offices, and institutional clients across 23 countries.
          </p>
        </div>
      </div>

      <div className="inner gutter py-14 md:py-16">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">

          {/* Brand */}
          <div className="col-span-12 md:col-span-4">
            <p className="display italic text-white text-3xl mb-1">Blackford</p>
            <p className="text-[0.72rem] italic text-gold-light/70 mb-6">Est. MMXXIV · London</p>
            <p className="text-[0.72rem] font-body text-white/30 leading-relaxed max-w-[200px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav className="col-span-6 md:col-span-2 md:col-start-6" aria-label="Footer navigation">
            <p className="smallcaps text-gold/60 mb-5">Navigation</p>
            <ul className="space-y-3.5">
              {[
                { label: t.footer.links.about, id: "categories" },
                { label: t.footer.links.contact, id: "contact" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="ink text-[0.72rem] font-body text-white/35 hover:text-white/65 transition-colors duration-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="javascript:void(0);"
                  className="ink text-[0.72rem] font-body text-white/35 hover:text-white/65 transition-colors duration-300"
                >
                  {t.footer.links.careers}
                </a>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div className="col-span-6 md:col-span-2">
            <p className="smallcaps text-gold/60 mb-5">Connect</p>
            <ul className="space-y-3.5">
              {[
                { label: t.footer.social.instagram, href: "javascript:void(0);" },
                { label: t.footer.social.linkedin, href: "javascript:void(0);" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink text-[0.72rem] font-body text-white/35 hover:text-white/65 transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-12 pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[0.68rem] font-body text-white/22">
            {t.footer.copyright.replace("{year}", String(year))}
          </p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { label: t.footer.legal.privacy, href: "/privacy" },
                { label: t.footer.legal.terms, href: "/terms" },
                { label: t.footer.legal.cookies, href: "/cookies" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.68rem] font-body text-white/18 hover:text-white/40 transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-5 text-[0.62rem] font-body text-white/14 leading-relaxed max-w-lg">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
