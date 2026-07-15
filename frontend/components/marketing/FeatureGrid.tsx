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
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">Everything you need, nothing you don&apos;t</h2>
          <p className="mt-3 text-text-secondary dark:text-text-secondary-dark">A focused feature set built around how small e-commerce teams actually operate.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text-primary dark:text-text-primary-dark">{f.title}</h3>
              <p className="mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
