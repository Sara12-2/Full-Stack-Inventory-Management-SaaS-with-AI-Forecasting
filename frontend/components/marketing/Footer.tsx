"use client";

import Link from "next/link";
import { Package, Heart, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-custom py-10">
        
        {/* Main Footer */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D9479]">
                <Package className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[var(--color-text)]">StockFlow</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Inventory management for growing e-commerce teams.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[#0D9479]">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[#0D9479]">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[#0D9479]">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)]">Product</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/features" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)]">Company</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)]">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[var(--color-text-muted)] hover:text-[#0D9479]">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row">
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; {currentYear} StockFlow. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
            Built with <Heart className="h-3.5 w-3.5 text-red-500" /> by
            <span className="text-[var(--color-text)]">DevHatch Labs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}