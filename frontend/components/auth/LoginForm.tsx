"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/components/providers/ToastProvider";

export default function LoginForm() {
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
    <div className="w-full max-w-sm">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Sign in</h2>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Welcome back to StockFlow</p>

      <div className="mt-4 rounded-lg border border-[#0D9479]/25 bg-[#0D9479]/10 px-3 py-2 text-xs text-[#0D9479]">
        Phase 1 demo — any email and password will work.
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input pl-9"
            />
          </div>
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input pl-9"
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-[var(--color-border)] text-[#0D9479] focus:ring-[#0D9479]" />
            Remember me
          </label>
          <a href="#" className="font-medium text-[#0D9479] hover:underline">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-[#0D9479] hover:underline">Sign up</Link>
      </p>
    </div>
  );
}