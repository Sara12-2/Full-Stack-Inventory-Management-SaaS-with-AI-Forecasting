"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCustomer } from "@/lib/mock-api";
import { Customer } from "@/types/customer";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomer(Number(params.id)).then(setCustomer);
  }, [params.id]);

  if (!customer) {
    return <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark">
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </button>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
        <h1 className="font-heading text-lg font-bold text-text-primary dark:text-text-primary-dark">{customer.name}</h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Customer since {formatDate(customer.created_at)}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div><p className="text-text-secondary dark:text-text-secondary-dark">Email</p><p className="font-medium text-text-primary dark:text-text-primary-dark">{customer.email}</p></div>
          <div><p className="text-text-secondary dark:text-text-secondary-dark">Phone</p><p className="font-medium text-text-primary dark:text-text-primary-dark">{customer.phone}</p></div>
          <div><p className="text-text-secondary dark:text-text-secondary-dark">Total Orders</p><p className="font-medium text-text-primary dark:text-text-primary-dark">{customer.total_orders}</p></div>
          <div><p className="text-text-secondary dark:text-text-secondary-dark">Total Spent</p><p className="font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(customer.total_spent)}</p></div>
        </div>
      </div>
    </div>
  );
}
