"use client";

import { useState, useEffect } from "react";
import { Product, ProductStatus } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { X } from "lucide-react";

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

const emptyForm: Partial<Product> = {
  name: "",
  sku: "",
  category_id: undefined,
  supplier_id: undefined,
  price: 0,
  cost_price: 0,
  stock_quantity: 0,
  low_stock_threshold: 10,
  status: "active" as ProductStatus,
};

export default function ProductForm({
  open,
  product,
  categories,
  suppliers,
  onClose,
  onSave,
}: ProductFormProps) {
  const [form, setForm] = useState<Partial<Product>>(emptyForm);

  useEffect(() => {
    setForm(product || emptyForm);
  }, [product, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {product ? "Edit Product" : "Add Product"}
          </h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Name</label>
            <input
              required
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">SKU</label>
            <input
              required
              value={form.sku || ""}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Category</label>
              <select
                value={form.category_id || ""}
                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              >
                <option value="">Select</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Supplier</label>
              <select
                value={form.supplier_id || ""}
                onChange={(e) => setForm({ ...form, supplier_id: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              >
                <option value="">Select</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Price</label>
              <input
                type="number" step="0.01" required
                value={form.price ?? 0}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Cost price</label>
              <input
                type="number" step="0.01" required
                value={form.cost_price ?? 0}
                onChange={(e) => setForm({ ...form, cost_price: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Stock quantity</label>
              <input
                type="number" required
                value={form.stock_quantity ?? 0}
                onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Low stock threshold</label>
              <input
                type="number" required
                value={form.low_stock_threshold ?? 10}
                onChange={(e) => setForm({ ...form, low_stock_threshold: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Status</label>
            <select
              value={form.status || "active"}
              onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
