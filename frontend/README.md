# Frontend - Global Gift Exchange

Next.js application for the gift exchange platform with real-time API integration.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Font Awesome 6.5.1

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see `../backend/README.md`)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Set the API URL (optional, defaults to `http://localhost:3001`):

Create a `.env.local` file:

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

## Project Structure

```
src/
  app/                         # Next.js App Router
    (landing)/                 # Public pages
      page.tsx                 # Landing/home page
      login/                   # Login page
      signup/                  # Registration page
      about/, contact/         # Info pages
      forgot-password/         # Password recovery
      privacy-policy/, terms-of-service/
    (dashboard)/               # Authenticated pages
      layout.tsx               # Dashboard layout with sidebar
      dashboard/               # Overview with stats
      marketplace/             # Browse and filter gifts
      gift/[id]/               # Gift detail page
      send-gift/               # Multi-step send gift flow
      gifts-sent/              # Sent orders list
      gifts-received/          # Received orders list
      wishlist/                # User wishlist
      settings/                # Account settings
      request-gift/            # Request a gift
    (standalone)/              # Standalone flows
      receive-gift/            # Gift redemption flow
      verify-email/            # Email verification
  components/
    ui/                        # Button, FormComponents
    layout/                    # Navbar, Sidebar, Footer, MobileHeader
    effects/                   # Snowfall, ScrollReveal
  lib/
    api.ts                     # HTTP client with JWT auth
    auth.ts                    # Authentication (login, signup, logout)
    giftFlow.ts                # Gift, order, wishlist, notification API calls
    storage.ts                 # localStorage utility
    types.ts                   # TypeScript interfaces
    animations.ts              # Animation utilities
  data/
    gifts.ts                   # Gift catalog data (used for reference)
  styles/                      # CSS modules
```

## Key Features

- JWT-based authentication with the backend API
- Real-time gift marketplace with server-side filtering and sorting
- Multi-step gift sending flow with fee calculation
- Wishlist management
- Order tracking (sent and received)
- Gift redemption (physical, cash, crypto, charity)
- Responsive design with mobile sidebar navigation

## Design

- Christmas theme: Ruby Red (#C41E3A), Forest Green (#0F5132), Gold (#FFD700)
- Playfair Display for headings, Inter for body text
- Mobile-first responsive breakpoints (768px, 1024px, 1280px)
- Snowfall and scroll-reveal animations

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
