"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, ShoppingBag, TrendingUp, PlayCircle, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:px-8 lg:px-12">
      {/* Subtle background — one soft glow, no competing colors */}
      <div className="absolute inset-0 -z-10 bg-[var(--color-background)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#0D9479]/[0.05] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* ============================================
              LEFT COLUMN
              ============================================ */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D9479]/25 bg-[#0D9479]/10 px-3.5 py-1.5 text-xs font-medium text-[#0D9479]"
            >
              <Zap className="h-3.5 w-3.5" />
              Built for growing e-commerce teams
            </motion.div>

            {/* Heading — Fixed alignment */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl"
            >
              <span className="block">Never run out of</span>
              <span className="block text-[#0D9479]">what you sell.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg"
            >
              The all-in-one platform to track inventory, manage orders, and
              grow your business — without the complexity of traditional ERP
              systems.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-5"
            >
              {[
                { icon: Package, label: "Real-time stock" },
                { icon: ShoppingBag, label: "Order tracking" },
                { icon: TrendingUp, label: "Analytics" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                  <item.icon className="h-4 w-4 text-[#0D9479]" />
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#0D9479] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A7A63]"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
              >
                <PlayCircle className="h-4 w-4 text-[#0D9479]" />
                Live Demo
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-8 border-t border-[var(--color-border)] pt-6"
            >
              {[
                { number: "500+", label: "Active businesses" },
                { number: "99.9%", label: "Uptime" },
                { number: "5 min", label: "Setup time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-bold text-[var(--color-text)]">{stat.number}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ============================================
              RIGHT COLUMN — Dashboard Preview
              ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-auto max-w-[180px] flex-1 rounded-md bg-[var(--color-surface-hover)] px-3 py-1 text-center text-xs text-[var(--color-text-muted)]">
                  app.stockflow.com
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Revenue", value: "$24.8K" },
                    { label: "Orders", value: "1,284" },
                    { label: "Products", value: "342" },
                    { label: "Low Stock", value: "8" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-[var(--color-surface-hover)] p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-[var(--color-text)]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="mt-3 rounded-lg bg-[var(--color-surface-hover)] p-3">
                  <div className="flex items-end gap-1.5 h-16">
                    {[45, 55, 70, 60, 85, 75, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-[#0D9479]/30 transition-all hover:bg-[#0D9479]/50"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}