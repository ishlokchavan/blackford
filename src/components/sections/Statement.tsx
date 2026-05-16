"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="bg-charcoal-2 overflow-hidden"
      aria-label="Brand statement"
    >
      <div className="inner gutter py-28 md:py-44">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-center">

          {/* Large italic display quote */}
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="overline text-gold/70 flex items-center gap-3 mb-10"
            >
              <span className="w-5 h-px bg-gold/40 block" aria-hidden />
              Established 2024
            </motion.p>

            <blockquote>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="display-italic text-ivory text-[7.5vw] sm:text-[5.5vw] md:text-[3.8vw] lg:text-[3.2vw] leading-[1.12] mb-12"
              >
                "Every acquisition carries a history. Our responsibility is to ensure
                the next chapter is handled with equal care."
              </motion.p>
            </blockquote>

            {/* Facts strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-x-10 gap-y-5 border-t border-border-dark pt-8"
            >
              {[
                { value: "12", label: "Primary markets" },
                { value: "4", label: "Asset categories" },
                { value: "100%", label: "Private transactions" },
                { value: "24 h", label: "Response guarantee" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="display text-ivory text-2xl md:text-3xl leading-none">{value}</span>
                  <span className="overline text-stone-light">{label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
