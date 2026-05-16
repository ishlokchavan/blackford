# Blackford — Private Acquisitions Platform

A luxury private transaction and acquisition platform. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

---

## Stack

- **Framework**: Next.js 15+ App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion (minimal, tasteful)
- **Forms**: React Hook Form + Zod validation
- **Email**: Brevo Transactional API (server-side)
- **Fonts**: Cormorant (serif display) + Inter (sans-serif body) via Google Fonts

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Brevo](https://brevo.com) account with a verified sender address

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|---|---|
| `BREVO_API_KEY` | Your Brevo transactional email API key |
| `EMAIL_SENDER_NAME` | Sender display name (e.g. `"Blackford"`) |
| `EMAIL_SENDER_ADDRESS` | Verified sender email in Brevo |
| `EMAIL_ADMIN_ADDRESS` | Email address to receive enquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | Production site URL (for metadata and OG tags) |

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/          # Contact form API route (Brevo integration)
│   ├── globals.css            # Design system tokens + base styles
│   ├── layout.tsx             # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx               # Main single-page entry
│   ├── robots.ts              # robots.txt generation
│   └── sitemap.ts             # sitemap.xml generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Sticky nav with language selector
│   │   └── Footer.tsx         # Minimal luxury footer
│   ├── sections/
│   │   ├── Hero.tsx           # Full-screen cinematic hero
│   │   ├── Categories.tsx     # 4-category acquisition grid
│   │   └── Contact.tsx        # Contact form with Brevo submission
│   └── ui/
│       └── Button.tsx         # Shared luxury button primitive
├── hooks/
│   └── useLocale.ts           # Locale state + RTL handling
├── lib/
│   ├── email/brevo.ts         # Brevo API abstraction + email templates
│   └── i18n/
│       ├── config.ts          # Locale config + translation loader
│       └── translations/      # en, ar, ru, zh
└── types/index.ts             # Shared TypeScript types
```

---

## Internationalisation

The platform supports English, Arabic (RTL), Russian, and Chinese via a client-side locale hook. Switching language updates all copy, `document.lang`, and `document.dir`. The architecture is ready for server-side i18n routing when full URL-based localisation is required.

---

## Email Integration

The contact form submits to `/api/contact`, which:

1. Validates input with Zod
2. Sends a confirmation email to the enquirer via Brevo
3. Sends an admin notification email with full details

All email HTML is hand-crafted and styled to match brand guidelines.

---

## Extending the Platform

The architecture is designed to scale into:

- **Supabase**: Store enquiries in the DB alongside email sends
- **Authentication**: Clerk or Supabase Auth
- **Admin Dashboard**: `/admin` route group with protected layouts
- **Auction Engine**: Real-time bidding via Supabase Realtime
- **Inventory Listings**: `/acquisitions` routes with category filtering
- **Private Deal Rooms**: Invite-only `/deals/[id]` routes

---

## Deployment

```bash
npm run build
npm run start
```

Ensure environment variables are configured in your deployment platform before going live.

---

## Brand Notes

**Blackford** is positioned as a discreet, invitation-only private transaction house. Design decisions reflect Sotheby's/Christie's editorial restraint: Cormorant Garamond display type, warm ivory/black/muted gold palette, and minimal purposeful motion.
