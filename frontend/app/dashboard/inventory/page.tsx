"use client";

import { useCallback, useEffect, useState } from "react";
import { getProducts, adjustStock, getErrorMessage } from "@/lib/api";
import { Product, MovementType } from "@/types/product";
import DataTable, { Column } from "@/components/shared/DataTable";
import StockBadge from "@/components/inventory/StockBadge";
import StockAdjustModal from "@/components/inventory/StockAdjustModal";
import SearchInput from "@/components/shared/SearchInput";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { Settings2, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

export default function InventoryPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [adjusting, setAdjusting] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getProducts()
      .then(setProducts)
      .catch(() => setError("Couldn't load inventory. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdjust = async (productId: number, type: MovementType, quantity: number, reason: string) => {
    try {
      const { product } = await adjustStock(productId, type, quantity, reason);
      setProducts(products.map((p) => (p.id === productId ? product : p)));
      showToast("success", `${product.name} stock updated.`);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    } finally {
      setAdjusting(null);
    }
  };

  const columns: Column<Product>[] = [
    { header: "Name", accessor: (p) => <span className="font-medium text-text-primary dark:text-text-primary-dark">{p.name}</span> },
    { header: "SKU", accessor: (p) => p.sku },
    { header: "Stock", accessor: (p) => <StockBadge product={p} /> },
    { header: "Threshold", accessor: (p) => p.low_stock_threshold },
    {
      header: "Actions",
      accessor: (p) => (
        <button onClick={() => setAdjusting(p)} className="flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark">
          <Settings2 className="h-3.5 w-3.5" /> Adjust
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Inventory</h1>
      <SearchInput value={search} onChange={setSearch} placeholder="Search products..." />

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : error ? (
        <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />
      ) : (
        <DataTable columns={columns} data={filtered} keyExtractor={(p) => p.id} emptyMessage="No products found." />
      )}

      <StockAdjustModal
        open={!!adjusting}
        product={adjusting}
        onClose={() => setAdjusting(null)}
        onAdjust={handleAdjust}
      />
    </div>
  );
}
