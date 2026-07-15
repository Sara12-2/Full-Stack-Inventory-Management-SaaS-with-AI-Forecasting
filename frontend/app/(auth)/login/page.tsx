"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Warehouse, Mail, Lock } from "lucide-react";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/components/providers/ToastProvider";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
    await new Promise((r) => setTimeout(r, 500));
    saveToken("mock-token");
    showToast("success", "Welcome back.");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-neutral-900 p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Warehouse className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">StockFlow</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-2xl font-semibold leading-snug text-white">
            Inventory that never catches you off guard.
          </h1>
          <p className="mt-4 text-sm text-neutral-400">
            Real-time stock tracking, order management, and business reports — built for teams who can&apos;t afford to run out of stock.
          </p>
        </div>

        <p className="text-xs text-neutral-500">© 2026 StockFlow</p>
      </div>

      <div className="flex w-full items-center justify-center bg-surface p-8 dark:bg-surface-dark lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Warehouse className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">StockFlow</span>
          </div>

          <h2 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">Sign in</h2>
          <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">Welcome back to StockFlow</p>

          <div className="mt-4 rounded-lg border border-primary-border bg-primary-light px-3 py-2 text-xs text-primary dark:border-primary/20 dark:bg-primary/10">
            Phase 1 demo — any email and password will work.
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-9" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary dark:text-text-primary-dark">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" />
                Remember me
              </label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
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
