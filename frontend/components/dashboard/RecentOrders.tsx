import { Order } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const statusVariant: Record<string, "default" | "warning" | "primary" | "success" | "danger"> = {
  pending: "default", processing: "warning", shipped: "primary", delivered: "success", cancelled: "danger",
};

export default function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Recent orders</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="text-xs text-text-secondary dark:text-text-secondary-dark">
              <th className="pb-2 font-medium">Order</th>
              <th className="pb-2 font-medium">Customer</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-border-dark">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="py-2.5 font-medium text-text-primary dark:text-text-primary-dark">{o.order_number}</td>
                <td className="py-2.5 text-text-secondary dark:text-text-secondary-dark">{o.customer_name}</td>
                <td className="py-2.5"><Badge variant={statusVariant[o.status]}>{o.status}</Badge></td>
                <td className="py-2.5 text-right font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(o.total_amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
