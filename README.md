# StockFlow

Inventory and order management dashboard for small e-commerce businesses. Track stock, manage orders, and get real-time low-stock alerts — no spreadsheets, no expensive ERP software.

## Overview

Small e-commerce store owners, retail shop managers, and dropshipping businesses often manage inventory manually on spreadsheets or paper, leading to stockouts, lost orders, and no single view of business health. StockFlow solves this with a clean, self-hostable dashboard covering product management, inventory tracking, order processing, supplier management, and business reporting.

## Features

- **Authentication** — JWT-based login/signup with Admin and Staff roles
- **Dashboard** — revenue trends, low-stock alerts, recent orders, top-selling products
- **Product management** — full CRUD with categories, suppliers, and stock thresholds
- **Inventory tracking** — manual stock adjustments with full movement history
- **Order management** — order creation with automatic stock deduction, status tracking, cancellation with stock restoration
- **Supplier management** — track suppliers and their products
- **Reports** — inventory, order, revenue, and stock movement reports with CSV export
- **Real-time alerts** — instant low-stock notifications via Socket.io

## Tech Stack

**Frontend**
- Next.js 14 (App Router) + React
- Tailwind CSS
- Recharts (data visualization)
- Axios, Socket.io client

**Backend**
- Flask (Python) + Flask-RESTful
- Flask-JWT-Extended (authentication)
- Flask-SocketIO (real-time notifications)
- SQLAlchemy ORM + Marshmallow (serialization)

**Database**
- MySQL — business data
- Redis — session cache and alert queue

**Infrastructure**
- Docker & Docker Compose
- Nginx reverse proxy
- GitHub Actions CI/CD

## Project Structure

```
stockflow/
├── frontend/          # Next.js dashboard
├── backend/           # Flask REST API
├── nginx/             # reverse proxy config
├── docker-compose.yml
└── .github/workflows/ # CI/CD
```

## Frontend Structure
```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── inventory/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── suppliers/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── dashboard/
│   ├── inventory/
│   ├── layout/
│   ├── orders/
│   ├── suppliers/
│   └── ui/
├── hooks/
├── lib/
├── public/
├── types/
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MySQL 8+
- Docker (optional, for containerized setup)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Full stack with Docker
```bash
docker-compose up --build
```

## Environment Variables

See `.env.example` for required variables (Flask secrets, MySQL credentials, Redis URL, API URLs).

## Roadmap

- [x] Frontend UI with mock data
- [ ] Backend API (Flask + MySQL)
- [ ] Real-time Socket.io alerts
- [ ] CSV report exports
- [ ] Deployment (Render)

## License

MIT
