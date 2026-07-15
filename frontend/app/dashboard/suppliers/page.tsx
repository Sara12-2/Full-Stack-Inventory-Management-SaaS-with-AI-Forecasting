"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { getSuppliers } from "@/lib/mock-api";
import { Supplier } from "@/types/supplier";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [deleting, setDeleting] = useState<Supplier | null>(null);

  useEffect(() => {
    getSuppliers().then(setSuppliers);
  }, []);

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (form: Partial<Supplier>) => {
    if (editing) {
      setSuppliers(suppliers.map((s) => (s.id === editing.id ? { ...s, ...form } as Supplier : s)));
    } else {
      const newSupplier: Supplier = {
        id: Math.max(0, ...suppliers.map((s) => s.id)) + 1,
        created_at: new Date().toISOString(),
        ...form,
      } as Supplier;
      setSuppliers([...suppliers, newSupplier]);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDeleteConfirm = () => {
    if (deleting) setSuppliers(suppliers.filter((s) => s.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search suppliers..." />
      <SupplierTable suppliers={filtered} onEdit={(s) => { setEditing(s); setFormOpen(true); }} onDelete={setDeleting} />

      <SupplierForm
        open={formOpen}
        supplier={editing}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleting}
        title="Delete supplier"
        message={`Are you sure you want to delete "${deleting?.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
