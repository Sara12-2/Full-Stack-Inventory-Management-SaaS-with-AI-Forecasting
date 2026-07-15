"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/product";
import { X, Plus, Trash2 } from "lucide-react";

interface LineItem {
  product_id: number;
  quantity: number;
}

interface OrderFormProps {
  open: boolean;
  products: Product[];
  onClose: () => void;
  onSave: (data: { customer_name: string; customer_email: string; customer_phone: string; items: LineItem[] }) => void;
}

const inputClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";
const labelClass = "mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark";

export default function OrderForm({ open, products, onClose, onSave }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ product_id: products[0]?.id || 0, quantity: 1 }]);

  const addItem = () => setItems([...items, { product_id: products[0]?.id || 0, quantity: 1 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof LineItem, value: number) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: value };
    setItems(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ customer_name: customerName, customer_email: customerEmail, customer_phone: customerPhone, items });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6 shadow-2xl dark:bg-card-dark">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary dark:text-text-primary-dark">New Order</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/10">
                <X className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Customer name</label>
                <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Email</label>
                  <input required type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">Items</label>
                  <button type="button" onClick={addItem} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    <Plus className="h-3.5 w-3.5" /> Add item
                  </button>
                </div>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select value={item.product_id} onChange={(e) => updateItem(idx, "product_id", Number(e.target.value))} className={`flex-1 ${inputClass}`}>
                        {products.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.stock_quantity} in stock)</option>)}
                      </select>
                      <input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))} className={`w-20 ${inputClass}`} />
                      <button type="button" onClick={() => removeItem(idx)} className="rounded-lg p-1.5 hover:bg-danger-light dark:hover:bg-danger/10">
                        <Trash2 className="h-3.5 w-3.5 text-danger" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-slate-50 dark:border-border-dark dark:text-text-primary-dark dark:hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                  Create Order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
