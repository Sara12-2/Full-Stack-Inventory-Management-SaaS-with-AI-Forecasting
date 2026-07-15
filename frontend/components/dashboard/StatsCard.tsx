"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: number;
  delay?: number;
}

export default function StatsCard({ label, value, icon: Icon, trend, delay = 0 }: StatsCardProps) {
  const positive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-glow dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">{label}</span>
        <div className="rounded-xl bg-gradient-brand p-2.5">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">{value}</p>
      <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-danger"}`}>
        {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        {Math.abs(trend)}% vs last month
      </div>
    </motion.div>
  );
}
