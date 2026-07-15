"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Warehouse, Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MarketingNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  return (
    <header className="glass sticky top-0 z-40 border-b border-border dark:border-border-dark">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand shadow-glow">
            <Warehouse className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-lg font-bold text-text-primary dark:text-text-primary-dark">StockFlow</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="rounded-lg p-2 text-text-secondary hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
            {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </button>
          <Link href="/login" className="hidden text-sm font-medium text-text-primary hover:underline dark:text-text-primary-dark sm:block">
            Log in
          </Link>
          <Link href="/signup" className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Get Started
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-text-secondary hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5 md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border dark:border-border-dark md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
                  {l.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-slate-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
                Log in
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
