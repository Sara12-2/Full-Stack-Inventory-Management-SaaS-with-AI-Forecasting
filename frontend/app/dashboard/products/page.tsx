"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Search, AlertTriangle } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { getProducts, getCategories, getSuppliers } from "@/lib/mock-api";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { useToast } from "@/components/providers/ToastProvider";

export default function ProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getProducts(), getCategories(), getSuppliers()])
      .then(([p, c, s]) => { setProducts(p); setCategories(c); setSuppliers(s); })
      .catch(() => setError("Couldn't load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (form: Partial<Product>) => {
    if (editing) {
      setProducts(products.map((p) => (p.id === editing.id ? { ...p, ...form } as Product : p)));
      showToast("success", `${form.name} updated.`);
    } else {
      setProducts([...products, { id: Math.max(0, ...products.map((p) => p.id)) + 1, created_at: new Date().toISOString(), ...form } as Product]);
      showToast("success", `${form.name} added.`);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDeleteConfirm = () => {
    if (deleting) {
      setProducts(products.filter((p) => p.id !== deleting.id));
      showToast("info", `${deleting.name} removed.`);
    }
    setDeleting(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">Products</h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{products.length} products in your catalog</p>
        </div>
        <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="pl-9" />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : error ? (
        <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />
      ) : (
        <ProductTable
          products={filtered}
          onEdit={(p) => { setEditing(p); setFormOpen(true); }}
          onDelete={setDeleting}
          onAddNew={() => { setEditing(null); setFormOpen(true); }}
        />
      )}

      <ProductForm
        open={formOpen}
        product={editing}
        categories={categories}
        suppliers={suppliers}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleting}
        title="Delete product"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
