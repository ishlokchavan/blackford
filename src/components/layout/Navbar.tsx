"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale, locales, localeLabels } from "@/lib/i18n/config";
import type { Translations } from "@/lib/i18n/translations/en";

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: Translations;
}

export function Navbar({ locale, onLocaleChange, t }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start gap-0.5 focus-visible:outline-none group"
            aria-label="Blackford — return to top"
          >
            <span
              className={[
                "font-display font-light tracking-[0.3em] text-sm uppercase transition-colors duration-300",
                scrolled ? "text-black" : "text-ivory",
              ].join(" ")}
            >
              BLACKFORD
            </span>
            <span
              className={[
                "text-[9px] tracking-[0.2em] uppercase font-body font-light transition-colors duration-300",
                scrolled ? "text-gold" : "text-gold-light",
              ].join(" ")}
            >
              Private Acquisitions
            </span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
              <NavLink
                label={t.nav.acquisitions}
                scrolled={scrolled}
                onClick={() => handleNavClick("categories")}
              />
              <NavLink
                label={t.nav.about}
                scrolled={scrolled}
                onClick={() => handleNavClick("contact")}
              />
            </nav>

            {/* Language selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={`Language: ${localeLabels[locale]}`}
                className={[
                  "flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-body font-medium",
                  "transition-colors duration-300 focus-visible:outline-none",
                  scrolled ? "text-charcoal-light hover:text-black" : "text-ivory/70 hover:text-ivory",
                ].join(" ")}
              >
                <span>{localeLabels[locale]}</span>
                <motion.svg
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M0 0l4 5 4-5z" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-36 bg-ivory border border-border shadow-sm"
                    role="listbox"
                    aria-label="Select language"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        role="option"
                        aria-selected={l === locale}
                        onClick={() => {
                          onLocaleChange(l);
                          setLangOpen(false);
                        }}
                        className={[
                          "w-full text-left px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase font-body",
                          "transition-colors duration-200",
                          l === locale
                            ? "text-gold font-medium bg-gold-pale"
                            : "text-charcoal-light hover:text-black hover:bg-ivory-deep",
                        ].join(" ")}
                      >
                        {localeLabels[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleNavClick("contact")}
              className={[
                "hidden md:inline-flex items-center px-5 py-2.5",
                "text-[10px] tracking-[0.14em] uppercase font-body font-medium",
                "border transition-all duration-300",
                scrolled
                  ? "border-black text-black hover:bg-black hover:text-ivory"
                  : "border-ivory/60 text-ivory hover:border-ivory hover:bg-ivory/10",
              ].join(" ")}
            >
              {t.nav.registerInterest}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({
  label,
  onClick,
  scrolled,
}: {
  label: string;
  onClick: () => void;
  scrolled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "hover-underline text-[11px] tracking-[0.12em] uppercase font-body font-light",
        "transition-colors duration-300 focus-visible:outline-none",
        scrolled ? "text-charcoal-light hover:text-black" : "text-ivory/70 hover:text-ivory",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
