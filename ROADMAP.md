# Roadmap

This document describes where Festow is today, the recommended MVP target to ship a real product, and the later features to scale up. The guiding idea: get one gift through the full lifecycle for real money and real recipients before broadening the surface area.

## Where it is today

The domain and the UI for the core loop already exist:

- Auth: signup, login, JWT sessions, profile.
- Catalog: gift browsing with search, filters, and sorting (seeded, 10 items).
- Send: multi-step order flow with a 5% service fee, persisted orders.
- Receive: redemption as physical item, cash, crypto, or charity, with per-method field validation and sender notification.
- Wishlist and in-app notifications.
- Backend unit tests for every service plus an e2e suite.

What is simulated rather than real:

- **Payment on send is not processed.** Orders record a `paymentMethod` but no charge happens.
- **Payouts are not processed.** Redemptions capture bank/wallet/charity details but nothing pays out; status stays `pending`.
- **No email is sent.** Recipients are addressed by email, but there is no delivery, and a recipient without an account has no way to claim a gift. `verify-email` and `forgot-password` are UI stubs with no backend.
- **Data/security shortcuts.** `JWT_SECRET` defaults to a placeholder, TypeORM `synchronize: true` runs instead of migrations, and redemption PII (bank/wallet details) is stored as plaintext JSON.
- **Money is stored as decimals**, and the "cross-border / 120+ countries" promise has no multi-currency or FX behind it yet.

## MVP target: make the core loop real and safe

Goal: a sender pays real money, the recipient (even without an account) is reached, claims the gift, and receives value through at least one real payout path, with the security and data handling that money and PII require.

1. **Real payment on send.** Integrate a payment provider (Stripe Checkout or PaymentIntents). Create the order only after the charge succeeds; record the payment reference on the order. Handle failure and idempotency.
2. **Email + recipient claim flow.** Send a claim email on order creation with a signed, expiring claim link so a recipient without an account can view and redeem the gift. Wire `verify-email` and `forgot-password` to real email (password reset tokens).
3. **One real payout path.** Start with a single, low-friction method (for example a gift-card / cash payout provider). Move redemptions through `pending -> processing -> completed` driven by the provider, with webhook confirmation. Keep the other methods behind "coming soon" until their rails exist.
4. **Security and data hardening.** Require `JWT_SECRET` (fail fast if unset), add TypeORM migrations and disable `synchronize` outside development, encrypt redemption PII at rest, and add rate limiting on auth endpoints.
5. **Money correctness.** Store amounts as integer minor units and lock the MVP to a single currency (USD). Centralize fee/total math so the frontend and backend agree.

Explicitly out of scope for the MVP: multi-currency, crypto payouts, group gifting, admin catalog tools. Ship the single-gift, single-currency loop first.

## Later target: scale up

Once the core loop is real and safe:

- **True cross-border.** Multi-currency pricing, FX at redemption, country-aware payout methods, and KYC/AML for cash and crypto payouts.
- **More payout rails.** Live crypto payouts and charity-partner integrations, each with their own compliance and confirmation handling.
- **Richer gifting.** Group/pooled gifts, scheduled and recurring gifts, and gift registries built on the existing wishlist.
- **Catalog operations.** Admin catalog management (today the catalog is seed-only), inventory and fulfillment for physical items, and supplier integrations.
- **Notifications.** Real-time delivery (websockets or push) plus email/SMS, with per-user notification preferences.
- **Platform.** Frontend component and e2e tests, CI/CD, containerized deploys, and observability (logging, metrics, tracing).
