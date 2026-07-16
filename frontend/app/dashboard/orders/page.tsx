"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import OrderTable from "@/components/orders/OrderTable";
import OrderForm from "@/components/orders/OrderForm";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getOrders, getProducts, createOrder, getErrorMessage } from "@/lib/api";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import { useToast } from "@/components/providers/ToastProvider";

export default function OrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getOrders(), getProducts()])
      .then(([o, p]) => { setOrders(o); setProducts(p); })
      .catch(() => setError("Couldn't load orders. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = orders.filter(
    (o) =>
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    items: { product_id: number; quantity: number }[];
  }) => {
    try {
      const newOrder = await createOrder(data);
      setOrders([newOrder, ...orders]);
      // Stock was deducted server-side; refresh products so the Orders form
      // (and anywhere else on this page) reflects current stock levels.
      const freshProducts = await getProducts();
      setProducts(freshProducts);
      showToast("success", `Order ${newOrder.order_number} created.`);
      setFormOpen(false);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Orders</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search by order # or customer..." />

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : error ? (
        <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />
      ) : (
        <OrderTable orders={filtered} />
      )}

      <OrderForm open={formOpen} products={products} onClose={() => setFormOpen(false)} onSave={handleSave} />
    </div>
  );
}
