# Global Gift Exchange

A full-stack gift exchange platform with a Next.js frontend and NestJS backend.

## Project Structure

```
Gift/
├── frontend/          # Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
│   ├── src/
│   │   ├── app/       # App Router (route groups: landing, dashboard, standalone)
│   │   ├── components/
│   │   ├── lib/       # Utilities, types, helpers
│   │   ├── data/      # Static data
│   │   └── styles/    # CSS files
│   └── public/        # Static assets
│
├── backend/           # NestJS + TypeScript + PostgreSQL + TypeORM
│   ├── src/
│   │   ├── modules/   # Feature modules (auth, gifts, users, etc.)
│   │   ├── common/    # Shared guards, pipes, interceptors, decorators
│   │   ├── config/    # Configuration (database, jwt, app)
│   │   └── database/  # Migrations, seeds
│   └── test/          # E2E tests
│
├── CLAUDE.md
├── Makefile
└── .mcp.json
```

## Development Principles

### Planning
- Enter plan mode for big features before implementation
- Create todo lists for multi-step tasks
- Implement incrementally, test after each phase

### Code Quality
- Follow SOLID principles
- Prioritize immutability - use `const` and `readonly`
- Favor composition over inheritance
- DRY: Actively remove duplicate code. Prioritize this above all else
- Keep functions focused: 20-50 lines max
- Keep files under 300 lines - split when necessary
- Tests must pass before work is considered complete

### TypeScript Conventions
- Classes/interfaces/enums: PascalCase (e.g., `GiftService`, `UserRole`)
- Variables/functions: camelCase (e.g., `giftCount`, `fetchUserData()`)
- Files/directories: kebab-case (e.g., `gift-service.ts`, `send-gift/`)
- Constants: UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRIES`)
- Use strict TypeScript - no `any` unless absolutely necessary
- Prefer interfaces over types for object shapes
- Use enums for fixed sets of values

### Frontend (Next.js)
- Use App Router with route groups for layout separation
- Client components only when needed (`'use client'`)
- Keep server components as the default
- Path alias: `@/` maps to `src/`
- CSS-first approach with Tailwind CSS + custom CSS modules

### Backend (NestJS)
- One module per feature domain (auth, gifts, users, orders, etc.)
- DTOs for all request/response validation (use class-validator)
- Entity classes for database models (TypeORM)
- Guards for authentication/authorization
- Interceptors for response transformation
- Pipes for request validation
- Write unit tests for services and e2e tests for controllers
- Use environment variables for all configuration (no hardcoded secrets)

### Testing
- Backend must have unit tests for all services
- Backend must have e2e tests for all API endpoints
- Use Arrange-Act-Assert pattern
- Descriptive test names that explain what is being tested
- Mock external dependencies
- Group related tests with `describe()` blocks

### Git Conventions
- Commit messages: Capital letter start, simple statement
- No conventional commit prefixes (no "feat:", "fix:", etc.)
- No credits or attributions in commit messages
- No Co-Authored-By lines
- Never run `git push` - user will push when ready
- Keep commit messages concise - not a PR description

### Anti-Patterns to Avoid
- Don't add features beyond what's asked
- Don't litter the codebase with emojis
- Don't add unnecessary comments - code should be self-documenting
- Don't over-engineer or add premature abstractions
- Don't skip tests
- Don't use `any` type
- Don't hardcode configuration values
- Don't add backwards-compatibility hacks

## Running the Project

### Frontend
```bash
cd frontend && npm install && npm run dev
```

### Backend
```bash
cd backend && npm install && npm run start:dev
```

### Both (via Makefile)
```bash
make install    # Install all dependencies
make dev        # Run both frontend and backend
make test       # Run all tests
```

## Database
- PostgreSQL with TypeORM
- Migrations for schema changes (never modify DB manually)
- Seeds for development data
