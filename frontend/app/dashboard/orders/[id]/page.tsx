"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, AlertTriangle, PackageX } from "lucide-react";
import { getOrder, updateOrderStatus, getErrorMessage } from "@/lib/api";
import { Order, OrderStatus } from "@/types/order";
import OrderDetail from "@/components/orders/OrderDetail";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/providers/ToastProvider";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    setOrder(null);
    getOrder(Number(params.id))
      .then(setOrder)
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setOrder(null);
        } else {
          setError("Couldn't load this order. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />;
  }

  if (!order) {
    return <EmptyState icon={PackageX} title="Order not found" description="This order may have been removed." actionLabel="Back to orders" onAction={() => router.push("/dashboard/orders")} />;
  }

  const handleStatusChange = async (status: OrderStatus) => {
    try {
      const updated = await updateOrderStatus(order.id, status);
      setOrder(updated);
      showToast("success", `Order marked as ${status}.`);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </button>
      <OrderDetail order={order} onStatusChange={handleStatusChange} />
    </div>
  );
}
