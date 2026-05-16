"use client";

import { useEffect, useRef, useState } from "react";
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
    src: "/images/automobile1.jpg",
    alt: "Classic provenance motorcar",
  },
  "luxury-goods": {
    src: "/images/birkin.webp",
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
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

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
              className="smallcaps text-gold mb-8"
            >
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
            <p className="text-stone text-[1rem] leading-[1.75] italic">
              {t.categories.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile / tablet: swipe carousel ── */}
      <CategoryCarousel
        items={t.categories.items}
        isInView={isInView}
        onCta={scrollToContact}
      />

      {/* ── Desktop: rows + sticky image panel ── */}
      <div className="hidden lg:block inner gutter pb-0">
        <div className="grid grid-cols-12 gap-x-10">

          {/* Left: rows */}
          <div className="col-span-7">
            {t.categories.items.map((item, i) => (
              <CategoryRow
                key={item.id}
                item={item}
                index={i}
                isInView={isInView}
                active={activeId === item.id}
                onEnter={() => setActiveId(item.id)}
                onCta={scrollToContact}
              />
            ))}
            <div className="rule" aria-hidden />
          </div>

          {/* Right: sticky image panel */}
          <div className="col-span-5 col-start-8">
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
                      sizes="42vw"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-28"
                      style={{ background: "linear-gradient(to top, #F5F0E8 0%, transparent 100%)" }}
                      aria-hidden
                    />
                  </motion.div>
                ))}

                <div className="absolute bottom-6 left-5 z-10">
                  {Object.entries(categoryImages).map(([id]) => {
                    const item = t.categories.items.find((c) => c.id === id);
                    return item ? (
                      <motion.p
                        key={id}
                        animate={{ opacity: activeId === id ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-black/50 absolute bottom-0 left-0"
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

      <div className="h-16 md:h-24" />
    </section>
  );
}

/* ─── Mobile / tablet carousel ─────────────────────────────────────── */

function CategoryCarousel({
  items,
  isInView,
  onCta,
}: {
  items: Translations["categories"]["items"];
  isInView: boolean;
  onCta: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoplay = () => {
    setUserPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setUserPaused(false), 7000);
  };

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setCurrent(index);
    pauseAutoplay();
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    if (idx !== current) setCurrent(idx);
  };

  // Auto-advance, paused when section is offscreen or user is interacting
  useEffect(() => {
    if (!isInView || userPaused) return;
    const interval = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      setCurrent((prev) => {
        const next = (prev + 1) % items.length;
        el.scrollTo({ left: next * el.offsetWidth, behavior: "smooth" });
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView, userPaused, items.length]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="lg:hidden"
    >
      {/* Scrollable track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={pauseAutoplay}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {items.map((item, i) => {
          const img = categoryImages[item.id];
          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-full snap-start"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: "62%" }}>
                {img && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(8,8,7,0.72) 0%, transparent 55%)" }}
                  aria-hidden
                />
                <div className="absolute bottom-5 left-6 right-6 z-10">
                  <p className="smallcaps text-white/60 mb-1.5 italic">№ {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display text-white text-[8vw] sm:text-[6vw] leading-none">{item.title}</h3>
                </div>
              </div>

              {/* Card text */}
              <div className="gutter pt-6 pb-8">
                <p className="text-[0.78rem] leading-[1.8] font-body font-light text-stone-light mb-6 max-w-sm">
                  {item.description}
                </p>
                <button
                  onClick={onCta}
                  className="group text-gold flex items-center gap-2"
                >
                  {item.cta}
                  <span
                    className="block h-px bg-gold transition-all duration-400 w-3 group-hover:w-5"
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 pb-2 gutter">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(i)}
            aria-label={`View ${item.title}`}
            className={[
              "rounded-full transition-all duration-300",
              current === i
                ? "w-5 h-1.5 bg-gold"
                : "w-1.5 h-1.5 bg-stone/25 hover:bg-stone/50",
            ].join(" ")}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Desktop category row ──────────────────────────────────────────── */

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
        onClick={onCta}
        onMouseEnter={onEnter}
        onFocus={onEnter}
        className={[
          "group w-full text-left py-7 md:py-8",
          "grid grid-cols-12 gap-x-8 items-center",
          "transition-colors duration-500",
          active ? "bg-black" : "bg-transparent hover:bg-black/[0.03]",
        ].join(" ")}
        aria-label={`${item.cta} — ${item.title}`}
      >
        {/* Index */}
        <div className="col-span-1">
          <span className={["smallcaps italic transition-colors duration-500", active ? "text-gold-light" : "text-border"].join(" ")}>
            № {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-4 flex items-center">
          <h3
            className={[
              "display leading-none transition-colors duration-500 text-[2vw]",
              active ? "text-white" : "text-black",
            ].join(" ")}
          >
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-5">
          <p
            className={[
              "text-[0.74rem] leading-[1.75] font-body font-light max-w-xs transition-colors duration-500",
              active ? "text-white/50" : "text-stone-light",
            ].join(" ")}
          >
            {item.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="col-span-2 flex justify-end items-center">
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            aria-hidden
            className={[
              "transition-all duration-400",
              active ? "text-gold-light translate-x-1" : "text-border",
            ].join(" ")}
          >
            <path d="M0 5h16M12 1l4 4-4 4" />
          </svg>
        </div>
      </button>
    </motion.div>
  );
}
