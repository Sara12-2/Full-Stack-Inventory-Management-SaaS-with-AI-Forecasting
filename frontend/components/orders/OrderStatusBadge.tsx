import { OrderStatus } from "@/types/order";

const styles: Record<OrderStatus, string> = {
  pending: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  processing: "bg-warning-light text-warning dark:bg-warning/10",
  shipped: "bg-primary-light text-primary dark:bg-primary/10",
  delivered: "bg-success-light text-success dark:bg-success/10",
  cancelled: "bg-danger-light text-danger dark:bg-danger/10",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>{status}</span>;
}
