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
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-black overflow-hidden flex flex-col"
      aria-label="Hero"
    >
      {/* ── Background video ── */}
      <motion.div
        style={{ y: yVideo }}
        aria-hidden
        className="absolute inset-0 scale-[1.08]"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Overlays ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,5,4,0.72) 0%, rgba(6,5,4,0.45) 50%, rgba(6,5,4,0.82) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 0% 55%, rgba(10,8,4,0.65) 0%, transparent 60%)",
        }}
      />

      {/* Film grain */}
      <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none">
        <filter id="g">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>

      {/* Left editorial rule */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ transformOrigin: "top" }}
        className="absolute left-[1.75rem] md:left-[4rem] lg:left-[6rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent"
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        className="relative z-10 flex flex-col flex-1 gutter inner pt-[28vh] md:pt-[24vh] pb-14 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="smallcaps text-gold-light mb-10 md:mb-14"
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* Headline */}
        <h1
          className="display text-white mb-8 md:mb-10"
          aria-label={t.hero.headline.replace(/\n/g, " ")}
        >
          {t.hero.headline.split("\n").map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.65 + i * 0.14,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="block text-[11.5vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.2vw] xl:text-[5.4vw] leading-[0.92]"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Bottom row */}
        <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16 pt-6 border-t border-white/10">
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="text-white/65 text-[0.95rem] leading-[1.75] max-w-sm italic"
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
              className="group inline-flex items-center gap-3 text-white border-b border-white/40 pb-px transition-all duration-400 hover:border-white"
            >
              {t.hero.cta1}
              <span className="block h-px bg-current transition-all duration-500 w-4 group-hover:w-6" aria-hidden />
            </button>
            <span className="text-white/20 select-none">·</span>
            <button
              onClick={() => scrollTo("contact")}
              className="text-white/40 transition-colors duration-400 hover:text-white/80"
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
          className="mt-4 smallcaps text-white/30"
        >
          {t.hero.footnote}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        aria-hidden
        className="absolute bottom-8 right-[1.75rem] md:right-[4rem] flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}

