"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const items = [
  {
    category: "Real Estate",
    title: "Mayfair Residence",
    subtitle: "London W1K — Freehold",
    description:
      "A significant lateral apartment across the principal floor of a Regency townhouse. Five reception rooms, four bedrooms.",
    status: "Private Sale",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Mayfair Regency townhouse residence",
  },
  {
    category: "Timepieces",
    title: "Patek Philippe Ref. 2499",
    subtitle: "Geneva, circa 1953",
    description:
      "A highly important pink gold perpetual calendar chronograph. Fourth series. Single owner since acquisition.",
    status: "By Private Enquiry",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Patek Philippe perpetual calendar chronograph",
  },
  {
    category: "Automobiles",
    title: "1966 Ferrari 275 GTB/4",
    subtitle: "Chassis No. 09437 — Ex-Competition",
    description:
      "One of 330 examples produced. Matching numbers throughout. Documented single-family ownership from new.",
    status: "Private Sale",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    imageAlt: "1966 Ferrari 275 GTB/4 classic motorcar",
  },
];

export function Featured() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <section
      id="featured"
      ref={ref}
      className="bg-ivory"
      aria-labelledby="featured-heading"
    >
      <div className="rule" aria-hidden />

      <div className="inner gutter pt-24 md:pt-36 pb-20 md:pb-28">
        {/* ── Section header ── */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="overline text-gold flex items-center gap-3 mb-6"
          >
            <span className="block w-5 h-px bg-gold/60" aria-hidden />
            Current Opportunities
          </motion.p>
          <motion.h2
            id="featured-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="display text-black text-[9.5vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw] max-w-2xl"
          >
            <span className="block">Selected acquisitions,</span>
            <span className="block display-italic">available now.</span>
          </motion.h2>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {items.map((item, i) => (
            <AcquisitionCard key={item.title} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── Disclaimer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-[0.65rem] font-body text-stone/50 leading-relaxed max-w-xl"
        >
          Items shown are illustrative of acquisition type. Current inventory disclosed to registered clients only.
        </motion.p>
      </div>
    </section>
  );
}

function AcquisitionCard({
  item,
  index,
  isInView,
}: {
  item: (typeof items)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      aria-label={item.title}
    >
      {/* ── Photo ── */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "66%" }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </motion.div>
      </div>

      {/* ── Text block ── */}
      <div className="pt-6">
        {/* Category overline */}
        <p className="overline text-gold mb-3">{item.category}</p>

        {/* Title */}
        <h3 className="display text-black text-[6.5vw] sm:text-[4.5vw] md:text-[2vw] lg:text-[1.6vw] leading-none mb-2">
          {item.title}
        </h3>

        {/* Subtitle */}
        <p className="overline text-stone/60 mb-4">{item.subtitle}</p>

        {/* Description */}
        <p className="text-[0.74rem] font-body font-light text-stone leading-[1.75] mb-5 max-w-xs">
          {item.description}
        </p>

        {/* Status + CTA row */}
        <div className="flex items-center justify-between gap-4">
          <span className="inline-block text-[0.64rem] font-body tracking-[0.12em] uppercase text-gold border border-gold/30 px-3 py-1">
            {item.status}
          </span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="overline text-black/60 hover:text-black transition-colors duration-300 flex items-center gap-2 group"
          >
            Enquire Privately
            <span
              className="block h-px bg-current transition-all duration-500 w-3 group-hover:w-5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
