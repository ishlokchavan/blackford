"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section ref={ref} className="relative bg-black overflow-hidden" aria-label="Brand statement">

      {/* Background image + overlays */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75"
          alt=""
          fill
          className="object-cover opacity-[0.14] md:opacity-20"
          sizes="100vw"
        />
        {/* Solid dark base for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,5,4,0.92) 0%, rgba(6,5,4,0.78) 45%, rgba(6,5,4,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 inner gutter py-20 md:py-44">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
          <div className="col-span-12 md:col-span-10 md:col-start-2">

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="overline text-gold-light/80 flex items-center gap-3 mb-8 md:mb-10"
            >
              <span className="w-5 h-px bg-gold/50 block" aria-hidden />
              Established 2024
            </motion.p>

            <blockquote>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="display-italic text-white text-[7.5vw] sm:text-[5.5vw] md:text-[3.8vw] lg:text-[3vw] leading-[1.18] md:leading-[1.12] mb-12 md:mb-14"
              >
                &ldquo;The most significant transactions rarely appear on a screen.
                They happen between people who have earned one another&rsquo;s trust.&rdquo;
              </motion.p>
            </blockquote>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-8 border-t border-white/10 pt-8 md:pt-10"
            >
              {[
                { value: "18", label: "Markets served" },
                { value: "4", label: "Asset disciplines" },
                { value: "100%", label: "Off-market transactions" },
                { value: "24 h", label: "Enquiry response" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="display text-white text-3xl md:text-3xl leading-none">{value}</span>
                  <span className="overline text-white/55 leading-snug">{label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
