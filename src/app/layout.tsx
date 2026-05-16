import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackford.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Blackford — Private Acquisitions",
    template: "%s — Blackford",
  },
  description:
    "Blackford facilitates private transactions in real estate, motorcars, timepieces, and luxury goods. By invitation and application only.",
  keywords: [
    "private acquisitions",
    "luxury transactions",
    "private real estate",
    "collector cars",
    "rare timepieces",
    "luxury goods",
    "private auction",
    "Blackford",
  ],
  authors: [{ name: "Blackford" }],
  creator: "Blackford",
  publisher: "Blackford",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Blackford",
    title: "Blackford — Private Acquisitions",
    description:
      "Private transactions in real estate, motorcars, timepieces, and luxury goods. By invitation and application only.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blackford — Private Acquisitions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blackford — Private Acquisitions",
    description:
      "Private transactions in real estate, motorcars, timepieces, and luxury goods. By invitation and application only.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blackford",
  description:
    "Blackford facilitates private transactions in real estate, motorcars, timepieces, and luxury goods.",
  url: siteUrl,
  logo: `${siteUrl}/og-image.jpg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic", "Russian", "Chinese"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-ivory text-charcoal">
        {children}
      </body>
    </html>
  );
}
