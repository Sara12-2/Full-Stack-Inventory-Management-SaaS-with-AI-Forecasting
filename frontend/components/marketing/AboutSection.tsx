"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Users, Rocket, Award, Heart } from "lucide-react";
import Link from "next/link";

const stats = [
  { number: "500+", label: "Businesses", icon: Users },
  { number: "99.9%", label: "Uptime", icon: Shield },
  { number: "5 min", label: "Setup", icon: Rocket },
  { number: "4.9★", label: "Rating", icon: Award },
];

const values = [
  { 
    icon: Heart, 
    title: "Simplicity First", 
    desc: "Every feature should make your life easier, not harder." 
  },
  { 
    icon: Shield, 
    title: "Own Your Data", 
    desc: "Self-hostable, so your business data stays yours." 
  },
  { 
    icon: Rocket, 
    title: "Speed Matters", 
    desc: "Built to be fast, responsive, and a joy to use." 
  },
  { 
    icon: Users, 
    title: "Made for Teams", 
    desc: "Designed around how small teams actually work." 
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden section-spacing px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#0D9479]/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[#6366F1]/[0.02] blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D9479]/20 bg-[#0D9479]/10 px-3.5 py-1.5 text-xs font-medium text-[#0D9479]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            About StockFlow
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-4xl font-bold text-[var(--color-text)] sm:text-5xl lg:text-6xl"
          >
            Built for teams that
            <br />
            <span className="bg-gradient-to-r from-[#0D9479] to-[#6366F1] bg-clip-text text-transparent">
              actually ship products.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 space-y-4 text-[var(--color-text-secondary)]"
          >
            <p className="text-lg leading-relaxed">
              StockFlow was built by <span className="font-medium text-[var(--color-text)]">DevHatch Labs</span> to solve a problem small e-commerce businesses face every day.
            </p>
            <p className="text-lg leading-relaxed">
              Managing inventory on spreadsheets that don't scale, don't warn you before you run out of stock, and don't give you a single view of how the business is actually doing.
            </p>
            <p className="text-lg leading-relaxed">
              We're building StockFlow as a focused, honest alternative to expensive ERP software — <span className="font-medium text-[var(--color-text)]">self-hostable, fast, and built around the workflows a small team actually has time for.</span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-10 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center">
                  <stat.icon className="h-6 w-6 text-[#0D9479]" />
                </div>
                <p className="mt-2 text-xl font-bold text-[var(--color-text)]">{stat.number}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm"
          >
            <h3 className="text-center text-lg font-semibold text-[var(--color-text)]">
              What we believe
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="flex gap-3 rounded-lg p-3 hover:bg-[var(--color-surface-hover)]">
                  <value.icon className="h-5 w-5 shrink-0 text-[#0D9479]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{value.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#0D9479] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0A7A63] hover:shadow-lg hover:shadow-[#0D9479]/25"
            >
              Start Free Trial
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              No credit card required • Free 14-day trial
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}