"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier, getErrorMessage } from "@/lib/api";
import { Supplier } from "@/types/supplier";
import { useToast } from "@/components/providers/ToastProvider";

export default function SuppliersPage() {
  const { showToast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [deleting, setDeleting] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getSuppliers()
      .then(setSuppliers)
      .catch(() => setError("Couldn't load suppliers. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async (form: Partial<Supplier>) => {
    try {
      if (editing) {
        const updated = await updateSupplier(editing.id, form);
        setSuppliers(suppliers.map((s) => (s.id === editing.id ? updated : s)));
        showToast("success", `${updated.name} updated.`);
      } else {
        const created = await createSupplier(form);
        setSuppliers([created, ...suppliers]);
        showToast("success", `${created.name} added.`);
      }
      setFormOpen(false);
      setEditing(null);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleting) return;
    try {
      await deleteSupplier(deleting.id);
      setSuppliers(suppliers.filter((s) => s.id !== deleting.id));
      showToast("info", `${deleting.name} removed.`);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Suppliers</h1>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search suppliers..." />

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : error ? (
        <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />
      ) : (
        <SupplierTable suppliers={filtered} onEdit={(s) => { setEditing(s); setFormOpen(true); }} onDelete={setDeleting} />
      )}

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
