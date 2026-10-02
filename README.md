# FreshCut Chicken Co.

**Artisanal D2C fresh chicken & meat delivery shop demo** — featuring a live daily rate board, interactive cut explorer, WhatsApp ordering, subscriptions, and a full admin suite.

> *Cut fresh. At your door before the chai gets cold.*

A production-quality front-end demo of a direct-to-consumer butcher shop built for the Indian market (Pune, Maharashtra). All data is mocked in-app — no backend required — making it perfect for client pitches, portfolio showcases, or as a starting point for a real D2C meat delivery product.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Pages / Views](#pages--views)
- [State Management](#state-management)
- [Internationalization (i18n)](#internationalization-i18n)
- [Configuration & Rebranding](#configuration--rebranding)
- [SEO & Metadata](#seo--metadata)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 🛒 Shopping & Ordering
- **Product catalogue** across 6 categories: Chicken, Country Chicken, Mutton, Eggs, Marinated, and Combos
- **Cut explorer** — choose Curry Cut, Biryani Cut, Boneless Cubes, Keema/Mince, Strips, Whole, and more
- **Skin & cleaning options** per product (with skin / skinless, fat trimmed, extra washed)
- **Weight-based pricing** with minimum order weights and per-kg rates
- **Quick View modal** and full product detail pages with nutrition facts, cooking tips, and serving suggestions
- **Cart drawer** with persistent state, plus checkout flow with delivery slots, coupons, and payment method selection (COD / UPI / Card)
- **Order confirmation** and **order tracking** with status timeline (`confirmed → cutting → out_for_delivery → delivered`)

### 📊 Live Daily Rate Board
- Dynamic **today's rate board** section showing per-kg prices updated each morning
- Section deep-linkable from the header, home, and mobile bottom nav

### 🔪 Interactive Cuts Diagram
- SVG **hotspot-based chicken cut diagram** — tap a part to see texture, best-for uses, cooking time, price, and a linked product

### 📱 WhatsApp Ordering
- Floating **WhatsApp CTA** for direct order placement via `wa.me` links
- Order-on-WhatsApp actions on product cards and checkout

### 🔁 Subscriptions & Bulk Orders
- **Sunday Subscription** plans — weekly / bi-weekly recurring deliveries with discounts
- **Bulk & Catering** enquiry view for events, restaurants, and societies

### 👨‍ Admin Suite (Demo)
- Interactive **demo admin panel** reachable from the demo ribbon — manage products, view orders, rates, coupons, and subscriptions

### 🌍 Localization
- Trilingual UI: **English**, **Marathi (मराठी)**, **Hindi (हिंदी)**
- Product names, descriptions, badges, and UI chrome all switch with the selected language

### 📍 Serviceability
- **Pincode checker modal** with serviceable area list, delivery ETAs, and express-delivery availability
- Free delivery above ₹499, standard ₹30, express ₹49 — all configurable

### 🎨 Design System
- Warm butcher-paper palette (`#FBF6EE` background, `#C8262B` brand red, `#1B1512` ink)
- Typography: **Fraunces** (display), **DM Sans** (UI), **Noto Sans Devanagari** (Marathi/Hindi)
- Custom UI primitives: `Button`, `Badge`, `Marquee`, `Stamp`, `TornDivider`
- Motion animations, torn-paper dividers, stamps, and marquee strips for an artisanal feel
- Fully responsive with mobile bottom navigation

### 🔍 SEO & PWA-ready
- Rich **JSON-LD** `ButcherShop` structured data (address, hours, telephone, price range)
- Open Graph + Twitter Card meta tags
- `robots.txt`, `sitemap.xml`, and web `manifest.json` included

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Build Tool | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (via `@tailwindcss/vite`) |
| State | [Zustand 5](https://github.com/pmndrs/zustand) |
| Animations | [Motion (Framer Motion successor)](https://motion.dev) |
| Charts | [Recharts](https://recharts.org) (admin dashboards) |
| Icons | [lucide-react](https://lucide.dev) |
| Effects | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| AI (optional) | [@google/genai](https://ai.google.dev) |
| Server (optional) | Express |
| Package Manager | npm (bun.lock also present) |

---

## Project Structure

```
freshcut-chicken-co/
├── public/
│   ├── icon.svg              # App icon
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # Crawler rules
│   └── sitemap.xml           # Sitemap
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, AnnouncementBar, DemoRibbon,
│   │   │                     # MobileBottomNav, FloatingWhatsApp, PincodeModal
│   │   ├── shop/             # CartDrawer, ProductCard, QuickViewModal,
│   │   │                     # RateBoard, CutsDiagramHotspots
│   │   └── ui/               # Button, Badge, Marquee, Stamp, TornDivider
│   ├── config/
│   │   ├── shop.ts           # ★ Brand/business config (rebrand here)
│   │   └── images.ts         # Product image URL map
│   ├── data/
│   │   └── mockData.ts       # Products, recipes, orders, reviews, coupons, FAQs
│   ├── i18n/
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts   # en / mr / hi strings
│   ├── store/                # Zustand stores
│   │   ├── useCartStore.ts
│   │   ├── useOrdersStore.ts
│   │   ├── usePincodeStore.ts
│   │   ├── useRatesStore.ts
│   │   └── useSubscriptionStore.ts
│   ├── views/                # One file per route/view (13 views)
│   ├── App.tsx               # View-based router + global chrome
│   ├── main.tsx              # Entry point
│   ├── types.ts              # Shared domain types
│   └── index.css             # Tailwind + theme styles
├── index.html                # HTML shell, fonts, JSON-LD, meta
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** (or bun / yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/freshcut-chicken-co.git
cd freshcut-chicken-co

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and set your GEMINI_API_KEY (see below)

# 4. Start the dev server
npm run dev
```

The app runs at **http://localhost:3000** by default.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Optional* | Gemini API key for AI features (`@google/genai`). The demo core runs fully without it. |
| `APP_URL` | Optional | Public URL of the deployed app (self-referential links, callbacks). |

\* AI Studio injects these automatically at runtime; locally you can leave them as placeholders for pure front-end demo use.

> **Note:** `.env*` files are git-ignored (only `.env.example` is committed). Never commit real secrets.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port **3000** (host `0.0.0.0`) |
| `npm run build` | Type-check and build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript compiler check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## Pages / Views

Routing is handled by a lightweight view-state router in `src/App.tsx` (no react-router dependency).

| View key | Route context | Description |
|---|---|---|
| `home` | `/` | Hero, bestsellers, live rate board, trust signals, testimonials |
| `shop` | Shop grid | Filterable product catalogue by category |
| `product` | Product detail | Full product page with cuts, skin options, weight, nutrition |
| `cuts` | Cuts guide | Interactive SVG chicken cut diagram with hotspots |
| `subscribe` | Subscription | Sunday subscription plan builder |
| `bulk` | Bulk orders | Catering / bulk enquiry page |
| `recipes` | Recipes | Recipe library with ingredients linked to products |
| `about` | Our story | Brand story page |
| `contact` | Store & contact | Address, hours, map, contact form |
| `checkout` | Checkout | Address, delivery slot, coupon, payment method |
| `confirmation` | Order confirmation | Order summary with confetti celebration |
| `track` | Track order | Order status timeline |
| `admin` | Demo admin | Admin dashboard (products, orders, rates, coupons) |

Global overlays: **Cart Drawer**, **Quick View Modal**, **Pincode Modal**, **Floating WhatsApp**, **Mobile Bottom Nav**, **Demo Ribbon**.

---

## State Management

Zustand stores in `src/store/`:

| Store | Responsibility |
|---|---|
| `useCartStore` | Cart items, add/remove/update weight & cut, totals |
| `useOrdersStore` | Placed orders, status transitions, lookup by ID |
| `usePincodeStore` | Selected pincode, serviceability check, modal open state |
| `useRatesStore` | Daily rate board data and refresh state |
| `useSubscriptionStore` | Subscription plans and active subscriptions |

All stores are client-side and persist for the session (no backend).

---

## Internationalization (i18n)

- `LanguageProvider` wraps the app (`src/i18n/LanguageContext.tsx`)
- All UI strings live in `src/i18n/translations.ts` under `en`, `mr`, `hi`
- Products carry `nameEn` / `nameMr` / `nameHi` and `descriptionEn` / `descriptionMr` fields
- Language switcher is available in the header

---

## Configuration & Rebranding

Everything brand-specific is centralized — rebranding for a client takes minutes:

1. **`src/config/shop.ts`** — shop name, tagline, phone, WhatsApp number, email, address, opening hours, currency, FSSAI number, delivery fees, free-delivery threshold, categories, languages, serviceable pincodes, delivery areas, socials
2. **`src/config/images.ts`** — product image URLs
3. **`src/data/mockData.ts`** — products, recipes, reviews, coupons, FAQs, delivery slots, orders
4. **`index.html`** — title, meta description, OG tags, JSON-LD structured data, theme color, fonts
5. **`public/manifest.json`** — PWA name, colors, icon

---

## SEO & Metadata

- `index.html` ships with title, description, Open Graph, Twitter Card, theme color, and Google Fonts preconnect
- JSON-LD **`ButcherShop`** schema for local-business rich results
- `public/robots.txt` + `public/sitemap.xml` ready for crawl
- Semantic HTML, alt text, and accessible labels throughout components

---

## Deployment

Any static host works — the build output is a plain SPA in `dist/`.

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

**Cloudflare Pages / GitHub Pages / AWS S3** — build command `npm run build`, output directory `dist`.

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please run `npm run lint` before submitting.

---

## License

This project is a **demo / sample application** provided for evaluation and educational purposes. All product data, prices, FSSAI numbers, addresses, and contact details are fictitious placeholders.

---

<div align="center">
  <strong>FreshCut Chicken Co.</strong> · Built with React, Vite & Tailwind CSS<br><br>
  Built by <strong><a href="https://github.com/girishlade111">Girish Lade</a></strong> · Part of the <a href="https://ladestack.in">LadeStack</a> open-source collection.
</div>
