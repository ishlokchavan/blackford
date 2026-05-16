"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface CategoriesProps {
  t: Translations;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "real-estate": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M3 21V9.5L12 3l9 6.5V21" />
      <path d="M9 21V14h6v7" />
      <path d="M12 3v4" />
    </svg>
  ),
  automobiles: (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M2 11h24M6 11L9 4h10l3 7" />
      <circle cx="7.5" cy="14" r="2.5" />
      <circle cx="20.5" cy="14" r="2.5" />
      <path d="M2 11V13a1 1 0 001 1h1.5M22.5 14H25a1 1 0 001-1v-2" />
    </svg>
  ),
  "luxury-goods": (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M6 8V5.5C6 3.015 8.015 1 10.5 1h1C13.985 1 16 3.015 16 5.5V8" />
      <rect x="1" y="8" width="20" height="15" rx="1" />
      <path d="M1 14h20" />
    </svg>
  ),
  timepieces: (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <rect x="2" y="6" width="16" height="12" rx="8" />
      <path d="M10 10v3l2 1" />
      <path d="M6 2h8M6 22h8" />
    </svg>
  ),
};

export function Categories({ t }: CategoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="bg-ivory relative overflow-hidden"
      aria-labelledby="categories-heading"
    >
      {/* Top rule */}
      <div className="rule-gold" aria-hidden />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-36">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16 mb-20 md:mb-28">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-6 bg-gold" aria-hidden />
              <span className="text-[10px] tracking-[0.24em] uppercase font-body text-gold">
                {t.categories.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              id="categories-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="font-display font-light text-5xl md:text-6xl lg:text-7xl text-black leading-[1.0]"
            >
              {t.categories.headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="font-body font-light text-charcoal-light text-sm leading-relaxed max-w-sm md:max-w-xs lg:max-w-sm md:text-right"
          >
            {t.categories.body}
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {t.categories.items.map((item, i) => (
            <CategoryCard
              key={item.id}
              item={item}
              icon={categoryIcons[item.id]}
              index={i}
              isInView={isInView}
              onCtaClick={() => handleNavClick("contact")}
            />
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="rule-gold" aria-hidden />
    </section>
  );
}

function CategoryCard({
  item,
  icon,
  index,
  isInView,
  onCtaClick,
}: {
  item: { id: string; title: string; description: string; cta: string };
  icon: React.ReactNode;
  index: number;
  isInView: boolean;
  onCtaClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className="group bg-ivory relative overflow-hidden"
    >
      {/* Hover fill — subtle gold tint */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />

      <div className="relative z-10 p-8 md:p-10 flex flex-col min-h-[340px] md:min-h-[400px]">
        {/* Index + icon */}
        <div className="flex items-start justify-between mb-8">
          <span className="font-body text-[10px] tracking-[0.2em] text-gold group-hover:text-gold-light transition-colors duration-500">
            0{index + 1}
          </span>
          <span className="text-charcoal-light group-hover:text-gold-light transition-colors duration-500">
            {icon}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-light text-3xl md:text-4xl text-black group-hover:text-ivory leading-[1.05] mb-5 transition-colors duration-500">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-body font-light text-sm text-charcoal-light group-hover:text-ivory/60 leading-relaxed transition-colors duration-500 flex-1">
          {item.description}
        </p>

        {/* CTA */}
        <button
          onClick={onCtaClick}
          className={[
            "mt-8 self-start flex items-center gap-3 text-[10px] tracking-[0.18em] uppercase font-body font-medium",
            "text-charcoal-light group-hover:text-gold-light transition-colors duration-500",
            "focus-visible:outline-none",
          ].join(" ")}
          aria-label={`${item.cta} — ${item.title}`}
        >
          {item.cta}
          <span className="block w-5 h-px bg-current transition-all duration-400 group-hover:w-8" aria-hidden />
        </button>
      </div>
    </motion.article>
  );
}
