"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/mock-api";
import { Product, MovementType } from "@/types/product";
import DataTable, { Column } from "@/components/shared/DataTable";
import StockBadge from "@/components/inventory/StockBadge";
import StockAdjustModal from "@/components/inventory/StockAdjustModal";
import SearchInput from "@/components/shared/SearchInput";
import { Settings2 } from "lucide-react";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [adjusting, setAdjusting] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdjust = (productId: number, type: MovementType, quantity: number) => {
    setProducts(
      products.map((p) => {
        if (p.id !== productId) return p;
        const delta = type === "out" ? -quantity : quantity;
        return { ...p, stock_quantity: Math.max(0, p.stock_quantity + delta) };
      })
    );
    setAdjusting(null);
  };

  const columns: Column<Product>[] = [
    { header: "Name", accessor: (p) => <span className="font-medium text-gray-800">{p.name}</span> },
    { header: "SKU", accessor: (p) => p.sku },
    { header: "Stock", accessor: (p) => <StockBadge product={p} /> },
    { header: "Threshold", accessor: (p) => p.low_stock_threshold },
    {
      header: "Actions",
      accessor: (p) => (
        <button onClick={() => setAdjusting(p)} className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900">
          <Settings2 className="h-3.5 w-3.5" /> Adjust
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
      <SearchInput value={search} onChange={setSearch} placeholder="Search products..." />
      <DataTable columns={columns} data={filtered} keyExtractor={(p) => p.id} emptyMessage="No products found." />

      <StockAdjustModal
        open={!!adjusting}
        product={adjusting}
        onClose={() => setAdjusting(null)}
        onAdjust={handleAdjust}
      />
    </div>
  );
}
