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
    <section
      id="contact"
      ref={sectionRef}
      className="bg-black"
      aria-labelledby="contact-heading"
    >
      <div className="inner gutter py-28 md:py-44">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">

          {/* Left */}
          <div className="col-span-12 md:col-span-5 mb-16 md:mb-0 flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="overline text-gold/80 flex items-center gap-3 mb-8"
            >
              <span className="w-5 h-px bg-gold/50" aria-hidden />
              {t.contact.eyebrow}
            </motion.p>

            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="display text-ivory text-[10vw] sm:text-[7vw] md:text-[4.8vw] lg:text-[3.8vw] mb-8"
            >
              {t.contact.headline.split("\n").map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-stone-light text-[0.78rem] leading-[1.75] font-body font-light max-w-[280px]"
            >
              {t.contact.body}
            </motion.p>

            {/* Discreet address block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-auto pt-16 hidden md:block"
            >
              <div className="h-px w-10 bg-gold/25 mb-5" />
              <p className="overline text-stone tracking-[0.14em]">enquiries@blackford.com</p>
            </motion.div>
          </div>

          {/* Form */}
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
                <div className="space-y-0">
                  <Field label={f.name} error={errors.name?.message}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder=" "
                      className={fieldClass(!!errors.name)}
                      {...register("name")}
                    />
                  </Field>

                  <div className="grid grid-cols-2 divide-x divide-border-dark">
                    <Field label={f.email} error={errors.email?.message} noBottomBorder={false}>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder=" "
                        className={fieldClass(!!errors.email)}
                        {...register("email")}
                      />
                    </Field>
                    <Field label={f.phone}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder=" "
                        className={fieldClass(false)}
                        {...register("phone")}
                      />
                    </Field>
                  </div>

                  <Field label={f.category} error={errors.category?.message}>
                    <div className="relative">
                      <select
                        className={[fieldClass(!!errors.category), "appearance-none cursor-pointer pr-8"].join(" ")}
                        {...register("category")}
                      >
                        {f.categoryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60" aria-hidden>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor"><path d="M0 0l4 5 4-5z" /></svg>
                      </div>
                    </div>
                  </Field>

                  <Field label={f.message} error={errors.message?.message}>
                    <textarea
                      rows={4}
                      placeholder=" "
                      className={[fieldClass(!!errors.message), "resize-none pt-5"].join(" ")}
                      {...register("message")}
                    />
                  </Field>
                </div>

                {/* Error state */}
                {status === "error" && (
                  <p className="mt-4 text-[0.7rem] text-red-400/70 font-body">{f.errorBody}</p>
                )}

                {/* Submit */}
                <div className="border-t border-border-dark pt-6 mt-0">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex items-center gap-4 overline text-ivory/60 hover:text-ivory transition-colors duration-400 disabled:opacity-40"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border border-ivory/30 border-t-transparent animate-spin" aria-hidden />
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        <span className="w-5 h-px bg-current transition-all duration-500 group-hover:w-8" aria-hidden />
                        {f.submit}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* Field wrapper with top-aligned label */
function Field({
  label,
  error,
  children,
  noBottomBorder,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  noBottomBorder?: boolean;
}) {
  return (
    <div
      className={[
        "relative border-t border-border-dark",
        noBottomBorder === false ? "" : "",
      ].join(" ")}
    >
      <label className="absolute top-3 left-4 overline text-stone pointer-events-none z-10">
        {label}
      </label>
      <div className="pt-8 pb-3 px-4">{children}</div>
      {error && (
        <p className="px-4 pb-2 text-[0.68rem] text-red-400/60 font-body">{error}</p>
      )}
    </div>
  );
}

function fieldClass(hasError: boolean): string {
  return [
    "w-full bg-transparent text-ivory text-[0.83rem] font-body font-light",
    "placeholder-transparent focus:outline-none",
    hasError ? "opacity-100" : "",
  ].join(" ");
}

function SuccessState({ t, onReset }: { t: Translations; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-border-dark pt-12 min-h-[360px] flex flex-col justify-center"
    >
      <div className="h-px w-10 bg-gold/40 mb-8" />
      <h3 className="display text-ivory text-3xl md:text-4xl mb-4">
        {t.contact.form.successTitle}
      </h3>
      <p className="text-stone-light text-[0.78rem] leading-[1.75] font-body font-light max-w-xs mb-10">
        {t.contact.form.successBody}
      </p>
      <button
        onClick={onReset}
        className="ink overline text-gold/60 hover:text-gold transition-colors duration-300 self-start"
      >
        Submit another enquiry
      </button>
    </motion.div>
  );
}
