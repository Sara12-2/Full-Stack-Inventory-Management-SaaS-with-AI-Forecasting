"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import OrderTable from "@/components/orders/OrderTable";
import OrderForm from "@/components/orders/OrderForm";
import { getOrders, getProducts } from "@/lib/mock-api";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getOrders().then(setOrders);
    getProducts().then(setProducts);
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    items: { product_id: number; quantity: number }[];
  }) => {
    const items = data.items.map((item, idx) => {
      const product = products.find((p) => p.id === item.product_id);
      const unit_price = product?.price || 0;
      return {
        id: idx + 1,
        order_id: 0,
        product_id: item.product_id,
        product_name: product?.name,
        quantity: item.quantity,
        unit_price,
        total_price: unit_price * item.quantity,
      };
    });
    const total_amount = items.reduce((sum, i) => sum + i.total_price, 0);

    const newOrder: Order = {
      id: Math.max(0, ...orders.map((o) => o.id)) + 1,
      order_number: `ORD-${1000 + orders.length + 1}`,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      total_amount,
      status: "pending",
      created_at: new Date().toISOString(),
      items,
    };

    // Auto-deduct stock on order creation
    setProducts(
      products.map((p) => {
        const item = data.items.find((i) => i.product_id === p.id);
        return item ? { ...p, stock_quantity: Math.max(0, p.stock_quantity - item.quantity) } : p;
      })
    );

    setOrders([newOrder, ...orders]);
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Orders</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search by order # or customer..." />
      <OrderTable orders={filtered} />

      <OrderForm open={formOpen} products={products} onClose={() => setFormOpen(false)} onSave={handleSave} />
    </div>
  );
}
