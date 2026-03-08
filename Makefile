# ==========================================
# Global Gift Exchange - Makefile
# ==========================================

.PHONY: install install-frontend install-backend \
        dev dev-frontend dev-backend \
        build build-frontend build-backend \
        test test-frontend test-backend test-e2e \
        lint lint-frontend lint-backend \
        clean db-migrate db-seed

# ---- Install ----
install: install-frontend install-backend

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && npm install

# ---- Development ----
dev:
	@echo "Starting frontend and backend..."
	@make dev-frontend & make dev-backend

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && npm run start:dev

# ---- Build ----
build: build-frontend build-backend

build-frontend:
	cd frontend && npm run build

build-backend:
	cd backend && npm run build

# ---- Test ----
test: test-frontend test-backend

test-frontend:
	cd frontend && npm run lint

test-backend:
	cd backend && npm run test

test-e2e:
	cd backend && npm run test:e2e

test-cov:
	cd backend && npm run test:cov

# ---- Lint ----
lint: lint-frontend lint-backend

lint-frontend:
	cd frontend && npm run lint

lint-backend:
	cd backend && npm run lint

# ---- Database ----
db-migrate:
	cd backend && npm run migration:run

db-migrate-generate:
	cd backend && npm run migration:generate

db-migrate-revert:
	cd backend && npm run migration:revert

db-seed:
	cd backend && npm run seed

# ---- Clean ----
clean:
	rm -rf frontend/.next frontend/node_modules
	rm -rf backend/dist backend/node_modules
