"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-6 pb-24 pt-20 sm:px-8 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge - clean */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8EDF2] bg-white px-4 py-1.5 text-xs font-medium text-[#475569] dark:border-[#2A3648] dark:bg-[#1A2332] dark:text-[#94A3B8]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0D9479]" />
          Built for small e-commerce teams
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-5xl lg:text-6xl"
        >
          Inventory that{" "}
          <span className="text-[#0D9479]">
            never catches you
          </span>{" "}
          off guard.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base text-[#475569] dark:text-[#94A3B8] sm:text-lg"
        >
          Track stock, manage orders, and get real-time low-stock alerts — all from one 
          clean dashboard. No spreadsheets, no expensive ERP software.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3"
        >
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0D9479] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0A7A63] active:scale-[0.98]"
          >
            Start Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8EDF2] bg-white px-6 py-2.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#F8FAFC] dark:border-[#2A3648] dark:bg-[#1A2332] dark:text-white dark:hover:bg-[#243044]"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Demo
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-6 text-xs text-[#94A3B8] dark:text-[#64748B]"
        >
          <span className="flex items-center gap-2">
            <span className="flex -space-x-1.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-block h-6 w-6 rounded-full border-2 border-white bg-[#E8EDF2] dark:border-[#1A2332] dark:bg-[#2A3648]"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/24?img=${i})`,
                    backgroundSize: 'cover',
                  }}
                />
              ))}
            </span>
            <span className="text-[#475569] dark:text-[#94A3B8]">
              Trusted by <span className="font-semibold text-[#0F172A] dark:text-white">500+</span> teams
            </span>
          </span>
          <span className="h-4 w-px bg-[#E8EDF2] dark:bg-[#2A3648]" />
          <span className="flex items-center gap-1.5 text-[#475569] dark:text-[#94A3B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
            Free 14-day trial
          </span>
          <span className="hidden h-4 w-px bg-[#E8EDF2] dark:bg-[#2A3648] md:block" />
          <span className="hidden items-center gap-1.5 text-[#475569] dark:text-[#94A3B8] md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
            No credit card
          </span>
        </motion.div>
      </div>
    </section>
  );
}