"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, Boxes, ShoppingCart, Truck, Tag,
  FileBarChart, Settings, ChevronsLeft, ChevronsRight, Warehouse, X, Users, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/inventory", label: "Inventory", icon: Boxes },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Truck },
  { href: "/dashboard/categories", label: "Categories", icon: Tag },
  { href: "/dashboard/reports", label: "Reports", icon: FileBarChart },
  { href: "/dashboard/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-0.5 px-2.5 py-2">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <div key={href} className="group relative">
            <Link
              href={href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-light text-primary dark:bg-primary/10"
                  : "text-text-secondary hover:bg-neutral-100 hover:text-text-primary dark:text-text-secondary-dark dark:hover:bg-white/5 dark:hover:text-text-primary-dark"
              )}
            >
              <Icon className="h-[17px] w-[17px] shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            {collapsed && (
              <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark">
                {label}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex h-14 items-center gap-2.5 px-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary">
        <Warehouse className="h-4 w-4 text-white" />
      </div>
      <AnimatePresence>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-semibold tracking-tight text-text-primary dark:text-text-primary-dark">
            StockFlow
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DesktopSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 232 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative hidden h-screen flex-col border-r border-border bg-card dark:border-border-dark dark:bg-card-dark md:flex"
    >
      <Logo collapsed={collapsed} />
      <NavList collapsed={collapsed} />
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-2.5 mb-3 flex items-center justify-center gap-2 rounded-lg border border-border py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-neutral-100 dark:border-border-dark dark:text-text-secondary-dark dark:hover:bg-white/5"
      >
        {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
        {!collapsed && "Collapse"}
      </button>
    </motion.aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/30 md:hidden" />
          <motion.aside
            initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card dark:border-border-dark dark:bg-card-dark md:hidden"
          >
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <Warehouse className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">StockFlow</span>
              </div>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <NavList collapsed={false} onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
