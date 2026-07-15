import { Order, OrderStatus } from "@/types/order";
import { formatCurrency, formatDate } from "@/lib/utils";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

interface OrderDetailProps {
  order: Order;
  onStatusChange: (status: OrderStatus) => void;
}

const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];
const selectClass = "w-full max-w-xs rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-primary dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark";

export default function OrderDetail({ order, onStatusChange }: OrderDetailProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{order.order_number}</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{formatDate(order.created_at)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Customer</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{order.customer_name}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Email</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{order.customer_email}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Phone</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{order.customer_phone}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Total</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(order.total_amount)}</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-text-secondary-dark">Update status</label>
          <select value={order.status} onChange={(e) => onStatusChange(e.target.value as OrderStatus)} className={selectClass}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark">
        <h4 className="mb-3 text-sm font-semibold text-text-primary dark:text-text-primary-dark">Items</h4>
        <div className="divide-y divide-border dark:divide-border-dark">
          {(order.items || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-text-primary dark:text-text-primary-dark">{item.product_name} × {item.quantity}</span>
              <span className="font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(item.total_price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
