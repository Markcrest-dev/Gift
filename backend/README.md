# Backend - Global Gift Exchange API

NestJS REST API with PostgreSQL persistence, JWT authentication, and full CRUD operations for the gift exchange platform.

## Tech Stack

- NestJS 11
- TypeORM with PostgreSQL
- Passport + JWT authentication
- class-validator for DTO validation
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

2. Create a `.env` file from the example:

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

The server starts on `http://localhost:3001` by default. Tables are auto-created via TypeORM `synchronize: true`.

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
| `JWT_SECRET` | - | Secret key for JWT signing |
| `JWT_EXPIRATION` | 7d | Token expiration duration |
| `PORT` | 3001 | Server port |

## API Endpoints

### Auth (public)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/auth/profile` | Get current user profile (requires JWT) |

### Gifts (public)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/gifts` | List gifts with optional filters |
| GET | `/gifts/:id` | Get gift details |

Query parameters for `/gifts`: `search`, `category`, `gender`, `minPrice`, `maxPrice`, `minRating`, `sort` (price-asc, price-desc, rating, newest, featured).

### Orders (requires JWT)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/orders` | Create a new order (send a gift) |
| GET | `/orders/sent` | Get orders sent by current user |
| GET | `/orders/received` | Get orders received by current user |

### Redemptions (requires JWT)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/orders/:orderId/redeem` | Redeem a received gift |

### Wishlist (requires JWT)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/wishlist` | Get current user's wishlist |
| POST | `/wishlist/:giftId` | Add gift to wishlist |
| DELETE | `/wishlist/:itemId` | Remove item from wishlist |
| GET | `/wishlist/check/:giftId` | Check if gift is in wishlist |

### Notifications (requires JWT)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/notifications` | Get current user's notifications |
| PATCH | `/notifications/:id/read` | Mark notification as read |

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

## Project Structure

```
src/
  config/            # Database and JWT configuration
  common/
    enums/           # Category, Gender, OrderStatus, etc.
    guards/          # JWT auth guard
    decorators/      # CurrentUser decorator
    constants.ts     # Service fee rate
  modules/
    users/           # User entity, service
    auth/            # Auth controller, service, JWT strategy, DTOs
    gifts/           # Gift entity, controller, service, filter DTO
    orders/          # Order entity, controller, service, create DTO
    redemptions/     # Redemption entity, controller, service, DTOs
    wishlists/       # WishlistItem entity, controller, service
    notifications/   # Notification entity, controller, service
  database/seeds/    # Gift catalog seeder
```
