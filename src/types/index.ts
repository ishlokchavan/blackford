export type { Locale } from "@/lib/i18n/config";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  cta: string;
}
