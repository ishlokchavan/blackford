"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-black overflow-hidden flex flex-col"
      aria-label="Hero"
    >

      {/* ── Atmospheric layer ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 20% 60%, rgba(44,32,14,0.55) 0%, transparent 65%), " +
            "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(30,24,14,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Fine film grain */}
      <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Left editorial rule */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ transformOrigin: "top" }}
        className="absolute left-[1.75rem] md:left-[4rem] lg:left-[6rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent"
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        className="relative z-10 flex flex-col flex-1 gutter inner pt-[30vh] md:pt-[26vh] pb-16 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="overline text-gold mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="block w-5 h-px bg-gold/60" aria-hidden />
          {t.hero.eyebrow}
        </motion.p>

        {/* Headline — editorial left block */}
        <h1 className="display text-ivory mb-8 md:mb-10 max-w-4xl" aria-label={t.hero.headline.replace(/\n/g, " ")}>
          {t.hero.headline.split("\n").map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.65 + i * 0.14,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="block text-[12.5vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[6.8vw] xl:text-[5.8vw] leading-[0.9]"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Body + CTAs — bottom row, two columns */}
        <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16 pt-6 border-t border-ivory/10">

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="text-ivory/45 text-[0.78rem] leading-[1.75] max-w-xs font-body font-light"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center gap-6 flex-shrink-0"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-3 overline text-ivory border-b border-ivory/30 pb-px transition-all duration-400 hover:border-ivory/70"
            >
              {t.hero.cta1}
              <span className="block h-px bg-current transition-all duration-500 w-4 group-hover:w-6" aria-hidden />
            </button>
            <span className="text-ivory/15 overline">·</span>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-3 overline text-ivory/40 transition-colors duration-400 hover:text-ivory"
            >
              {t.hero.cta2}
            </button>
          </motion.div>

        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-5 overline text-ivory/18"
        >
          {t.hero.footnote}
        </motion.p>

      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden
        className="absolute bottom-8 right-[1.75rem] md:right-[4rem] flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-ivory/25 to-transparent"
        />
      </motion.div>

    </section>
  );
}
