"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2, Package } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border bg-slate-50/60 dark:border-border-dark dark:bg-white/[0.02]">
          <tr className="text-xs uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark">
            <th className="px-5 py-3 font-medium">Product</th>
            <th className="px-5 py-3 font-medium">SKU</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Supplier</th>
            <th className="px-5 py-3 font-medium">Price</th>
            <th className="px-5 py-3 font-medium">Stock</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-text-secondary dark:text-text-secondary-dark">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p, i) => {
              const low = p.stock_quantity <= p.low_stock_threshold;
              return (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  className="transition-colors hover:bg-slate-50/60 dark:hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 dark:from-white/10 dark:to-white/5 dark:text-slate-500">
                        <Package className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-text-primary dark:text-text-primary-dark">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-dark">{p.sku}</td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-dark">{p.category_name || "—"}</td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-dark">{p.supplier_name || "—"}</td>
                  <td className="px-5 py-3 font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${low ? "bg-danger-light text-danger dark:bg-danger/10" : "bg-success-light text-success dark:bg-success/10"}`}>
                      {p.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.status === "active" ? "bg-primary-light text-primary dark:bg-primary/10" : "bg-slate-100 text-text-secondary dark:bg-white/5 dark:text-text-secondary-dark"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => onEdit(p)} className="rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
                        <Pencil className="h-3.5 w-3.5 text-text-secondary dark:text-text-secondary-dark" />
                      </button>
                      <button onClick={() => onDelete(p)} className="rounded-lg p-1.5 transition-colors hover:bg-danger-light dark:hover:bg-danger/10">
                        <Trash2 className="h-3.5 w-3.5 text-danger" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
