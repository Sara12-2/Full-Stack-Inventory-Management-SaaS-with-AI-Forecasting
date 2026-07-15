"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

export default function ContactForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("error", "Please fill in every field.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    showToast("success", "Message sent — we'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-2xl border border-border bg-card p-8 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Message</label>
        <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
      </div>
      <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );
}
