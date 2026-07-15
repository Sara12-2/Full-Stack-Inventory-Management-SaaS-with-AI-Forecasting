"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/components/providers/ToastProvider";

export default function SignupForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      showToast("error", "Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    saveToken("mock-token");
    showToast("success", "Account created — welcome to StockFlow!");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Create your account</h2>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Start managing your inventory today</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label htmlFor="signup-name" className="label">Name</label>
          <div className="relative">
            <User aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input pl-9"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "signup-name-error" : undefined}
            />
          </div>
          {fieldErrors.name && <p id="signup-name-error" className="mt-1 text-xs text-danger">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="signup-email" className="label">Email</label>
          <div className="relative">
            <Mail aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-9"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
            />
          </div>
          {fieldErrors.email && <p id="signup-email-error" className="mt-1 text-xs text-danger">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="signup-password" className="label">Password</label>
          <div className="relative">
            <Lock aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-9 pr-10"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "signup-password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.password && <p id="signup-password-error" className="mt-1 text-xs text-danger">{fieldErrors.password}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
          {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[#0D9479] hover:underline">Log in</Link>
      </p>
    </div>
  );
}
