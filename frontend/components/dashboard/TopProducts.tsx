"use client";

import { motion } from "framer-motion";
import { TopProduct } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";

const rankStyles = ["bg-gradient-brand", "bg-accent", "bg-slate-400 dark:bg-slate-600", "bg-slate-300 dark:bg-slate-700", "bg-slate-200 dark:bg-slate-800"];

export default function TopProducts({ products }: { products: TopProduct[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
    >
      <h3 className="mb-4 font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">Top Products</h3>
      <ul className="space-y-3">
        {products.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${rankStyles[i] || "bg-slate-200"}`}>
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{p.name}</p>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{p.units_sold} units sold</p>
            </div>
            <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">{formatCurrency(p.revenue)}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
