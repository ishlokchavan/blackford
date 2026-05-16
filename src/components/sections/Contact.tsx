"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Translations } from "@/lib/i18n/translations/en";
import type { FormStatus } from "@/types";

interface ContactProps {
  t: Translations;
}

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Please provide more detail"),
});

type FormValues = z.infer<typeof schema>;

/* ─── consistent dark-on-black values ─── */
const LABEL = "smallcaps text-white/45";
const INPUT = "w-full bg-transparent text-white text-[0.83rem] font-body font-light focus:outline-none placeholder-white/20";
const DIVIDER = "border-t border-white/10";

export function Contact({ t }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const f = t.contact.form;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-black" aria-labelledby="contact-heading">
      <div className="inner gutter py-28 md:py-44">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">

          {/* ── Left column ── */}
          <div className="col-span-12 md:col-span-5 mb-16 md:mb-0 flex flex-col">

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="smallcaps text-gold-light/80 mb-8"
            >
              {t.contact.eyebrow}
            </motion.p>

            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="display text-white text-[10vw] sm:text-[7vw] md:text-[4.8vw] lg:text-[3.8vw] mb-8"
            >
              {t.contact.headline.split("\n").map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/65 text-[0.95rem] leading-[1.7] italic max-w-[300px]"
            >
              {t.contact.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-auto pt-16 hidden md:block"
            >
              <div className="h-px w-10 bg-gold/20 mb-5" />
              <p className="text-white/30">enquiries@blackford.com</p>
            </motion.div>

          </div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            {status === "success" ? (
              <SuccessState t={t} onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Name */}
                <FormRow label={f.name} error={errors.name?.message}>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={INPUT}
                    {...register("name")}
                  />
                </FormRow>

                {/* Email + Phone */}
                <div className={`grid grid-cols-2 ${DIVIDER}`}>
                  <FormRow label={f.email} error={errors.email?.message} noBorder>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="email@example.com"
                      className={INPUT}
                      {...register("email")}
                    />
                  </FormRow>
                  <div className="border-l border-white/10">
                    <FormRow label={f.phone} noBorder>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+44 ..."
                        className={INPUT}
                        {...register("phone")}
                      />
                    </FormRow>
                  </div>
                </div>

                {/* Category */}
                <FormRow label={f.category} error={errors.category?.message}>
                  <div className="relative">
                    <select
                      className={[INPUT, "appearance-none cursor-pointer pr-6"].join(" ")}
                      {...register("category")}
                    >
                      {f.categoryOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === ""}
                          className="bg-black text-white"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" aria-hidden>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor"><path d="M0 0l4 5 4-5z" /></svg>
                    </div>
                  </div>
                </FormRow>

                {/* Message */}
                <FormRow label={f.message} error={errors.message?.message}>
                  <textarea
                    rows={4}
                    placeholder="Please describe your interest or requirement."
                    className={[INPUT, "resize-none"].join(" ")}
                    {...register("message")}
                  />
                </FormRow>

                {/* Error banner */}
                {status === "error" && (
                  <p className="py-3 text-red-400/70">{f.errorBody}</p>
                )}

                {/* Submit */}
                <div className={`${DIVIDER} pt-6 flex items-end justify-between gap-6 flex-wrap`}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-400 disabled:opacity-30 focus-visible:outline-none focus-visible:text-white"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border border-white/30 border-t-transparent animate-spin" aria-hidden />
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        <span className="w-5 h-px bg-current transition-all duration-500 group-hover:w-8" aria-hidden />
                        {f.submit}
                      </>
                    )}
                  </button>
                  <p className="text-[0.8rem] font-body text-white/40 italic leading-snug">
                    {f.minimumNote}
                  </p>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function FormRow({
  label,
  error,
  children,
  noBorder,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div className={noBorder ? "" : DIVIDER}>
      <div className="px-0 pt-3 pb-3">
        <p className={`${LABEL} mb-2`}>{label}</p>
        {children}
        {error && <p className="mt-1.5 text-[0.67rem] text-red-400/60 font-body">{error}</p>}
      </div>
    </div>
  );
}

function SuccessState({ t, onReset }: { t: Translations; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${DIVIDER} pt-12 min-h-[360px] flex flex-col justify-center`}
    >
      <div className="h-px w-10 bg-gold/30 mb-8" />
      <h3 className="display text-white text-3xl md:text-4xl mb-4">
        {t.contact.form.successTitle}
      </h3>
      <p className="text-white/40 text-[0.78rem] leading-[1.8] font-body font-light max-w-xs mb-10">
        {t.contact.form.successBody}
      </p>
      <button
        onClick={onReset}
        className="ink text-gold/60 hover:text-gold-light transition-colors duration-300 self-start"
      >
        Submit another enquiry
      </button>
    </motion.div>
  );
}
