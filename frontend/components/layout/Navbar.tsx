"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Search, Bell, ChevronDown, Sun, Moon, LogOut, User, Settings as SettingsIcon, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-card px-4 dark:border-border-dark dark:bg-card-dark sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button onClick={onMenuClick} className="shrink-0 rounded-lg p-1.5 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5 md:hidden">
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-surface py-1.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-shadow focus:border-primary focus:bg-card focus:shadow-[0_0_0_3px_rgba(13,148,121,0.12)] dark:border-border-dark dark:bg-surface-dark dark:text-text-primary-dark dark:focus:bg-card-dark"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button onClick={() => setTheme(isDark ? "light" : "dark")} className="rounded-lg p-2 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
          {isDark ? <Moon className="h-[17px] w-[17px]" /> : <Sun className="h-[17px] w-[17px]" />}
        </button>
        <button className="relative hidden rounded-lg p-2 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5 sm:block">
          <Bell className="h-[17px] w-[17px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1.5 rounded-lg py-1 pl-1 pr-1.5 hover:bg-neutral-100 dark:hover:bg-white/5 sm:pr-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">SM</div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-text-secondary dark:text-text-secondary-dark sm:block" />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card p-1 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark"
              >
                <div className="border-b border-border px-3 py-2 dark:border-border-dark">
                  <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">Sara Manzoor</p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Admin</p>
                </div>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-text-primary hover:bg-neutral-50 dark:text-text-primary-dark dark:hover:bg-white/5">
                  <User className="h-4 w-4" /> Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-text-primary hover:bg-neutral-50 dark:text-text-primary-dark dark:hover:bg-white/5">
                  <SettingsIcon className="h-4 w-4" /> Settings
                </button>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-danger/10">
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
