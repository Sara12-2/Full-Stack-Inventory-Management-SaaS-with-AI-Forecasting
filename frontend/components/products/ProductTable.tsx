"use client";

import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2, Package, PackagePlus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAddNew?: () => void;
}

export default function ProductTable({ products, onEdit, onDelete, onAddNew }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
        <EmptyState
          icon={PackagePlus}
          title="No products yet"
          description="Add your first product to start tracking inventory."
          actionLabel={onAddNew ? "Add Product" : undefined}
          onAction={onAddNew}
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border dark:border-border-dark">
          <tr className="text-xs text-text-secondary dark:text-text-secondary-dark">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Supplier</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {products.map((p) => {
            const low = p.stock_quantity <= p.low_stock_threshold;
            return (
              <tr key={p.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-text-secondary dark:bg-white/5 dark:text-text-secondary-dark">
                      <Package className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium text-text-primary dark:text-text-primary-dark">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary dark:text-text-secondary-dark">{p.sku}</td>
                <td className="px-4 py-3 text-text-secondary dark:text-text-secondary-dark">{p.category_name || "—"}</td>
                <td className="px-4 py-3 text-text-secondary dark:text-text-secondary-dark">{p.supplier_name || "—"}</td>
                <td className="px-4 py-3 font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(p.price)}</td>
                <td className="px-4 py-3"><Badge variant={low ? "danger" : "success"}>{p.stock_quantity} in stock</Badge></td>
                <td className="px-4 py-3"><Badge variant={p.status === "active" ? "primary" : "default"}>{p.status}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => onEdit(p)} className="rounded-md p-1.5 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/10">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => onDelete(p)} className="rounded-md p-1.5 text-text-secondary hover:bg-danger-light hover:text-danger dark:text-text-secondary-dark dark:hover:bg-danger/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
