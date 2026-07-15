"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, removeToken } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // ✅ Clear any existing token on login page load
    removeToken();
    
    // Then check if authenticated (which will be false after clearing)
    const checkAuth = () => {
      const auth = isAuthenticated();
      
      if (auth) {
        router.push("/dashboard");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0D9479] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#0D9479] to-[#0A7A63] p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <span className="text-xl font-bold text-white">SF</span>
          </div>
          <span className="text-xl font-bold text-white">StockFlow</span>
        </div>

        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold leading-tight text-white">
            Manage your inventory
            <br />
            <span className="text-white/80">without the chaos.</span>
          </h1>
          <p className="text-white/70">
            Real-time stock tracking, order management, and business reports — 
            built for teams who can't afford to run out of stock.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white/20 bg-white/10"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/32?img=${i})`,
                    backgroundSize: 'cover',
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-white/60">Trusted by 500+ teams</span>
          </div>
        </div>

        <p className="text-sm text-white/40">© 2026 StockFlow. All rights reserved.</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center bg-[var(--color-background)] p-8 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}