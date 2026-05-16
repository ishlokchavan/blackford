"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface CategoriesProps {
  t: Translations;
}

const categoryImages: Record<string, { src: string; alt: string }> = {
  "real-estate": {
    src: "/images/realestate.jpg",
    alt: "Luxury villa exterior with pool",
  },
  automobiles: {
    src: "/images/automobile.jpg",
    alt: "Classic provenance motorcar",
  },
  "luxury-goods": {
    src: "/images/bag.jpg",
    alt: "Luxury leather goods",
  },
  timepieces: {
    src: "/images/timepiece.jpg",
    alt: "Fine Swiss timepiece",
  },
};

export function Categories({ t }: CategoriesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [activeId, setActiveId] = useState<string>("real-estate");
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="categories" ref={ref} className="bg-ivory" aria-labelledby="cat-heading">
      <div className="rule" aria-hidden />

      <div className="inner gutter pt-24 md:pt-36 pb-0">
        {/* ── Section header ── */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
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
              className="display text-black text-[9.5vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw]"
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
            className="col-span-12 md:col-span-5 md:col-start-8 flex items-end pb-1"
          >
            <p className="text-stone text-[0.78rem] leading-[1.8] font-body font-light">
              {t.categories.body}
            </p>
          </motion.div>
        </div>

        {/* ── Mobile image panel — shown above rows on small screens ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:hidden relative w-full mb-10 overflow-hidden"
          style={{ paddingBottom: "62%" }}
        >
          {Object.entries(categoryImages).map(([id, img]) => (
            <motion.div
              key={id}
              animate={{ opacity: activeId === id ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 0px"
              />
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 z-10">
                <p className="overline text-white/60">
                  {t.categories.items.find((c) => c.id === id)?.title}
                </p>
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,8,7,0.45) 0%, transparent 50%)" }}
                aria-hidden
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Content: rows + image panel ── */}
      <div className="inner gutter pb-0">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">

          {/* Left: rows */}
          <div className="col-span-12 lg:col-span-7">
            {t.categories.items.map((item, i) => (
              <CategoryRow
                key={item.id}
                item={item}
                index={i}
                isInView={isInView}
                active={activeId === item.id}
                onEnter={() => setActiveId(item.id)}
                onCta={() => scrollTo("contact")}
              />
            ))}
            <div className="rule" aria-hidden />
          </div>

          {/* Right: image panel — desktop only, taller + wider ── */}
          <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
            <div className="sticky top-[12vh] h-[76vh]">
              <div className="relative w-full h-full overflow-hidden">
                {Object.entries(categoryImages).map(([id, img]) => (
                  <motion.div
                    key={id}
                    animate={{ opacity: activeId === id ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 42vw, 0px"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-28"
                      style={{ background: "linear-gradient(to top, #F5F0E8 0%, transparent 100%)" }}
                      aria-hidden
                    />
                  </motion.div>
                ))}

                {/* Category label */}
                <div className="absolute bottom-6 left-5 z-10">
                  {Object.entries(categoryImages).map(([id]) => {
                    const item = t.categories.items.find((c) => c.id === id);
                    return item ? (
                      <motion.p
                        key={id}
                        animate={{ opacity: activeId === id ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="overline text-black/50 absolute bottom-0 left-0"
                      >
                        {item.title}
                      </motion.p>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </section>
  );
}

function CategoryRow({
  item,
  index,
  isInView,
  active,
  onEnter,
  onCta,
}: {
  item: { id: string; title: string; description: string; cta: string };
  index: number;
  isInView: boolean;
  active: boolean;
  onEnter: () => void;
  onCta: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
      className="border-t border-border"
    >
      <button
        onClick={() => { onEnter(); onCta(); }}
        onMouseEnter={onEnter}
        onFocus={onEnter}
        className={[
          "group w-full text-left py-7 md:py-8",
          "grid grid-cols-12 gap-x-4 md:gap-x-8 items-center",
          "transition-colors duration-500",
          active ? "bg-black" : "bg-transparent hover:bg-black/[0.03]",
        ].join(" ")}
        aria-label={`${item.cta} — ${item.title}`}
      >
        {/* Index */}
        <div className="col-span-1 hidden md:block">
          <span
            className={[
              "overline transition-colors duration-500",
              active ? "text-gold/60" : "text-border",
            ].join(" ")}
          >
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-8 md:col-span-4 flex items-center">
          <h3
            className={[
              "display leading-none transition-colors duration-500",
              "text-[7vw] sm:text-[5vw] md:text-[2.4vw] lg:text-[2vw]",
              active ? "text-white" : "text-black",
            ].join(" ")}
          >
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
          <p
            className={[
              "text-[0.74rem] leading-[1.75] font-body font-light max-w-xs transition-colors duration-500",
              active ? "text-white/50" : "text-stone-light",
            ].join(" ")}
          >
            {item.description}
          </p>
        </div>

        {/* CTA arrow */}
        <div className="hidden md:flex col-span-2 justify-end items-center">
          <span
            className={[
              "overline flex items-center gap-2 transition-all duration-500",
              active ? "text-gold-light" : "text-border",
            ].join(" ")}
          >
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              aria-hidden
              className={["transition-transform duration-400", active ? "translate-x-1" : ""].join(" ")}
            >
              <path d="M0 5h16M12 1l4 4-4 4" />
            </svg>
          </span>
        </div>
      </button>
    </motion.div>
  );
}
