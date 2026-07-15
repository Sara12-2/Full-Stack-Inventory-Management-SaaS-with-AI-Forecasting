"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Search, Bell, ChevronDown, Sun, Moon, LogOut, User, Settings as SettingsIcon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers/ToastProvider";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    clearToken();
    showToast("info", "You've been logged out.");
    router.push("/login");
  };

  const isDark = mounted && theme === "dark";

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border px-4 dark:border-border-dark sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="shrink-0 rounded-lg p-2 text-text-secondary transition-colors hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-white/80 py-2 pl-9 pr-3 text-sm text-text-primary outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark/80 dark:text-text-primary-dark"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5"
          aria-label="Toggle theme"
        >
          <motion.div initial={false} animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </motion.div>
        </button>

        <button className="relative hidden rounded-lg p-2 text-text-secondary transition-colors hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5 sm:block">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 sm:gap-2 sm:px-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-xs font-semibold text-white">
              SM
            </div>
            <ChevronDown className="hidden h-4 w-4 text-text-secondary dark:text-text-secondary-dark sm:block" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
              >
                <div className="border-b border-border px-3 py-2 dark:border-border-dark">
                  <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">Sara Manzoor</p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Admin</p>
                </div>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-slate-50 dark:text-text-primary-dark dark:hover:bg-white/5">
                  <User className="h-4 w-4" /> Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-slate-50 dark:text-text-primary-dark dark:hover:bg-white/5">
                  <SettingsIcon className="h-4 w-4" /> Settings
                </button>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-danger/10">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
