"use client";

import { motion } from "framer-motion";
import { Package, Boxes, ShoppingCart, BarChart3, Bell, Truck } from "lucide-react";

const features = [
  { icon: Package, title: "Product Management", desc: "Full CRUD with categories, suppliers, and images — organized the way your catalog actually works." },
  { icon: Boxes, title: "Real-Time Inventory", desc: "Every stock change is logged. Know exactly what moved, when, and why." },
  { icon: ShoppingCart, title: "Order Management", desc: "Orders auto-deduct stock on creation and restore it on cancellation — no manual reconciliation." },
  { icon: BarChart3, title: "Live Analytics", desc: "Revenue trends, top products, and business health in one dashboard, not six spreadsheets." },
  { icon: Bell, title: "Low-Stock Alerts", desc: "Get notified before you run out, not after a customer tells you." },
  { icon: Truck, title: "Supplier Tracking", desc: "Keep every supplier relationship and their products organized in one place." },
];

export default function FeatureGrid() {
  return (
    <section className="section-spacing px-4 sm:px-6">
      <div className="container-custom">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            A focused feature set built around how small e-commerce teams actually operate.
          </p>
        </div>

        <div className="feature-grid mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-interactive p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D9479]">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-text)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}