"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerForm from "@/components/customers/CustomerForm";
import { getCustomers } from "@/lib/mock-api";
import { Customer } from "@/types/customer";
import { useToast } from "@/components/providers/ToastProvider";

export default function CustomersPage() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (form: Partial<Customer>) => {
    if (editing) {
      setCustomers(customers.map((c) => (c.id === editing.id ? { ...c, ...form } as Customer : c)));
      showToast("success", `${form.name} updated.`);
    } else {
      const newCustomer: Customer = {
        id: Math.max(0, ...customers.map((c) => c.id)) + 1,
        total_orders: 0, total_spent: 0, created_at: new Date().toISOString(),
        ...form,
      } as Customer;
      setCustomers([...customers, newCustomer]);
      showToast("success", `${form.name} added.`);
    }
    setFormOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Customers</h1>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
          <Plus className="h-4 w-4" /> Add Customer
        </button>
      </div>
      <SearchInput value={search} onChange={setSearch} placeholder="Search customers..." />
      <CustomerTable customers={filtered} />
      <CustomerForm open={formOpen} customer={editing} onClose={() => { setFormOpen(false); setEditing(null); }} onSave={handleSave} />
    </div>
  );
}
