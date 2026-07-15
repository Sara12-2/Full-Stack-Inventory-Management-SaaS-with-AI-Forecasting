"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Product } from "@/types/product";

export default function LowStockAlert({ products }: { products: Product[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-warning/20 bg-warning-light p-5 shadow-soft dark:border-warning/20 dark:bg-warning/5 dark:shadow-soft-dark"
    >
      <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">
        <AlertTriangle className="h-4 w-4 text-warning" />
        Low Stock Alerts
      </h3>
      {products.length === 0 ? (
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">All products are sufficiently stocked.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between text-sm">
              <span className="font-medium text-text-primary dark:text-text-primary-dark">{p.name}</span>
              <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">
                {p.stock_quantity} / {p.low_stock_threshold}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
