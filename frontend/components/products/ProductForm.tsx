"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product, ProductStatus } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { X, ImagePlus } from "lucide-react";

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

const emptyForm: Partial<Product> = {
  name: "", sku: "", category_id: undefined, supplier_id: undefined,
  price: 0, cost_price: 0, stock_quantity: 0, low_stock_threshold: 10,
  status: "active" as ProductStatus,
};

const inputClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";
const labelClass = "mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark";

export default function ProductForm({ open, product, categories, suppliers, onClose, onSave }: ProductFormProps) {
  const [form, setForm] = useState<Partial<Product>>(emptyForm);

  useEffect(() => {
    setForm(product || emptyForm);
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl dark:bg-card-dark"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-text-primary dark:text-text-primary-dark">{product ? "Edit Product" : "Add Product"}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
                <X className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-dashed border-border p-4 dark:border-border-dark">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500">
                  <ImagePlus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">Product image</p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Upload not yet wired to backend</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Name</label>
                <input required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>SKU</label>
                <input required value={form.sku || ""} onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Category</label>
                  <select value={form.category_id || ""} onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })} className={inputClass}>
                    <option value="">Select</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Supplier</label>
                  <select value={form.supplier_id || ""} onChange={(e) => setForm({ ...form, supplier_id: Number(e.target.value) })} className={inputClass}>
                    <option value="">Select</option>
                    {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Price</label>
                  <input type="number" step="0.01" required value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Cost price</label>
                  <input type="number" step="0.01" required value={form.cost_price ?? 0} onChange={(e) => setForm({ ...form, cost_price: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Stock quantity</label>
                  <input type="number" required value={form.stock_quantity ?? 0} onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Low stock threshold</label>
                  <input type="number" required value={form.low_stock_threshold ?? 10} onChange={(e) => setForm({ ...form, low_stock_threshold: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={form.status || "active"} onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })} className={inputClass}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-slate-50 dark:border-border-dark dark:text-text-primary-dark dark:hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
