"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl dark:bg-accent/20" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-block rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary dark:border-primary/20 dark:bg-primary/10"
        >
          Built for small e-commerce teams
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-heading text-4xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark sm:text-5xl"
        >
          Inventory that never
          <span className="bg-gradient-brand bg-clip-text text-transparent"> catches you off guard.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-text-secondary dark:text-text-secondary-dark"
        >
          Track stock, manage orders, and get real-time low-stock alerts — all from one clean dashboard. No spreadsheets, no expensive ERP software.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/signup" className="flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-slate-50 dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark dark:hover:bg-white/5">
            <PlayCircle className="h-4 w-4" /> Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
