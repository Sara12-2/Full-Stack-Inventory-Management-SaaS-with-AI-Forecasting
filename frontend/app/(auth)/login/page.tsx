"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Warehouse, Mail, Lock, Loader2 } from "lucide-react";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/components/providers/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("error", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      // Phase 1 stub — no backend yet. Any email/password works.
      // Swap this for a real lib/api.login() call once Phase 2 is built.
      await new Promise((resolve) => setTimeout(resolve, 500));
      saveToken("mock-token");
      showToast("success", "Welcome back!");
      router.push("/dashboard");
    } catch {
      showToast("error", "Couldn't sign you in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
        <motion.div animate={{ y: [0, 20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <motion.div animate={{ y: [0, -30, 0], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-24 right-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand shadow-glow">
            <Warehouse className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-white">StockFlow</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative z-10 max-w-md">
          <h1 className="font-heading text-3xl font-bold leading-tight text-white">
            Run inventory like the business depends on it —
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> because it does.</span>
          </h1>
          <p className="mt-4 text-sm text-slate-400">Real-time stock tracking, order management, and business reports.</p>
        </motion.div>

        <div className="relative z-10 text-xs text-slate-500">© 2026 StockFlow. All rights reserved.</div>
      </div>

      <div className="flex w-full items-center justify-center bg-surface p-8 dark:bg-surface-dark lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                <Warehouse className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-bold text-text-primary dark:text-text-primary-dark">StockFlow</span>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-bold text-text-primary dark:text-text-primary-dark">Welcome back</h2>
          <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">Sign in to your StockFlow account</p>

          <div className="mt-4 rounded-lg border border-primary/20 bg-primary-light px-3 py-2 text-xs text-primary dark:border-primary/20 dark:bg-primary/10">
            Phase 1 demo — any email and password will work.
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
                Remember me
              </label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-glow transition-shadow hover:shadow-lg disabled:opacity-70">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary dark:text-text-secondary-dark">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
