import { en } from "./translations/en";
import { ar } from "./translations/ar";
import { ru } from "./translations/ru";
import { zh } from "./translations/zh";

export const locales = ["en", "ar", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ru: "Русский",
  zh: "中文",
};

export const translations = { en, ar, ru, zh } as const;

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en;
}

export const defaultLocale: Locale = "en";
