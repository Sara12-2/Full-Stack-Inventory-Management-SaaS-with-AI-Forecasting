import Link from "next/link";
import { Warehouse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card dark:border-border-dark dark:bg-card-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-brand">
              <Warehouse className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-text-primary dark:text-text-primary-dark">StockFlow</span>
          </div>
          <div className="flex gap-6 text-sm text-text-secondary dark:text-text-secondary-dark">
            <Link href="/features" className="hover:text-text-primary dark:hover:text-text-primary-dark">Features</Link>
            <Link href="/pricing" className="hover:text-text-primary dark:hover:text-text-primary-dark">Pricing</Link>
            <Link href="/about" className="hover:text-text-primary dark:hover:text-text-primary-dark">About</Link>
            <Link href="/contact" className="hover:text-text-primary dark:hover:text-text-primary-dark">Contact</Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
          © 2026 StockFlow by DevHatch Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
