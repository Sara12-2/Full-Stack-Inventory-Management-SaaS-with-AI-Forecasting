"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Sun, Moon, Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-[#E8EDF2] bg-white/80 backdrop-blur-sm dark:border-[#2A3648] dark:bg-[#0F172A]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9479]">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-[#0F172A] dark:text-white">StockFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#475569] transition-colors hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-md p-2 text-[#475569] transition-colors hover:bg-[#F1F4F8] dark:text-[#94A3B8] dark:hover:bg-[#243044]"
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="hidden text-sm text-[#475569] transition-colors hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white sm:block"
          >
            Log in
          </Link>

          {/* Get Started */}
          <Link
            href="/signup"
            className="rounded-lg bg-[#0D9479] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A7A63]"
          >
            Get Started
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-[#475569] transition-colors hover:bg-[#F1F4F8] dark:text-[#94A3B8] dark:hover:bg-[#243044] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#E8EDF2] bg-white dark:border-[#2A3648] dark:bg-[#0F172A] md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#F1F4F8] dark:text-[#94A3B8] dark:hover:bg-[#243044]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#F1F4F8] dark:text-[#94A3B8] dark:hover:bg-[#243044]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[#0D9479] px-3 py-2.5 text-center text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}