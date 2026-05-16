"use client";

import { useLocale } from "@/hooks/useLocale";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Featured } from "@/components/sections/Featured";
import { Categories } from "@/components/sections/Categories";
import { Statement } from "@/components/sections/Statement";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} t={t} />
      <main id="main-content" tabIndex={-1}>
        <Hero t={t} />
        <Featured />
        <Categories t={t} />
        <Statement />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
