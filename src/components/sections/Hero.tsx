"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Translations } from "@/lib/i18n/translations/en";

interface HeroProps {
  t: Translations;
}

function fadeInUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  };
}

export function Hero({ t }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const headlineLines = t.hero.headline.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Warm light bloom */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 55% at 50% 38%, #3A2A18 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />

      {/* Vertical rules */}
      <div className="absolute left-8 md:left-14 top-0 bottom-0 pointer-events-none" aria-hidden>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{ transformOrigin: "top" }}
          className="w-px h-full bg-gradient-to-b from-transparent via-gold/25 to-transparent"
        />
      </div>
      <div className="absolute right-8 md:right-14 top-0 bottom-0 pointer-events-none" aria-hidden>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{ transformOrigin: "top" }}
          className="w-px h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-start md:items-center"
      >
        {/* Eyebrow */}
        <motion.div
          {...fadeInUp(0.2)}
          className="flex items-center gap-4 mb-10 md:mb-14"
        >
          <div className="h-px w-8 bg-gold/50" aria-hidden />
          <span className="text-[10px] tracking-[0.28em] uppercase font-body font-light text-gold">
            {t.hero.eyebrow}
          </span>
          <div className="h-px w-8 bg-gold/50" aria-hidden />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] xl:text-[6.5vw] font-light text-ivory leading-[0.92] tracking-[-0.03em] mb-10 md:mb-14 text-left md:text-center">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              {...fadeInUp(0.35 + i * 0.12)}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          {...fadeInUp(0.8)}
          className="font-body font-light text-ivory/55 text-sm md:text-base leading-relaxed max-w-[500px] md:max-w-[560px] mb-12 md:mb-16 text-left md:text-center"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeInUp(1.0)}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <button
            onClick={() => handleNavClick("contact")}
            className="inline-flex items-center px-8 py-4 bg-ivory text-black text-[10px] tracking-[0.2em] uppercase font-body font-medium transition-colors duration-400 hover:bg-ivory/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t.hero.cta1}
          </button>

          <button
            onClick={() => handleNavClick("contact")}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-ivory/30 text-ivory/80 text-[10px] tracking-[0.2em] uppercase font-body font-medium transition-all duration-400 hover:border-ivory/60 hover:text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            {t.hero.cta2}
            <span className="block w-5 h-px bg-current transition-all duration-400 group-hover:w-7" aria-hidden />
          </button>
        </motion.div>

        {/* Footnote */}
        <motion.p
          {...fadeInUp(1.2)}
          className="mt-10 text-[10px] tracking-[0.16em] uppercase font-body text-ivory/25"
        >
          {t.hero.footnote}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-ivory/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}
