<div align="center">

# <img src="https://img.icons8.com/color/48/000000/artificial-intelligence.png" width="40" height="40" style="vertical-align: middle;"/> StockFlow AI

###  AI-Powered Inventory Management for Modern E-Commerce Teams

**Inventory · Orders · Customers · Forecasting · Assistant · Reorder Intelligence**

[![CI](https://github.com/Sara12-2/Full-Stack-Inventory-Management-SaaS-with-AI-Forecasting/actions/workflows/ci.yml/badge.svg)](https://github.com/Sara12-2/Full-Stack-Inventory-Management-SaaS-with-AI-Forecasting/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3-000000?style=for-the-badge&logo=flask)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq-F55036?style=for-the-badge)


> **Smart inventory management with AI forecasting, natural language assistant, and real-time reorder recommendations**



[ Features](#features) · [ Getting Started](#getting-started) · [ AI Design](#ai-features) · [ Troubleshooting](#troubleshooting)



</div>
<br>

## Table of Contents

<table>
<tr>
<td valign="top">

**The project**
- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)

</td>
<td valign="top">

**Running it**
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database & Seed Data](#database--seed-data)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)

</td>
<td valign="top">

**Reference**
- [API Overview](#api-overview)
- [Real-Time Alerts](#real-time-alerts)
- [AI Features](#ai-features)
- [Deployment](#deployment)
- [Build Roadmap](#build-roadmap)
- [About DevHatch Labs](#about-devhatch-labs)

</td>
</tr>
</table>

<br>

## Overview

StockFlow is a full-stack inventory management SaaS built for small-to-mid e-commerce teams who've outgrown spreadsheets but don't want the cost or complexity of a traditional ERP. It combines:

| | |
|---|---|
| 🗃️ **Core operations** | Products, categories, suppliers, inventory, orders, and customers, all backed by a real relational database with correct stock-deduction/restoration logic. |
| ⚡ **Real-time visibility** | Low-stock and new-order alerts pushed live to every connected session via WebSockets. |
| 🤖 **AI on real data** | Demand forecasting, a natural-language inventory assistant, and reorder recommendations — grounded in your actual sales history, with a language model (Groq) used only for narrative insight, **never** for computing the numbers themselves. |

The project also includes a public marketing site (home, features, pricing, about, contact) and a fully separate authenticated dashboard.

> **Quick start:** `cp .env.example .env && docker compose up --build` — see [Getting Started](#getting-started) for the full walkthrough.

## 📸 Screenshots

> All screenshots live in `docs/screenshots/` and show both light and dark modes.

---

##  Light Mode Screenshots

### 1.  Home Page

![Home Light](docs/screenshots/home.png)

---

### 2.  About Page

![About Light](docs/screenshots/about-light-part-1.png)

---

### 3. 📄 About Page (Continued)

![About Light 2](docs/screenshots/about-light-part-2.png)

---

### 4.  Features Page

![Features Light](docs/screenshots/features.png)

---

### 5.  Pricing Page

![Pricing Light](docs/screenshots/pricing-light.png)

---

### 6.  Contact Page

![Contact Light](docs/screenshots/contact-light.png)

---

### 7.  Login Page

![Login](docs/screenshots/login.png)

---

### 8.  Signup Page

![Signup](docs/screenshots/signup.png)

---

### 9.  Dashboard

![Dashboard Light](docs/screenshots/dashboard.png)

---

### 10.  Products Page

![Products Light](docs/screenshots/products.png)

---

### 11.  Categories Page

![Categories Light](docs/screenshots/categories.png)

---

### 12.  Suppliers Page

![Suppliers Light](docs/screenshots/suppliers.png)

---

### 13.  Inventory Page

![Inventory Light](docs/screenshots/inventory.png)

---

### 14.  Orders Page

![Orders Light](docs/screenshots/orders.png)

---

### 15.  Customers Page

![Customers Light](docs/screenshots/customers.png)

---

### 16.  Reports Page

![Reports Light](docs/screenshots/reports.png)

---

### 17.  AI Assistant

![AI Assistant Light](docs/screenshots/ai-assistant.png)

---

### 18.  Profile Page

![Profile Light](docs/screenshots/admin-profile-light.png)

---

### 19.  Footer Page

![Footer Light](docs/screenshots/footer-light.png)

---

##  Dark Mode Screenshots

### 1.  Home Page (Dark)

![Home Dark](docs/screenshots/home-dark.png)

---

### 2.  About Page (Dark)

![About Dark](docs/screenshots/about-dark-part-1.png)

---

### 3.  About Page (Dark Continued)

![About Dark 2](docs/screenshots/about-dark-part-2.png)

---

### 4.  Features Page (Dark)

![Features Dark](docs/screenshots/features-dark.png)

---

### 5.  Pricing Page (Dark)

![Pricing Dark](docs/screenshots/pricing-dark.png)

---

### 6.  Contact Page (Dark)

![Contact Dark](docs/screenshots/contact-dark.png)

---

### 7.  Dashboard (Dark)

![Dashboard Dark](docs/screenshots/dashboard-dark.png)

---

### 8.  Products Page (Dark)

![Products Dark](docs/screenshots/products-dark.png)

---

### 9.  Categories Page (Dark)

![Categories Dark](docs/screenshots/categories-dark.png)

---

### 10.  Suppliers Page (Dark)

![Suppliers Dark](docs/screenshots/suppliers-dark.png)

---

### 11.  Inventory Page (Dark)

![Inventory Dark](docs/screenshots/inventory-dark.png)

---

### 12.  Orders Page (Dark)

![Orders Dark](docs/screenshots/orders-dark.png)

---

### 13.  Customers Page (Dark)

![Customers Dark](docs/screenshots/customers-dark.png)

---

### 14.  Reports Page (Dark)

![Reports Dark](docs/screenshots/reports-dark.png)

---

### 15.  AI Assistant (Dark)

![AI Assistant Dark](docs/screenshots/ai-assistant-dark.png)

---

### 16.  Footer Page (Dark)

![Footer Dark](docs/screenshots/footer-dark.png)

---
---
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
- **Demand forecasting** — linear-trend forecast from real order history, plus a Groq-generated narrative insight
- **NL restocking assistant** — a chat interface that answers questions about your live inventory, grounded in real data (never invents numbers)
- **Smart reorder recommendations** — demand-driven (not just threshold-based) reorder quantities, plus one Groq-generated prioritization summary across the whole list

All three AI features degrade gracefully with a clear message if no Groq API key is configured — the app never crashes or hangs waiting on the AI provider.

### Other
- Dark mode (system-aware, manual toggle, persisted)
- Fully responsive (mobile sidebar, adaptive layouts)
- Accessible forms (label association, `aria-invalid`/`aria-describedby`, `aria-label`s on icon-only controls, `aria-live` toasts)

<br>

## Tech Stack

<table>
<tr><td width="120"><b>Frontend</b></td><td>

[Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript · Tailwind CSS 3 · Recharts (charts) · Framer Motion (animation) · `next-themes` (dark mode) · Axios (API client) · Socket.IO client (real-time)

</td></tr>
<tr><td><b>Backend</b></td><td>

[Flask 3](https://flask.palletsprojects.com/) (application factory pattern, Blueprints per resource) · SQLAlchemy + Alembic (Flask-Migrate) · Flask-JWT-Extended · Marshmallow · Flask-SocketIO · PyMySQL · Gunicorn + eventlet

</td></tr>
<tr><td><b>Database & Infra</b></td><td>

MySQL 8 (production/Docker; SQLite for isolated tests only) · Redis 7 (cache + Socket.IO message queue) · Nginx (reverse proxy) · Docker + Docker Compose

</td></tr>
<tr><td><b>AI</b></td><td>

Groq (`llama-3.3-70b-versatile`) via the `groq` SDK — free tier, no credit card required, fast inference

</td></tr>
<tr><td><b>Testing & CI</b></td><td>

Pytest (backend — 42 tests) · TypeScript + ESLint (frontend) · GitHub Actions (runs both suites on every push/PR)

</td></tr>
</table>

<br>

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
                                     │ MySQL  │ │ Redis │ │  Groq  │
                                     │  (data)│ │(cache/│ │  (AI)  │
                                     │        │ │pubsub)│ │        │
                                     └────────┘ └───────┘ └────────┘
```

- The frontend never talks to MySQL/Redis/Groq directly — every request goes through the Flask API.
- Redis is optional in local dev: if unreachable, the backend logs a warning and continues (Socket.IO falls back to local in-process delivery; nothing crashes).
- Groq is optional: if `GROQ_API_KEY` isn't set, every AI endpoint still returns real, correctly-computed data — just with a placeholder instead of the AI-generated narrative.

<br>

## Project Structure

<details>
<summary><b>Expand full tree</b></summary>

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

</details>

<br>

## Getting Started

### Option A: Docker Compose (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
cp .env.example .env
# edit .env if you want to change default passwords or add GROQ_API_KEY

docker compose up --build
```

This starts MySQL, Redis, the Flask backend, the Next.js frontend, and Nginx together. Once healthy, the app is available at **http://localhost** (routed through Nginx).

> **Note:** the `mysql` container publishes to host port **3307**, not 3306 — this avoids colliding with a MySQL install already running on your machine (a common conflict on Windows/Mac dev boxes). Nothing else needs to change: the backend talks to MySQL over the internal Docker network (`mysql:3306`), never through the host port. Port 3307 only matters if you want to connect an external MySQL client (Workbench, DBeaver) to the containerized database.

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

**Seeded login** (from `seed.py`):

| Role | Email | Password |
|---|---|---|
| Admin | `admin@stockflow.dev` | `password123` |
| Staff | `staff@stockflow.dev` | `password123` |

<br>

## Environment Variables

See [`.env.example`](.env.example) for the full, authoritative list. Summary:

| Variable | Used by | Notes |
|---|---|---|
| `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` | Docker Compose | MySQL container credentials |
| `DATABASE_URL` | Backend | SQLAlchemy connection string |
| `SECRET_KEY`, `JWT_SECRET_KEY` | Backend | Use long, random values in production |
| `REDIS_URL` | Backend | Optional — app degrades gracefully if unreachable |
| `CORS_ORIGINS` | Backend | Comma-separated list of allowed frontend origins |
| `GROQ_API_KEY` | Backend | Optional — get a free key at [console.groq.com/keys](https://console.groq.com/keys); AI features degrade gracefully without it |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend API base URL |
| `NEXT_PUBLIC_SOCKET_URL` | Frontend | Backend Socket.IO URL |

<br>

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

<br>

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

<br>

## Real-Time Alerts

The backend emits two Socket.IO events to all authenticated, connected clients:
- `low_stock_alert` — fires when a product's stock crosses at-or-below its threshold (not on every subsequent decrease, to avoid spam)
- `new_order_alert` — fires on every new order

The Socket.IO handshake requires a valid JWT (`auth: { token }`); unauthenticated connections are rejected. The frontend shows these as toast notifications app-wide via `DashboardLayout`.

<br>

## AI Features

All three AI features follow the same principle: **deterministic calculation for any number that matters, Groq only for narrative/prioritization** — a language model is never asked to compute a forecast or a quantity, which avoids hallucinated figures.

| Feature | Numbers computed by | Groq's role |
|---|---|---|
| Demand forecasting | Least-squares linear regression over 8 weeks of real order history | 2–3 sentence insight on the trend + a recommendation |
| NL assistant | — | Answers grounded in a live snapshot of your catalog, low-stock items, and top sellers; instructed to never invent numbers |
| Reorder recommendations | `avg_weekly_sales × coverage_weeks − current_stock`, only surfaced when real sales velocity indicates a stockout risk | One summary call prioritizing across the whole list (not one call per product) |

Get a free Groq API key at [console.groq.com/keys](https://console.groq.com/keys) (no credit card required) and set `GROQ_API_KEY` to enable the narrative layer. Every feature works correctly (real numbers, no crashes) even without a key — you'll just see a placeholder instead of the AI-generated text. Model used: `llama-3.3-70b-versatile`.

<br>

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

<br>

## CI/CD

`.github/workflows/ci.yml` runs on every push/PR to `main` and `feat/**`/`fix/**` branches:
- **backend job**: installs deps, runs the full pytest suite
- **frontend job**: installs deps, type-checks, lints, and runs a production build

<br>

## Troubleshooting

<details>
<summary><b>Dev-mode issues actually hit while building this project, and how to recognize/fix them — click to expand</b></summary>
<br>

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

**AI features show a "not configured" placeholder despite adding a Groq key**
See [AI Features](#ai-features) and [Environment Variables](#environment-variables) — most likely the `.env` file is in the wrong location for how you're running the app (`backend/.env` for manual runs vs. repo-root `.env` for Docker Compose), or the pasted key is the wrong provider's format (Groq keys start with `gsk_`, not `sk-...` or `AIzaSy...`).

**Login/API calls intermittently fail with a connection error, even though the backend "is running"**
Symptom: requests to `/api/...` randomly fail (`ERR_CONNECTION_REFUSED`) while the backend log shows repeated `Restarting with watchdog` / `Detected change in '...site-packages...'` lines. This is Flask's debug auto-reloader watching every installed package on disk and false-triggering a restart, which briefly drops the port mid-request. `backend/main.py` now runs with `use_reloader=False`, so this shouldn't recur — if you see it again, confirm that line wasn't reverted.

**`docker compose up` fails on the `mysql` service: "ports are not available ... bind: Only one usage of each socket address"**
Something else on your machine (often a local MySQL install/service) already has port 3306. This project's `docker-compose.yml` publishes MySQL on host port **3307** specifically to avoid this — if you're still hitting it, you likely have an old container or another service bound to the port in question; check with `netstat -ano | findstr :3306` (Windows) or `lsof -i :3306` (Mac/Linux) and stop whatever owns it, or change the host-side port in `docker-compose.yml` to something free.

**Socket.IO fails with `RuntimeError: Redis requires a monkey patched socket library to work with eventlet`, and dashboard API calls start timing out (504) right after**
Only happens when Redis is actually reachable (i.e. in Docker — local dev without Redis never hits this path). `flask-socketio` uses Redis as its cross-worker message queue when available, which requires `eventlet.monkey_patch()` to run before anything else imports `socket`. `backend/main.py` calls this as its very first line; if you see this error, something is importing a module before that patch runs (check nothing was added above it).

**Dashboard/API calls all return `401 Unauthorized` after the backend has been restarted or rebuilt several times**
Your browser's `localStorage` is holding a token from an earlier session that no longer matches the currently-running backend. Open DevTools → Application → Local Storage → delete `stockflow_token` and `stockflow_user`, then log in again for a fresh token.

</details>

<br>

## Deployment

Intended production targets: **Vercel** (frontend), **Render** (backend), a hosted MySQL provider, and Redis Cloud — all of which have free tiers suitable for this project. Deployment is tracked as a separate phase; see [Build Roadmap](#build-roadmap) below.

<br>

## Build Roadmap

StockFlow was built in phases, each independently tested end-to-end (backend: pytest + live curl verification; frontend: type-check, lint, production build, and browser verification) before moving to the next:

- [x] **Phase 1** — Frontend UI against mock data (Next.js, all pages, dark mode, marketing site)
- [x] **Phase 2** — Backend (Flask scaffold, DB models/migrations, JWT auth + RBAC, core CRUD, real-time alerts, CSV reports, frontend integration, Nginx + CI)
- [x] **Phase 3** — AI (demand forecasting, NL restocking assistant, smart reorder recommendations)
- [ ] **Phase 4** — Live deployment (Vercel + Render + hosted MySQL + Redis Cloud)

<br>

## About DevHatch Labs

<div align="center">

**Build Smarter. Scale Faster.**

</div>

DevHatch Labs' vision is to become a leading AI solutions company, helping businesses adopt artificial intelligence through practical, scalable, and affordable implementations. Our mission is centered on building practical AI solutions that create measurable business impact.

<table>
<tr>
<td valign="top" width="50%">

**AI Services**
- AI chatbots and intelligent agents
- AI calling agents
- WhatsApp automation
- CRM and workflow automation
- AI-powered customer support
- Intelligent document processing (RAG systems)

</td>
<td valign="top" width="50%">

**Web & Growth**
- Custom web development (MERN stack)
- SaaS development
- Business process automation
- Landing pages & personal branding

</td>
</tr>
</table>

<br>

## License

&copy; DevHatch Labs. All rights reserved.

<div align="center">
<sub>Built with Next.js, Flask, and Groq.</sub>
</div>
