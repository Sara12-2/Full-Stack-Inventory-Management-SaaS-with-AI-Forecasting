"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOrder } from "@/lib/mock-api";
import { Order, OrderStatus } from "@/types/order";
import OrderDetail from "@/components/orders/OrderDetail";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    getOrder(Number(params.id)).then(setOrder);
  }, [params.id]);

  if (!order) return <p className="text-sm text-gray-400">Loading...</p>;

  const handleStatusChange = (status: OrderStatus) => {
    setOrder({ ...order, status });
    // NOTE: cancelling here should restore stock once backend logic exists.
  };

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </button>
      <OrderDetail order={order} onStatusChange={handleStatusChange} />
    </div>
  );
}
