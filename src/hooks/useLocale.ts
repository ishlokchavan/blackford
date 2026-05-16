"use client";

import { useState, useCallback } from "react";
import { type Locale, defaultLocale, getTranslations } from "@/lib/i18n/config";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const t = getTranslations(locale);

  return { locale, setLocale, t };
}
