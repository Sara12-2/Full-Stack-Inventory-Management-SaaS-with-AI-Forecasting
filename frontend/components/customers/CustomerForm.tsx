"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Customer } from "@/types/customer";
import { X } from "lucide-react";

interface CustomerFormProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Partial<Customer>) => void;
}

const emptyForm: Partial<Customer> = { name: "", email: "", phone: "" };
const inputClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";
const labelClass = "mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark";

export default function CustomerForm({ open, customer, onClose, onSave }: CustomerFormProps) {
  const [form, setForm] = useState<Partial<Customer>>(emptyForm);

  useEffect(() => {
    setForm(customer || emptyForm);
  }, [customer, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md rounded-xl bg-card p-6 shadow-2xl dark:bg-card-dark">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary dark:text-text-primary-dark">{customer ? "Edit Customer" : "Add Customer"}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/10">
                <X className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input required type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input required value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-slate-50 dark:border-border-dark dark:text-text-primary-dark dark:hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
