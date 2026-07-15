"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
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

  useEffect(() => {
    Promise.all([getProducts(), getCategories(), getSuppliers()])
      .then(([p, c, s]) => {
        setProducts(p);
        setCategories(c);
        setSuppliers(s);
      })
      .catch(() => showToast("error", "Couldn't load products. Please refresh the page."));
  }, [showToast]);

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form: Partial<Product>) => {
    try {
      if (editing) {
        setProducts(products.map((p) => (p.id === editing.id ? ({ ...p, ...form } as Product) : p)));
        showToast("success", `${form.name} updated successfully.`);
      } else {
        setProducts([...products, { id: Math.max(0, ...products.map((p) => p.id)) + 1, created_at: new Date().toISOString(), ...form } as Product]);
        showToast("success", `${form.name} added to your catalog.`);
      }
      setFormOpen(false);
      setEditing(null);
    } catch {
      showToast("error", "Couldn't save this product. Please try again.");
    }
  };

  const handleDelete = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id));
    showToast("info", `${product.name} removed.`);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">Products</h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{products.length} products in your catalog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <Plus className="h-4 w-4" /> Add Product
        </motion.button>
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-slate-50 dark:border-border-dark dark:bg-card-dark dark:text-text-secondary-dark dark:hover:bg-white/5">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </button>
      </div>

      <ProductTable products={filtered} onEdit={(p) => { setEditing(p); setFormOpen(true); }} onDelete={handleDelete} />

      <ProductForm
        open={formOpen}
        product={editing}
        categories={categories}
        suppliers={suppliers}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
