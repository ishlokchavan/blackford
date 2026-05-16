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

export function Contact({ t }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const f = t.contact.form;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
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

  const inputClass = (hasError: boolean) =>
    [
      "w-full border-b py-3 text-sm font-body text-black placeholder-charcoal-light/50",
      "transition-colors duration-300 focus:outline-none",
      hasError
        ? "border-b-red-400 focus:border-b-red-500"
        : "border-b-border focus:border-b-gold",
    ].join(" ");

  const labelClass = "block text-[10px] tracking-[0.16em] uppercase font-body text-gold mb-1.5";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-charcoal relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32">
          {/* Left: Header */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-6 bg-gold" aria-hidden />
                <span className="text-[10px] tracking-[0.24em] uppercase font-body text-gold">
                  {t.contact.eyebrow}
                </span>
              </motion.div>

              <motion.h2
                id="contact-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="font-display font-light text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.0] mb-8"
              >
                {t.contact.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-body font-light text-sm text-ivory/50 leading-relaxed max-w-sm"
              >
                {t.contact.body}
              </motion.p>
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block mt-16"
              aria-hidden
            >
              <div className="h-px w-24 bg-gold/30 mb-6" />
              <p className="text-[10px] tracking-[0.2em] uppercase font-body text-ivory/20">
                Est. MMXXIV
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {status === "success" ? (
              <SuccessState t={t} onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                {/* Name */}
                <div>
                  <label htmlFor="cf-name" className={labelClass}>
                    {f.name}
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={inputClass(!!errors.name)}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="cf-email" className={labelClass}>
                      {f.email}
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      placeholder="email@example.com"
                      className={inputClass(!!errors.email)}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className={labelClass}>
                      {f.phone}
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+44 20 ..."
                      className={inputClass(false)}
                      {...register("phone")}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="cf-category" className={labelClass}>
                    {f.category}
                  </label>
                  <div className="relative">
                    <select
                      id="cf-category"
                      className={[
                        inputClass(!!errors.category),
                        "appearance-none cursor-pointer pr-8",
                      ].join(" ")}
                      {...register("category")}
                    >
                      {f.categoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold" aria-hidden>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                        <path d="M0 0l5 6 5-6z" />
                      </svg>
                    </div>
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-[11px] text-red-400">{errors.category.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="cf-message" className={labelClass}>
                    {f.message}
                  </label>
                  <textarea
                    id="cf-message"
                    rows={4}
                    placeholder={f.messagePlaceholder}
                    className={[
                      inputClass(!!errors.message),
                      "resize-none border-b-0 border border-border focus:border-gold/60 p-3",
                    ].join(" ")}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="border border-red-400/30 p-4">
                    <p className="text-sm font-body text-red-400">{f.errorBody}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={[
                    "inline-flex items-center gap-3 px-8 py-4",
                    "text-[10px] tracking-[0.2em] uppercase font-body font-medium",
                    "border border-ivory/30 text-ivory",
                    "transition-all duration-400",
                    "hover:border-ivory hover:bg-ivory/5",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
                  ].join(" ")}
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-3 h-3 border border-ivory/50 border-t-transparent rounded-full animate-spin" aria-hidden />
                      {f.submitting}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <span className="block w-5 h-px bg-current" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ t, onReset }: { t: Translations; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center min-h-[400px]"
    >
      <div className="h-px w-12 bg-gold mb-8" aria-hidden />
      <h3 className="font-display font-light text-4xl text-ivory mb-4">
        {t.contact.form.successTitle}
      </h3>
      <p className="font-body font-light text-sm text-ivory/50 leading-relaxed mb-10 max-w-sm">
        {t.contact.form.successBody}
      </p>
      <button
        onClick={onReset}
        className="self-start flex items-center gap-3 text-[10px] tracking-[0.16em] uppercase font-body text-gold hover:text-gold-light transition-colors duration-300 focus-visible:outline-none"
      >
        Submit another enquiry
        <span className="block w-5 h-px bg-current" aria-hidden />
      </button>
    </motion.div>
  );
}
