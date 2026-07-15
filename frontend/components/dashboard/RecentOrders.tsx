"use client";

import { motion } from "framer-motion";
import { Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  processing: "bg-warning-light text-warning dark:bg-warning/10",
  shipped: "bg-primary-light text-primary dark:bg-primary/10",
  delivered: "bg-success-light text-success dark:bg-success/10",
  cancelled: "bg-danger-light text-danger dark:bg-danger/10",
};

export default function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark"
    >
      <h3 className="mb-4 font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">Recent Orders</h3>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="text-xs uppercase text-text-secondary dark:text-text-secondary-dark">
            <th className="pb-2 font-medium">Order ID</th>
            <th className="pb-2 font-medium">Customer</th>
            <th className="pb-2 font-medium">Date</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {orders.map((o) => (
            <tr key={o.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
              <td className="py-2.5 font-medium text-text-primary dark:text-text-primary-dark">{o.order_number}</td>
              <td className="py-2.5 text-text-secondary dark:text-text-secondary-dark">{o.customer_name}</td>
              <td className="py-2.5 text-text-secondary dark:text-text-secondary-dark">{formatDate(o.created_at)}</td>
              <td className="py-2.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[o.status]}`}>{o.status}</span>
              </td>
              <td className="py-2.5 text-right font-semibold text-text-primary dark:text-text-primary-dark">{formatCurrency(o.total_amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </motion.div>
  );
}
