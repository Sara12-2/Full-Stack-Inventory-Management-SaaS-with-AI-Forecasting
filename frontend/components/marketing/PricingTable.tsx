"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    desc: "For solo sellers just getting organized.",
    features: [
      "Up to 50 products",
      "1 user account",
      "Basic dashboard",
      "Email support",
      "7-day history"
    ],
    highlighted: false,
    icon: Zap,
    badge: "Free",
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$29",
    period: "/mo",
    desc: "For growing stores with a small team.",
    features: [
      "Unlimited products",
      "Up to 5 users",
      "Real-time low-stock alerts",
      "CSV reports",
      "Priority support",
      "30-day history"
    ],
    highlighted: true,
    icon: Crown,
    badge: "Most Popular",
    cta: "Start Free Trial",
  },
  {
    name: "Scale",
    price: "$79",
    period: "/mo",
    desc: "For multi-supplier operations.",
    features: [
      "Everything in Growth",
      "Unlimited users",
      "Advanced analytics",
      "AI demand forecasting",
      "Dedicated support",
      "Unlimited history"
    ],
    highlighted: false,
    icon: Sparkles,
    badge: "Enterprise",
    cta: "Contact Sales",
  },
];

export default function PricingTable() {
  return (
    <section className="relative overflow-hidden section-spacing px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#0D9479]/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[#6366F1]/[0.02] blur-3xl" />
      </div>

      <div className="container-custom">
        
        {/* ============================================
            HEADER - Fixed (No Duplicate)
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Badge - Single */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0D9479]/20 bg-[#0D9479]/10 px-3.5 py-1.5 text-xs font-medium text-[#0D9479]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9479] animate-pulse" />
            Pricing Plans
          </div>

          {/* Main Heading - Single */}
          <h2 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            Choose the right plan
            <br />
            <span className="bg-gradient-to-r from-[#0D9479] to-[#6366F1] bg-clip-text text-transparent">
              for your business
            </span>
          </h2>

          {/* Subheading - Single */}
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Start free. Upgrade when your catalog outgrows the basics.
          </p>
        </motion.div>

        {/* ============================================
            BILLING TOGGLE
            ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">Monthly</span>
          
          <div className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-[#E8EDF2] p-1 transition-colors dark:bg-[#2A3648]">
            <div className="h-6 w-6 rounded-full bg-[#0D9479] shadow-md transition-transform" />
          </div>
          
          <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
            Yearly
            <span className="rounded-full bg-[#0D9479]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0D9479]">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* ============================================
            PRICING CARDS
            ============================================ */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-[#0D9479] bg-[var(--color-surface)] shadow-xl shadow-[#0D9479]/10 dark:shadow-[#0D9479]/20"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-md"
              }`}
            >
              {/* Highlighted Plan - Gradient Border */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#0D9479] via-[#0D9479] to-[#6366F1] opacity-20 blur-sm" />
              )}

              {/* Plan Header */}
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2.5 ${
                      plan.highlighted 
                        ? "bg-[#0D9479] text-white" 
                        : "bg-[#0D9479]/10 text-[#0D9479]"
                    }`}>
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text)]">{plan.name}</h3>
                      {plan.badge && (
                        <span className={`inline-block text-[10px] font-medium ${
                          plan.highlighted 
                            ? "text-[#0D9479]" 
                            : "text-[var(--color-text-muted)]"
                        }`}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  {plan.highlighted && (
                    <span className="badge-primary text-[10px] font-semibold">
                      ★ Best Value
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--color-text)]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[var(--color-text-muted)]">{plan.period}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {plan.desc}
                </p>
              </div>

              {/* Features List */}
              <ul className="relative mt-6 space-y-3 border-t border-[var(--color-border)] pt-6">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9479]" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative mt-8"
              >
                <Link
                  href={plan.highlighted ? "/signup" : plan.name === "Scale" ? "/contact" : "/signup"}
                  className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#0D9479] to-[#0A7A63] text-white shadow-lg shadow-[#0D9479]/25 hover:shadow-[#0D9479]/40 hover:scale-[1.02]"
                      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  {plan.highlighted && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  )}
                </Link>
              </motion.div>

              {/* Extra Badge for Free Plan */}
              {plan.name === "Starter" && (
                <div className="mt-4 text-center">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    ✓ No credit card required
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ============================================
            BOTTOM CTA
            ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--color-text-secondary)]">
            Need a custom plan?{" "}
            <Link href="/contact" className="font-medium text-[#0D9479] hover:underline">
              Contact our sales team →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}