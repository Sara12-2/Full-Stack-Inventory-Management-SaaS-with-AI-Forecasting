"use client";

import Link from "next/link";
import { Customer } from "@/types/customer";
import DataTable, { Column } from "@/components/shared/DataTable";
import { formatCurrency } from "@/lib/utils";
import { Eye } from "lucide-react";

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  const columns: Column<Customer>[] = [
    { header: "Name", accessor: (c) => <span className="font-medium text-text-primary dark:text-text-primary-dark">{c.name}</span> },
    { header: "Email", accessor: (c) => c.email },
    { header: "Phone", accessor: (c) => c.phone },
    { header: "Orders", accessor: (c) => c.total_orders },
    { header: "Total Spent", accessor: (c) => formatCurrency(c.total_spent) },
    {
      header: "",
      accessor: (c) => (
        <Link href={`/dashboard/customers/${c.id}`} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          <Eye className="h-3.5 w-3.5" /> View
        </Link>
      ),
    },
  ];
  return <DataTable columns={columns} data={customers} keyExtractor={(c) => c.id} emptyMessage="No customers yet." />;
}
