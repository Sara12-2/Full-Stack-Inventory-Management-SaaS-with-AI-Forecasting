# StockFlow

**Inventory, order, and customer management for growing e-commerce teams — with AI-powered forecasting, a natural-language assistant, and smart reorder recommendations built in.**

Built by [DevHatch Labs](#about-devhatch-labs).

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Option A: Docker Compose (recommended)](#option-a-docker-compose-recommended)
  - [Option B: Manual local setup](#option-b-manual-local-setup)
- [Environment Variables](#environment-variables)
- [Database & Seed Data](#database--seed-data)
- [API Overview](#api-overview)
- [Real-Time Alerts](#real-time-alerts)
- [AI Features](#ai-features)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Build Roadmap](#build-roadmap)
- [About DevHatch Labs](#about-devhatch-labs)
- [License](#license)

---

## Overview

StockFlow is a full-stack inventory management SaaS built for small-to-mid e-commerce teams who've outgrown spreadsheets but don't want the cost or complexity of a traditional ERP. It combines:

- **Core operations**: products, categories, suppliers, inventory, orders, and customers, all backed by a real relational database with correct stock-deduction/restoration logic.
- **Real-time visibility**: low-stock and new-order alerts pushed live to every connected session via WebSockets.
- **AI on top of real data**: demand forecasting, a natural-language inventory assistant, and reorder recommendations — all grounded in your actual sales history, with a language model (Google Gemini) used only for narrative insight, never for computing the numbers themselves.

The project also includes a public marketing site (home, features, pricing, about, contact) and a fully separate authenticated dashboard.

## Screenshots

> Screenshots referenced below live in `docs/screenshots/`. Capture each page (light mode, ~1280px wide is a good default) and save it with the filename shown so these links resolve automatically.

| Page | File |
|---|---|
| Marketing home page | `docs/screenshots/home.png` |
| About (StockFlow + DevHatch Labs) | `docs/screenshots/about.png` |
| Pricing | `docs/screenshots/pricing.png` |
| Login | `docs/screenshots/login.png` |
| Dashboard overview | `docs/screenshots/dashboard.png` |
| Products | `docs/screenshots/products.png` |
| Product detail + AI forecast | `docs/screenshots/product-forecast.png` |
| Inventory + AI reorder recommendations | `docs/screenshots/inventory.png` |
| Orders | `docs/screenshots/orders.png` |
| Order detail | `docs/screenshots/order-detail.png` |
| Customers | `docs/screenshots/customers.png` |
| Reports | `docs/screenshots/reports.png` |
| AI Assistant (chat) | `docs/screenshots/ai-assistant.png` |
| Dark mode | `docs/screenshots/dark-mode.png` |

```markdown
![Dashboard overview](docs/screenshots/dashboard.png)
![Product detail with AI forecast](docs/screenshots/product-forecast.png)
![Inventory with AI reorder recommendations](docs/screenshots/inventory.png)
![AI Assistant](docs/screenshots/ai-assistant.png)
```

## Features

### Public marketing site
- Home, Features, Pricing, About, Contact — responsive, dark-mode aware
- Dedicated "About DevHatch Labs" section on the About page

### Authentication
- JWT-based signup/login (email + password, bcrypt-hashed via Werkzeug)
- Role-based access control — `admin` and `staff` roles; public signup always creates `staff` (no privilege escalation via the signup form)
- Session persistence via `localStorage`, automatic `Authorization: Bearer` header on every API call
- Profile page showing the real logged-in user (name, email, role, member since) — reachable from the navbar's user menu, which also links to Settings and Log out

### Dashboard overview
- Live stats (products, orders, low-stock count, revenue this month)
- 7-day revenue trend chart, top-5 products by units sold, recent orders, low-stock list

### Products
- Full CRUD with category and supplier assignment, price/cost tracking, low-stock threshold
- Per-product stock movement history
- Per-product AI demand forecast (see [AI Features](#ai-features))

### Categories & Suppliers
- Category listing; full supplier CRUD (admin-only delete, blocked if the supplier still has products)

### Inventory
- Stock adjustments (stock-in, stock-out, loss/damage correction), each logged as a `StockMovement` with who/when/why
- AI-powered reorder recommendations panel (see [AI Features](#ai-features))

### Orders
- Order creation with automatic stock deduction across all line items (validated atomically — a failure partway through never leaves a partial order)
- Status lifecycle (`pending → processing → shipped → delivered`, or `cancelled`), with automatic stock restoration on cancellation
- Customers are auto-created/reused by email at order time

### Customers
- List, create, and view aggregate stats (total orders, total spent) computed live from order history — never a stale cached counter

### Reports
- Server-generated CSV exports: inventory, orders (with optional date range), revenue by month, stock movements

### Real-time alerts
- Low-stock and new-order events pushed live over Socket.IO to every authenticated session, backed by Redis when available (falls back to in-process delivery in single-worker dev)

### AI features
- **Demand forecasting** — linear-trend forecast from real order history, plus a Gemini-generated narrative insight
- **NL restocking assistant** — a chat interface that answers questions about your live inventory, grounded in real data (never invents numbers)
- **Smart reorder recommendations** — demand-driven (not just threshold-based) reorder quantities, plus one Gemini-generated prioritization summary across the whole list

All three AI features degrade gracefully with a clear message if no Gemini API key is configured — the app never crashes or hangs waiting on the AI provider.

### Other
- Dark mode (system-aware, manual toggle, persisted)
- Fully responsive (mobile sidebar, adaptive layouts)
- Accessible forms (label association, `aria-invalid`/`aria-describedby`, `aria-label`s on icon-only controls, `aria-live` toasts)

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- Tailwind CSS 3
- Recharts (charts), Framer Motion (animation), `next-themes` (dark mode)
- Axios (API client), Socket.IO client (real-time)

**Backend**
- [Flask 3](https://flask.palletsprojects.com/) (application factory pattern, Blueprints per resource)
- SQLAlchemy + Alembic (Flask-Migrate) — ORM and migrations
- Flask-JWT-Extended — auth
- Marshmallow — request validation
- Flask-SocketIO — real-time alerts
- PyMySQL — MySQL driver
- Gunicorn + eventlet — production WSGI/async server

**Database & Infra**
- MySQL 8 (production/Docker) — SQLite used only for isolated automated tests
- Redis 7 — cache + Socket.IO message queue
- Nginx — reverse proxy (routes `/api/*` and `/socket.io/*` to the backend, everything else to the frontend)
- Docker + Docker Compose — full local stack in one command

**AI**
- Google Gemini (`gemini-1.5-flash`) via `google-generativeai` — free tier, no credit card required

**Testing & CI**
- Pytest (backend — 42 tests) · TypeScript + ESLint (frontend)
- GitHub Actions — runs both test suites on every push/PR

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Next.js   │◄────►│    Nginx     │◄────►│    Flask    │
│  (frontend) │      │ (reverse     │      │  (backend)  │
└─────────────┘      │  proxy)      │      └──────┬──────┘
                      └──────────────┘             │
                                          ┌─────────┼─────────┐
                                          ▼         ▼         ▼
                                     ┌────────┐ ┌───────┐ ┌────────┐
                                     │ MySQL  │ │ Redis │ │ Gemini │
                                     │  (data)│ │(cache/│ │  (AI)  │
                                     │        │ │pubsub)│ │        │
                                     └────────┘ └───────┘ └────────┘
```

- The frontend never talks to MySQL/Redis/Gemini directly — every request goes through the Flask API.
- Redis is optional in local dev: if unreachable, the backend logs a warning and continues (Socket.IO falls back to local in-process delivery; nothing crashes).
- Gemini is optional: if `GEMINI_API_KEY` isn't set, every AI endpoint still returns real, correctly-computed data — just with a placeholder instead of the AI-generated narrative.

## Project Structure

```
Stockflow_Full_Stack_Dashboard/
├── frontend/                  # Next.js app (App Router)
│   ├── app/
│   │   ├── (marketing)/       # Public site: home, features, pricing, about, contact
│   │   ├── (auth)/            # Login, signup
│   │   └── dashboard/         # Authenticated app: products, orders, inventory, ai-assistant, ...
│   ├── components/            # UI components, grouped by domain (products/, orders/, ai/, ...)
│   ├── lib/                   # api.ts (axios client), auth.ts, socket.ts, utils.ts
│   └── types/                 # Shared TypeScript types
│
├── backend/                   # Flask app
│   ├── app/
│   │   ├── models/            # SQLAlchemy models
│   │   ├── routes/            # Blueprints (one file per resource)
│   │   ├── schemas/           # Marshmallow request validation
│   │   ├── services/          # Alert/report business logic
│   │   ├── ai/                # forecasting.py, assistant.py, restock_recommender.py
│   │   ├── sockets/           # Socket.IO event handlers
│   │   └── utils/             # RBAC decorator, shared error helpers
│   ├── migrations/            # Alembic migrations
│   ├── tests/                 # Pytest suite (42 tests)
│   └── seed.py                # Seeds sample data for local dev
│
├── nginx/nginx.conf           # Reverse proxy config
├── docker-compose.yml         # Full local stack (mysql, redis, backend, frontend, nginx)
├── .github/workflows/ci.yml   # GitHub Actions CI
└── .env.example                # Every environment variable the stack needs
```

## Getting Started

### Option A: Docker Compose (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
cp .env.example .env
# edit .env if you want to change default passwords or add GEMINI_API_KEY

docker compose up --build
```

This starts MySQL, Redis, the Flask backend, the Next.js frontend, and Nginx together. Once healthy, the app is available at **http://localhost** (routed through Nginx).

Seed sample data (run once, in a separate terminal, while the stack is up):
```bash
docker compose exec backend python seed.py
```

### Option B: Manual local setup

**Prerequisites**: Node.js 20+, Python 3.11+, a running MySQL 8 instance, (optionally) Redis.

**Backend**
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Set env vars (see .env.example) or export them directly:
export DATABASE_URL="mysql+pymysql://user:pass@localhost:3306/stockflow"
export JWT_SECRET_KEY="a-real-secret-at-least-32-bytes-long"
export SECRET_KEY="another-real-secret"
export FLASK_ENV=development

flask db upgrade      # apply migrations
python seed.py         # optional: sample data
python main.py          # runs on http://localhost:5000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev             # runs on http://localhost:3000
```

Seeded login (from `seed.py`):
- **Admin**: `admin@stockflow.dev` / `password123`
- **Staff**: `staff@stockflow.dev` / `password123`

## Environment Variables

See [`.env.example`](.env.example) for the full, authoritative list. Summary:

| Variable | Used by | Notes |
|---|---|---|
| `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` | Docker Compose | MySQL container credentials |
| `DATABASE_URL` | Backend | SQLAlchemy connection string |
| `SECRET_KEY`, `JWT_SECRET_KEY` | Backend | Use long, random values in production |
| `REDIS_URL` | Backend | Optional — app degrades gracefully if unreachable |
| `CORS_ORIGINS` | Backend | Comma-separated list of allowed frontend origins |
| `GEMINI_API_KEY` | Backend | Optional — get a free key at [aistudio.google.com](https://aistudio.google.com); AI features degrade gracefully without it |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend API base URL |
| `NEXT_PUBLIC_SOCKET_URL` | Frontend | Backend Socket.IO URL |

## Database & Seed Data

Schema is managed with Alembic (`backend/migrations/`). To apply migrations:
```bash
cd backend
flask db upgrade
```

To create a new migration after changing a model:
```bash
flask db migrate -m "describe the change"
flask db upgrade
```

`python seed.py` drops and recreates all tables, then inserts: 2 users (admin + staff), 5 categories, 3 suppliers, 8 products, 5 customers, and 5 orders with line items — enough to exercise every feature (including low-stock items and a cancelled order) out of the box.

## API Overview

All endpoints are prefixed `/api` and (except auth) require `Authorization: Bearer <token>`.

| Resource | Endpoints |
|---|---|
| Auth | `POST /auth/signup`, `POST /auth/login`, `GET /auth/me` |
| Products | `GET/POST /products`, `GET/PUT/DELETE /products/:id`, `GET /products/:id/movements`, `GET /products/:id/forecast` |
| Categories | `GET/POST /categories` |
| Suppliers | `GET/POST /suppliers`, `PUT/DELETE /suppliers/:id` |
| Inventory | `POST /inventory/adjust`, `GET /inventory/recommendations` |
| Orders | `GET/POST /orders`, `GET /orders/:id`, `PUT /orders/:id/status` |
| Customers | `GET/POST /customers`, `GET /customers/:id` |
| Dashboard | `GET /dashboard/{stats,revenue,top-products,recent-orders,low-stock}` |
| Reports | `GET /reports/{inventory,orders,revenue,movements}` (CSV) |
| AI Assistant | `POST /ai/chat` |
| Health | `GET /health` |

Admin-only endpoints (product/supplier delete) return `403` for non-admin tokens. See `backend/tests/` for the exact contract of every endpoint, verified by the test suite.

## Real-Time Alerts

The backend emits two Socket.IO events to all authenticated, connected clients:
- `low_stock_alert` — fires when a product's stock crosses at-or-below its threshold (not on every subsequent decrease, to avoid spam)
- `new_order_alert` — fires on every new order

The Socket.IO handshake requires a valid JWT (`auth: { token }`); unauthenticated connections are rejected. The frontend shows these as toast notifications app-wide via `DashboardLayout`.

## AI Features

All three AI features follow the same principle: **deterministic calculation for any number that matters, Gemini only for narrative/prioritization** — a language model is never asked to compute a forecast or a quantity, which avoids hallucinated figures.

| Feature | Numbers computed by | Gemini's role |
|---|---|---|
| Demand forecasting | Least-squares linear regression over 8 weeks of real order history | 2–3 sentence insight on the trend + a recommendation |
| NL assistant | — | Answers grounded in a live snapshot of your catalog, low-stock items, and top sellers; instructed to never invent numbers |
| Reorder recommendations | `avg_weekly_sales × coverage_weeks − current_stock`, only surfaced when real sales velocity indicates a stockout risk | One summary call prioritizing across the whole list (not one call per product) |

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com) (no credit card required) and set `GEMINI_API_KEY` to enable the narrative layer. Every feature works correctly (real numbers, no crashes) even without a key — you'll just see a placeholder instead of the AI-generated text.

## Testing

**Backend** (42 tests covering auth, RBAC, CRUD, stock deduction/restoration, forecasting math, AI graceful-degradation):
```bash
cd backend
pip install -r requirements-dev.txt
pytest -v
```

**Frontend**:
```bash
cd frontend
npx tsc --noEmit    # type-check
npm run lint         # ESLint
npm run build        # production build
```

## CI/CD

`.github/workflows/ci.yml` runs on every push/PR to `main` and `feat/**`/`fix/**` branches:
- **backend job**: installs deps, runs the full pytest suite
- **frontend job**: installs deps, type-checks, lints, and runs a production build

## Troubleshooting

Dev-mode issues actually hit while building this project, and how to recognize/fix them:

**Page fails with "The default export is not a React Component in page: /some-route"**
An `app/**/layout.tsx` or `page.tsx` file has no content (0 bytes) — Next.js requires every file it finds in the `app/` router to export a valid component. This can happen from an accidental save/edit that wipes a file, or from git operations (see below). Check the file's actual size/content; if it's empty, restore it from git history:
```bash
git log --oneline -- path/to/file.tsx
git show <commit-before-it-broke>:frontend/path/to/file.tsx
```

**Build error pointing at a file inside `node_modules` (e.g. "Module not found: Can't resolve '../util/X'")**
A corrupted/incomplete package install — a folder exists but is missing files it should have. Reinstall just that package rather than wiping all of `node_modules`:
```bash
cd frontend
rm -rf node_modules/<package-name>
npm install <package-name>
```

**Frontend shows stale/wrong content, or errors referencing files that were already deleted from the codebase**
Stale `.next` build cache — common after switching branches, `git reset --hard`, or any operation that changes many files while the dev server is running. Stop the dev server, then:
```bash
cd frontend
rm -rf .next node_modules/.cache
npm run dev
```

**AI features show a "not configured" placeholder despite adding a Gemini key**
See [AI Features](#ai-features) and [Environment Variables](#environment-variables) — most likely the `.env` file is in the wrong location for how you're running the app (`backend/.env` for manual runs vs. repo-root `.env` for Docker Compose), or the pasted key is the wrong provider's format (Gemini keys start with `AIzaSy`, not `sk-...`).

## Deployment

Intended production targets: **Vercel** (frontend), **Render** (backend), a hosted MySQL provider, and Redis Cloud — all of which have free tiers suitable for this project. Deployment is tracked as a separate phase; see [Build Roadmap](#build-roadmap) below.

## Build Roadmap

StockFlow was built in phases, each independently tested end-to-end (backend: pytest + live curl verification; frontend: type-check, lint, production build, and browser verification) before moving to the next:

- [x] **Phase 1** — Frontend UI against mock data (Next.js, all pages, dark mode, marketing site)
- [x] **Phase 2** — Backend (Flask scaffold, DB models/migrations, JWT auth + RBAC, core CRUD, real-time alerts, CSV reports, frontend integration, Nginx + CI)
- [x] **Phase 3** — AI (demand forecasting, NL restocking assistant, smart reorder recommendations)
- [ ] **Phase 4** — Live deployment (Vercel + Render + hosted MySQL + Redis Cloud)

## About DevHatch Labs

**Build Smarter. Scale Faster.**

DevHatch Labs' vision is to become a leading AI solutions company, helping businesses adopt artificial intelligence through practical, scalable, and affordable implementations. Our mission is centered on building practical AI solutions that create measurable business impact.

Services:
- AI chatbots and intelligent agents
- AI calling agents
- WhatsApp automation
- CRM and workflow automation
- AI-powered customer support
- Intelligent document processing (RAG systems)
- Custom web development (MERN stack)
- SaaS development
- Business process automation
- Landing pages & personal branding

## License

&copy; DevHatch Labs. All rights reserved.
