"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface CategoriesProps {
  t: Translations;
}

export function Categories({ t }: CategoriesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="categories"
      ref={ref}
      className="bg-ivory"
      aria-labelledby="cat-heading"
    >
      {/* Top rule */}
      <div className="rule" aria-hidden />

      <div className="inner gutter py-28 md:py-44">

        {/* Header row */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="overline text-gold flex items-center gap-3 mb-8"
            >
              <span className="block w-5 h-px bg-gold/60" aria-hidden />
              {t.categories.eyebrow}
            </motion.p>
            <motion.h2
              id="cat-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="display text-black text-[10vw] sm:text-[7.5vw] md:text-[5.5vw] lg:text-[4.4vw]"
            >
              {t.categories.headline.split("\n").map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-12 md:col-span-4 md:col-start-9 flex items-end"
          >
            <p className="text-stone-light text-[0.78rem] leading-[1.75] font-body font-light">
              {t.categories.body}
            </p>
          </motion.div>
        </div>

        {/* Category rows */}
        <div>
          {t.categories.items.map((item, i) => (
            <CategoryRow
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
              onCta={() => scrollTo("contact")}
            />
          ))}
        </div>

      </div>

      <div className="rule" aria-hidden />
    </section>
  );
}

function CategoryRow({
  item,
  index,
  isInView,
  onCta,
}: {
  item: { id: string; title: string; description: string; cta: string };
  index: number;
  isInView: boolean;
  onCta: () => void;
}) {
  const rowRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
      className="border-t border-border last:border-b"
    >
      <button
        ref={rowRef}
        onClick={onCta}
        className="group w-full text-left py-7 md:py-9 grid grid-cols-12 gap-x-6 md:gap-x-10 items-center transition-colors duration-500 hover:bg-black"
        aria-label={`${item.cta} — ${item.title}`}
      >

        {/* Index */}
        <div className="col-span-1 hidden md:flex items-start">
          <span className="overline text-border group-hover:text-gold/50 transition-colors duration-500">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-8 md:col-span-4 flex items-center gap-5">
          <h3 className="display text-black group-hover:text-ivory text-[7.5vw] sm:text-[5vw] md:text-[2.6vw] lg:text-[2.1vw] xl:text-[1.8vw] transition-colors duration-500 leading-none">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-5 mt-3 md:mt-0">
          <p className="text-stone-light group-hover:text-ivory/50 text-[0.75rem] leading-[1.7] font-body font-light max-w-sm transition-colors duration-500">
            {item.description}
          </p>
        </div>

        {/* CTA arrow */}
        <div className="hidden md:flex col-span-2 justify-end items-center">
          <span className="overline text-border group-hover:text-gold transition-colors duration-500 flex items-center gap-2">
            {item.cta}
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-400"
            >
              <path d="M0 5h12M8 1l4 4-4 4" />
            </svg>
          </span>
        </div>

      </button>
    </motion.div>
  );
}
