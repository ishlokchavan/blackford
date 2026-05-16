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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.1 }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-ivory/96 backdrop-blur-sm border-b border-border"
          : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="inner gutter">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Blackford"
            className="flex items-baseline gap-3 group"
          >
            <span
              className={[
                "overline tracking-[0.32em] transition-colors duration-500",
                scrolled ? "text-black" : "text-ivory",
              ].join(" ")}
            >
              BLACKFORD
            </span>
            <span
              className={[
                "overline tracking-[0.18em] transition-colors duration-500 opacity-50",
                scrolled ? "text-stone" : "text-ivory",
              ].join(" ")}
            >
              /
            </span>
            <span
              className={[
                "overline tracking-[0.18em] transition-colors duration-500",
                scrolled ? "text-gold" : "text-gold-light",
              ].join(" ")}
            >
              Private Acquisitions
            </span>
          </button>

          {/* Right cluster */}
          <div className="flex items-center gap-7 md:gap-9">

            {/* Anchors — md+ */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Site navigation">
              {[
                { label: t.nav.acquisitions, id: "categories" },
                { label: t.nav.about, id: "contact" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={[
                    "ink overline transition-colors duration-400",
                    scrolled ? "text-stone-light hover:text-black" : "text-ivory/60 hover:text-ivory",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Language */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className={[
                  "overline flex items-center gap-1.5 transition-colors duration-400",
                  scrolled ? "text-stone-light hover:text-black" : "text-ivory/55 hover:text-ivory",
                ].join(" ")}
              >
                {localeLabels[locale]}
                <motion.span
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="block mt-px"
                  aria-hidden
                >
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor">
                    <path d="M0 0l3.5 4L7 0z" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.18 }}
                    role="listbox"
                    className="absolute right-0 top-full mt-2 w-32 bg-ivory border border-border shadow-sm py-1"
                  >
                    {locales.map((l) => (
                      <li key={l} role="option" aria-selected={l === locale}>
                        <button
                          onClick={() => { onLocaleChange(l); setLangOpen(false); }}
                          className={[
                            "w-full text-left px-4 py-2 overline transition-colors duration-200",
                            l === locale
                              ? "text-gold bg-gold-pale"
                              : "text-stone hover:text-black hover:bg-ivory-mid",
                          ].join(" ")}
                        >
                          {localeLabels[l]}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Register — md+ */}
            <button
              onClick={() => scrollTo("contact")}
              className={[
                "hidden md:inline-flex items-center gap-2.5 overline transition-all duration-400",
                scrolled
                  ? "text-black border-b border-black/30 pb-px hover:border-black"
                  : "text-ivory/70 border-b border-ivory/20 pb-px hover:text-ivory hover:border-ivory/50",
              ].join(" ")}
            >
              {t.nav.registerInterest}
              <span className="block w-4 h-px bg-current" aria-hidden />
            </button>

          </div>
        </div>
      </div>
    </motion.header>
  );
}
