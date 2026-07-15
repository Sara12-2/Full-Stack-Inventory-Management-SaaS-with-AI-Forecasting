"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter", price: "Free", desc: "For solo sellers just getting organized.",
    features: ["Up to 50 products", "1 user account", "Basic dashboard", "Email support"],
    highlighted: false,
  },
  {
    name: "Growth", price: "$29", period: "/mo", desc: "For growing stores with a small team.",
    features: ["Unlimited products", "Up to 5 users", "Real-time low-stock alerts", "CSV reports", "Priority support"],
    highlighted: true,
  },
  {
    name: "Scale", price: "$79", period: "/mo", desc: "For multi-supplier operations.",
    features: ["Everything in Growth", "Unlimited users", "Advanced analytics", "AI demand forecasting", "Dedicated support"],
    highlighted: false,
  },
];

export default function PricingTable() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary dark:text-text-primary-dark">Simple, honest pricing</h2>
          <p className="mt-3 text-text-secondary dark:text-text-secondary-dark">Start free. Upgrade when your catalog outgrows the basics.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-primary bg-gradient-brand text-white shadow-glow"
                  : "border-border bg-card shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
              }`}
            >
              <h3 className={`font-heading text-lg font-bold ${plan.highlighted ? "text-white" : "text-text-primary dark:text-text-primary-dark"}`}>{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/80" : "text-text-secondary dark:text-text-secondary-dark"}`}>{plan.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`font-heading text-3xl font-bold ${plan.highlighted ? "text-white" : "text-text-primary dark:text-text-primary-dark"}`}>{plan.price}</span>
                {plan.period && <span className={plan.highlighted ? "text-white/70" : "text-text-secondary dark:text-text-secondary-dark"}>{plan.period}</span>}
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlighted ? "text-white/90" : "text-text-secondary dark:text-text-secondary-dark"}`}>
                    <Check className={`h-4 w-4 shrink-0 ${plan.highlighted ? "text-white" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  plan.highlighted ? "bg-white text-primary" : "bg-gradient-brand text-white shadow-glow"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
