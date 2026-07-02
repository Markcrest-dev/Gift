# Festow — Global Gift Exchange

Festow is a cross-border gifting platform. A sender picks a gift from the catalog, pays for it plus a small service fee, and sends it to anyone by email. The recipient then chooses how to receive it: keep the physical item, take the cash value, convert it to crypto, or donate it to charity.

The repository is a monorepo with two independent applications:

- `frontend/` — Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- `backend/` — NestJS 11 + TypeORM + PostgreSQL

## How it works

```
Sender                         Festow                          Recipient
  |                              |                                 |
  |-- browse & pick a gift ----->|                                 |
  |-- pay (gift + 5% fee) ------>|  order created (status: sent)   |
  |                              |-- email notification ---------->|
  |                              |                                 |-- redeem
  |                              |     choose: item / cash /        |
  |                              |     crypto / charity             |
  |<-- "gift redeemed" notice ---|  order status: redeemed          |
```

The 5% service fee is applied at checkout. Redemption requires method-specific details (shipping address, bank details, wallet address, or charity selection), which the backend validates before completing.

## Architecture

```
┌─────────────────────────────┐        HTTP / JSON        ┌──────────────────────────────┐
│  frontend (Next.js, :3000)  │  ───────────────────────> │   backend (NestJS, :3001)     │
│                             │   Bearer JWT in header    │                                │
│  App Router route groups:   │ <───────────────────────  │   Modules:                     │
│   (landing) (auth)          │                           │    auth, users, gifts,         │
│   (dashboard) (standalone)  │                           │    orders, redemptions,        │
│                             │                           │    wishlists, notifications    │
│  lib/ HTTP + auth client    │                           │                                │
└─────────────────────────────┘                           └───────────────┬────────────────┘
                                                                           │ TypeORM
                                                                  ┌────────▼────────┐
                                                                  │   PostgreSQL    │
                                                                  └─────────────────┘
```

The frontend is a thin client: all business logic (pricing, fee calculation, redemption validation, notifications) lives in the backend. Authentication is JWT-based; the token is stored in `localStorage` and attached as a `Bearer` header on authenticated requests.

## Feature overview

| Area | Capability |
|------|------------|
| Accounts | Signup, login, JWT sessions, profile |
| Catalog | Browsable gift catalog with search, category/gender/price/rating filters, and sorting |
| Sending | Multi-step send flow with recipient details, personal message, delivery date, anonymous option, and payment method (card / PayPal / crypto) |
| Receiving | Redeem a received gift as physical item, cash, crypto, or charity donation |
| Wishlist | Add, remove, and check gifts on a personal wishlist |
| Notifications | In-app notifications for gift sent, received, and redeemed events |
| Orders | Track gifts sent and gifts received with status |

## Data model

```
User ──< Order >── Gift            (a user sends many orders; each order is one gift)
 │        │
 │        └──1:1── Redemption       (a received order can be redeemed once)
 │
 ├──< WishlistItem >── Gift         (unique per user+gift)
 └──< Notification
```

- `Order` carries sender, recipient (by email, so recipients need not have an account yet), the gift, message, delivery date, anonymity, payment method, service fee, and total.
- `Redemption` is one-to-one with an order and stores the chosen method plus a JSON `details` blob validated per method.
- Enums live in `backend/src/common/enums/`: `Category`, `Gender`, `OrderStatus`, `PaymentMethod`, `RedemptionMethod`, `RedemptionStatus`, `NotificationType`.

## Tech stack

| Layer | Choices |
|-------|---------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, lucide-react icons |
| Backend | NestJS 11, TypeORM 0.3, PostgreSQL, Passport + JWT, class-validator, bcrypt |
| Design | Emerald (`#0A4535`) + cream (`#FAF8F5`) palette, DM Serif Display headings, DM Sans body |
| Tooling | ESLint, Prettier, Jest (unit + e2e), Makefile for orchestration |

## Quick start

Prerequisites: Node.js 18+, PostgreSQL running locally.

```bash
# 1. Install both apps
make install

# 2. Configure and seed the backend
cd backend
cp .env.example .env          # edit JWT_SECRET and DB credentials as needed
createdb gift_exchange
npm run seed                  # loads the starter gift catalog
cd ..

# 3. Run frontend + backend together
make dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

You can also run either app on its own. See `frontend/README.md` and `backend/README.md` for app-specific instructions, environment variables, and the full API reference.

## Makefile targets

```bash
make install     # install frontend + backend dependencies
make dev         # run both dev servers
make build       # production build of both apps
make test        # frontend lint + backend unit tests
make test-e2e    # backend e2e tests
make lint        # lint both apps
make db-seed     # seed the gift catalog
make clean       # remove build output and node_modules
```

Note: the `db-migrate*` targets are placeholders. The backend currently relies on TypeORM `synchronize: true` in development and does not yet ship migrations (see Roadmap).

## Testing

- Backend unit tests cover every service (`*.spec.ts`); run with `make test-backend` or `cd backend && npm test`.
- Backend e2e tests live in `backend/test/`; run with `make test-e2e`.
- Frontend currently has lint as its check (`make test-frontend`); component/e2e tests are on the roadmap.

## Project layout

```
Gift/
├── frontend/          # Next.js app (see frontend/README.md)
├── backend/           # NestJS API (see backend/README.md)
├── CLAUDE.md          # Contributor conventions and principles
├── Makefile           # Cross-app install/dev/build/test orchestration
└── .mcp.json          # MCP server config (context7 docs)
```

## Roadmap

The near-term MVP focus and the later feature targets are tracked in [ROADMAP.md](./ROADMAP.md).
