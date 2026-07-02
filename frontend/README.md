# Frontend — Festow

Next.js application for Festow, the cross-border gifting platform. It is a thin client over the NestJS API: browse the gift catalog, send a gift, track sent and received gifts, redeem received gifts, and manage a wishlist.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react icons

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see `../backend/README.md`)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Set the API URL (optional, defaults to `http://localhost:3001`) in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Data flow

The app talks to the backend through a small typed client layer in `src/lib`:

```
page / component
      │  calls
      ▼
giftFlow.ts / auth.ts / wishlistFlow   (domain functions, typed with lib/types.ts)
      │  uses
      ▼
api.ts        (fetch wrapper: base URL, JSON, Bearer token, 401 handling)
      │
      ▼
storage.ts    (localStorage for JWT + cached user)
```

- On login/signup the JWT and user are stored in `localStorage` via `storage.ts`.
- `api.ts` attaches `Authorization: Bearer <token>` to authenticated calls and, on a `401`, clears the session and redirects to `/login`.
- Domain modules (`auth`, `giftFlow`, `giftsApi`, `wishlistFlow`, `notificationsApi`) wrap the endpoints and return the interfaces defined in `lib/types.ts`, which mirror the backend entities.

## Project Structure

```
src/
  app/                         # Next.js App Router (route groups isolate layouts)
    (landing)/                 # Public marketing pages + shared landing layout
      page.tsx                 # Home / hero
      about/, contact/
      privacy-policy/, terms-of-service/
    (auth)/                    # Split-screen auth layout
      login/, signup/, forgot-password/
    (dashboard)/               # Authenticated app + sidebar layout
      dashboard/               # Overview with stats
      marketplace/             # Browse and filter gifts
      gift/[id]/               # Gift detail page
      gifts-sent/              # Sent orders list
      gifts-received/          # Received orders list + redeem action
      wishlist/                # User wishlist
      settings/                # Account and payout settings
      request-gift/            # Request a gift
    (standalone)/              # Focused full-screen flows (no sidebar)
      send-gift/               # Multi-step send flow with fee calculation
      verify-email/            # Email verification
  components/
    ui/                        # Button, FormComponents, GiftPlaceholder
    layout/                    # Navbar, Sidebar, Footer, MobileHeader
    effects/                   # ScrollReveal
  lib/
    api.ts                     # HTTP client with JWT auth and 401 handling
    auth.ts                    # login, signup, logout, profile, session helpers
    giftFlow.ts                # gifts, orders, wishlist, notifications API calls + fee helpers
    storage.ts                 # localStorage utility with typed keys
    types.ts                   # TypeScript interfaces mirroring backend entities
    animations.ts              # Animation utilities
  data/
    gifts.ts                   # Static gift data (reference/fallback)
  styles/                      # Global CSS and design tokens (index.css)
```

Route groups keep layouts separate: marketing pages, the split-screen auth screens, the sidebar dashboard, and the full-screen standalone flows each have their own layout without affecting the URL path.

## Key Features

- JWT-based authentication against the backend API
- Gift marketplace with server-side filtering and sorting
- Multi-step send-gift flow with recipient details, message, delivery date, anonymous option, and live 5% fee calculation
- Redeem received gifts as physical item, cash, crypto, or charity
- Wishlist management
- Order tracking for gifts sent and gifts received
- Responsive design with mobile sidebar navigation

## Design system

Defined as CSS custom properties in `src/styles/index.css`:

- Palette: emerald primary (`#0A4535`) with sage accents on a warm cream base (`#FAF8F5`); red/amber reserved for status.
- Type: DM Serif Display for display headings, DM Sans for body, JetBrains Mono for monospace.
- Motion: `ScrollReveal` for on-scroll fade/slide reveals.
- Mobile-first responsive breakpoints (768px, 1024px, 1280px).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
