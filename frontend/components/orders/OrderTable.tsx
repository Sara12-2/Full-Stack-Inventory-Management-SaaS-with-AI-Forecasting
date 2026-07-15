"use client";

import { Order } from "@/types/order";
import DataTable, { Column } from "@/components/shared/DataTable";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function OrderTable({ orders }: { orders: Order[] }) {
  const columns: Column<Order>[] = [
    { header: "Order #", accessor: (o) => <span className="font-medium text-text-primary dark:text-text-primary-dark">{o.order_number}</span> },
    { header: "Customer", accessor: (o) => o.customer_name },
    { header: "Date", accessor: (o) => formatDate(o.created_at) },
    { header: "Total", accessor: (o) => formatCurrency(o.total_amount) },
    { header: "Status", accessor: (o) => <OrderStatusBadge status={o.status} /> },
    {
      header: "",
      accessor: (o) => (
        <Link href={`/dashboard/orders/${o.id}`} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          <Eye className="h-3.5 w-3.5" /> View
        </Link>
      ),
    },
  ];

  return <DataTable columns={columns} data={orders} keyExtractor={(o) => o.id} emptyMessage="No orders found." />;
}
