"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product, MovementType } from "@/types/product";
import { X } from "lucide-react";

interface StockAdjustModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAdjust: (productId: number, type: MovementType, quantity: number, reason: string) => void;
}

const inputClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";
const labelClass = "mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark";

export default function StockAdjustModal({ open, product, onClose, onAdjust }: StockAdjustModalProps) {
  const [type, setType] = useState<MovementType>("in");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    onAdjust(product.id, type, quantity, reason);
    setQuantity(1);
    setReason("");
  };

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md rounded-xl bg-card p-6 shadow-2xl dark:bg-card-dark">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary dark:text-text-primary-dark">Adjust stock — {product.name}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/10">
                <X className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>
            <p className="mb-4 text-sm text-text-secondary dark:text-text-secondary-dark">Current stock: {product.stock_quantity}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Movement type</label>
                <select value={type} onChange={(e) => setType(e.target.value as MovementType)} className={inputClass}>
                  <option value="in">Stock In</option>
                  <option value="out">Stock Out</option>
                  <option value="adjustment">Adjustment</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Quantity</label>
                <input type="number" required min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Reason</label>
                <input required value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Restock, damaged, correction" className={inputClass} />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-slate-50 dark:border-border-dark dark:text-text-primary-dark dark:hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                  Apply
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
