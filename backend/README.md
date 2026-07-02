# Backend — Festow API

NestJS REST API with PostgreSQL persistence, JWT authentication, and the full domain logic for the Festow gifting platform: catalog, orders, redemptions, wishlists, and notifications.

## Tech Stack

- NestJS 11
- TypeORM 0.3 with PostgreSQL
- Passport + JWT authentication (`passport-jwt`)
- class-validator / class-transformer for DTO validation
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a remote instance)

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example and set a real `JWT_SECRET`:

```bash
cp .env.example .env
```

3. Create the PostgreSQL database:

```bash
createdb gift_exchange
```

4. Start the development server:

```bash
npm run start:dev
```

The server starts on `http://localhost:3001` by default. Tables are auto-created via TypeORM `synchronize: true` in development.

5. Seed the gift catalog:

```bash
npm run seed
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | localhost | PostgreSQL host |
| `DB_PORT` | 5432 | PostgreSQL port |
| `DB_USERNAME` | postgres | Database username |
| `DB_PASSWORD` | postgres | Database password |
| `DB_NAME` | gift_exchange | Database name |
| `JWT_SECRET` | default-secret | Secret key for JWT signing (change in production) |
| `JWT_EXPIRATION` | 7d | Token expiration duration |
| `PORT` | 3001 | Server port |

CORS is enabled globally, and a global `ValidationPipe` (`whitelist`, `transform`, implicit conversion) strips unknown properties and coerces types on every request.

## Authentication flow

1. `POST /auth/signup` or `POST /auth/login` returns `{ access_token, user }`. Passwords are hashed with bcrypt and the `password` column is never selected by default.
2. Clients send `Authorization: Bearer <token>` on protected routes.
3. `JwtStrategy` validates the token and attaches `{ id, email }` to the request; the `@CurrentUser()` decorator exposes it to controllers.
4. Guarded routes use `JwtAuthGuard`.

## Data model

```
User ──< Order >── Gift
 │        │
 │        └──1:1── Redemption
 │
 ├──< WishlistItem >── Gift   (unique per user+gift)
 └──< Notification
```

- **User** — email (unique), first/last name, bcrypt password (`select: false`).
- **Gift** — catalog item: name, description, price, currency, `Category`, `Gender`, rating, reviews, image/emoji.
- **Order** — sender, recipient by email + name, gift, message, optional delivery date, anonymous flag, `OrderStatus`, `PaymentMethod`, `serviceFee`, `totalAmount`. Recipients are addressed by email so they do not need an account to be sent a gift.
- **Redemption** — one-to-one with an order; `RedemptionMethod`, `RedemptionStatus`, and a JSON `details` blob validated per method.
- **WishlistItem** — user + gift, unique together.
- **Notification** — user, `NotificationType`, title, message, read flag.

## Business rules

- **Service fee**: orders add a 5% service fee (`SERVICE_FEE_RATE` in `common/constants.ts`) on top of the gift price; both `serviceFee` and `totalAmount` are persisted.
- **Redemption ownership**: only the recipient (matched by email) can redeem an order, and an order can be redeemed once. Redeeming flips the order to `REDEEMED` and notifies the sender.
- **Redemption details** are validated per method; missing fields are rejected:

  | Method | Required detail fields |
  |--------|------------------------|
  | `physical` | address, city, state, zipCode, country |
  | `cash` | bankName, accountNumber, routingNumber |
  | `crypto` | cryptocurrency, walletAddress |
  | `charity` | charityName, charityId |

## API Endpoints

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/signup` | public | Register a new user, returns JWT |
| POST | `/auth/login` | public | Login, returns JWT |
| GET | `/auth/profile` | JWT | Current user profile |

### Gifts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/gifts` | public | List gifts with optional filters |
| GET | `/gifts/:id` | public | Get gift details |

Query parameters for `/gifts`: `search`, `category`, `gender`, `minPrice`, `maxPrice`, `minRating`, `sort` (`price-asc`, `price-desc`, `rating`, `newest`, `featured`).

### Orders

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/orders` | JWT | Create an order (send a gift) |
| GET | `/orders/sent` | JWT | Orders sent by the current user |
| GET | `/orders/received` | JWT | Orders received (matched by the user's email) |

### Redemptions

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/orders/:orderId/redeem` | JWT | Redeem a received gift |

### Wishlist

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/wishlist` | JWT | Current user's wishlist |
| POST | `/wishlist/:giftId` | JWT | Add a gift to the wishlist |
| DELETE | `/wishlist/:itemId` | JWT | Remove a wishlist item |
| GET | `/wishlist/check/:giftId` | JWT | Whether a gift is on the wishlist (`{ inWishlist }`) |

### Notifications

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/notifications` | JWT | Current user's notifications |
| PATCH | `/notifications/:id/read` | JWT | Mark a notification as read |

## Scripts

```bash
npm run start:dev    # Development with hot reload
npm run build        # Compile TypeScript
npm run start:prod   # Start compiled output
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
npm run test:cov     # Test coverage report
npm run seed         # Seed gift catalog
npm run lint         # Run ESLint
```

## Testing

Every service has a unit spec (`*.spec.ts`) beside it, using Jest with mocked repositories and the Arrange-Act-Assert pattern. End-to-end tests live in `test/`. Run `npm test` for unit tests and `npm run test:e2e` for the API-level suite.

## Project Structure

```
src/
  main.ts            # Bootstrap: validation pipe, CORS, port
  app.module.ts      # Root module wiring all feature modules
  config/            # Database and JWT configuration factories
  common/
    enums/           # Category, Gender, OrderStatus, PaymentMethod, RedemptionMethod, RedemptionStatus, NotificationType
    guards/          # JwtAuthGuard
    decorators/      # CurrentUser decorator
    constants.ts     # SERVICE_FEE_RATE
  modules/
    users/           # User entity, service
    auth/            # Controller, service, JWT strategy, DTOs
    gifts/           # Entity, controller, service, filter DTO
    orders/          # Entity, controller, service, create DTO
    redemptions/     # Entity, controller, service, DTOs
    wishlists/       # Entity, controller, service
    notifications/   # Entity, controller, service
  database/seeds/    # Gift catalog seeder
```

## Persistence note

Development uses TypeORM `synchronize: true`, which auto-creates and updates tables from the entities. This is convenient locally but unsafe for production data. Introducing versioned migrations (and turning `synchronize` off outside development) is tracked in the project roadmap.
