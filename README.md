# 📦 StockFlow - Intelligent Inventory Management SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-24-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

---

## 📊 Project Overview

**StockFlow** is an intelligent inventory and order management SaaS platform designed for small and mid-sized e-commerce businesses. It replaces manual, spreadsheet-based stock tracking with a modern, real-time dashboard that covers products, inventory, suppliers, orders, and analytics.

---

## 🎯 Key Features

### 📦 **Inventory Management**
- ✅ Real-time stock tracking
- ✅ Automated low-stock alerts
- ✅ Complete movement history
- ✅ Category-based organization
- ✅ Bulk import/export

### 📋 **Order Management**
- ✅ End-to-end order lifecycle
- ✅ Status tracking (Pending → Processing → Shipped → Delivered)
- ✅ Order history & analytics
- ✅ Export reports (CSV/PDF)
- ✅ Cancellation with stock restoration

### 📊 **Analytics Dashboard**
- ✅ Sales analytics with charts
- ✅ Inventory statistics
- ✅ Product performance metrics
- ✅ Stock value reports
- ✅ Revenue tracking

### 🤖 **AI-Powered Features** (Phase 3)
- ✅ Demand forecasting from historical data
- ✅ Natural language inventory assistant
- ✅ Smart restock quantity recommendations
- ✅ Predictive analytics

### 🔔 **Real-Time Features**
- ✅ Live low-stock alerts
- ✅ Instant order notifications
- ✅ WebSocket-powered updates
- ✅ Redis-backed messaging

### 👥 **User Management**
- ✅ JWT Authentication
- ✅ Role-based access control (Admin/Staff)
- ✅ Secure password hashing
- ✅ Session management


---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 (App Router) | Framework |
| React | 19 | UI Library |
| TypeScript | 5.5 | Type Safety |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | Latest | Component Library |
| Framer Motion | Latest | Animations |
| Recharts | Latest | Charts |
| React Hook Form | Latest | Forms |
| Zod | Latest | Validation |
| TanStack Query | Latest | Data Fetching |
| Axios | Latest | HTTP Client |
| Socket.IO Client | Latest | Real-time |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 3.0 | Framework |
| Flask-RESTX | Latest | API + Auto Docs |
| SQLAlchemy | Latest | ORM |
| Alembic | Latest | Database Migrations |
| Marshmallow | Latest | Serialization |
| Flask-JWT-Extended | Latest | Authentication |
| Flask-SocketIO | Latest | Real-time WebSockets |
| Gunicorn | Latest | Production Server |

### **Infrastructure**
| Technology | Version | Purpose |
|------------|---------|---------|
| MySQL | 8 | Primary Database |
| Redis | 7 | Cache/Real-time Backbone |
| Docker | 24 | Containerization |
| Nginx | Latest | Reverse Proxy |
| Cloudinary | Latest | File Storage (Production) |
| GitHub Actions | Latest | CI/CD |

---

## 📁 Project Structure
```bash
Stockflow_Full_Stack_Dashboard/
├── frontend/
│ ├── app/
│ │ ├── (auth)/
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ └── register/
│ │ │ └── page.tsx
│ │ ├── (marketing)/
│ │ │ ├── page.tsx # Landing Page
│ │ │ ├── features/
│ │ │ │ └── page.tsx
│ │ │ ├── pricing/
│ │ │ │ └── page.tsx
│ │ │ ├── about/
│ │ │ │ └── page.tsx
│ │ │ └── contact/
│ │ │ └── page.tsx
│ │ ├── dashboard/
│ │ │ ├── page.tsx # Dashboard Home
│ │ │ ├── products/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [id]/
│ │ │ │ └── page.tsx
│ │ │ ├── inventory/
│ │ │ │ └── page.tsx
│ │ │ ├── orders/
│ │ │ │ ├── page.tsx
│ │ │ │ └── [id]/
│ │ │ │ └── page.tsx
│ │ │ ├── suppliers/
│ │ │ │ └── page.tsx
│ │ │ ├── categories/
│ │ │ │ └── page.tsx
│ │ │ ├── customers/
│ │ │ │ └── page.tsx
│ │ │ ├── reports/
│ │ │ │ └── page.tsx
│ │ │ ├── ai-assistant/
│ │ │ │ └── page.tsx
│ │ │ └── settings/
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── ui/ # shadcn/ui components
│ │ │ ├── dashboard/
│ │ │ │ ├── Sidebar.tsx
│ │ │ │ ├── Header.tsx
│ │ │ │ ├── StatsCards.tsx
│ │ │ │ └── RecentOrders.tsx
│ │ │ ├── forms/
│ │ │ │ ├── ProductForm.tsx
│ │ │ │ └── OrderForm.tsx
│ │ │ └── charts/
│ │ │ ├── SalesChart.tsx
│ │ │ └── InventoryChart.tsx
│ │ ├── lib/
│ │ │ ├── mockData.ts # Phase 1 Mock Data
│ │ │ ├── api.ts # API Client
│ │ │ └── utils.ts # Utilities
│ │ ├── hooks/
│ │ │ ├── useAuth.ts
│ │ │ ├── useSocket.ts
│ │ │ └── useDashboard.ts
│ │ ├── types/
│ │ │ └── index.ts # TypeScript Interfaces
│ │ ├── layout.tsx
│ │ ├── globals.css
│ │ └── providers.tsx
│ ├── public/
│ │ ├── images/
│ │ └── icons/
│ ├── package.json
│ ├── next.config.js
│ ├── tailwind.config.ts
│ ├── tsconfig.json
│ └── .env.local
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ ├── init.py
│ │ │ ├── auth.py
│ │ │ ├── products.py
│ │ │ ├── orders.py
│ │ │ ├── inventory.py
│ │ │ ├── suppliers.py
│ │ │ ├── categories.py
│ │ │ ├── reports.py
│ │ │ └── ai.py # Phase 3
│ │ ├── models/
│ │ │ ├── init.py
│ │ │ ├── user.py
│ │ │ ├── product.py
│ │ │ ├── order.py
│ │ │ ├── inventory.py
│ │ │ └── supplier.py
│ │ ├── schemas/
│ │ │ ├── init.py
│ │ │ ├── product.py
│ │ │ └── order.py
│ │ ├── services/
│ │ │ ├── init.py
│ │ │ ├── auth_service.py
│ │ │ ├── inventory_service.py
│ │ │ └── report_service.py
│ │ ├── utils/
│ │ │ ├── init.py
│ │ │ └── validators.py
│ │ └── config.py
│ ├── migrations/ # Alembic migrations
│ ├── tests/
│ ├── uploads/ # Local file storage (dev)
│ ├── requirements.txt
│ ├── run.py
│ └── .env.example
│
├── docker/
│ ├── nginx/
│ │ └── default.conf
│ ├── mysql/
│ │ └── my.cnf
│ └── redis/
│ └── redis.conf
│
├── scripts/
│ └── setup.sh
├── docs/
│ └── StockFlow-Blueprint-Report.docx
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.10+ ([Download](https://python.org/))
- MySQL 8+ ([Download](https://mysql.com/))
- Redis 7+ ([Download](https://redis.io/))
- Docker (Optional, for containerized setup)

---

## 🏃‍♂️ Running the Frontend

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```
### Step 2: Install Dependencies
```bash
npm install
```
### Step 3: Create Environment Variables
```bash
Create .env.local file:
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:5000
```
### Step 4: Run Development Server
```bash
npm run dev
```
### Step 5: Open in Browser
```bash
text
http://localhost:3000
```
