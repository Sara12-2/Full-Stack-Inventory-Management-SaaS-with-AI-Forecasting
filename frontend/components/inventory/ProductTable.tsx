"use client";

import { Product } from "@/types/product";
import DataTable, { Column } from "@/components/shared/DataTable";
import StockBadge from "@/components/inventory/StockBadge";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const columns: Column<Product>[] = [
    { header: "Name", accessor: (p) => <span className="font-medium text-gray-800">{p.name}</span> },
    { header: "SKU", accessor: (p) => p.sku },
    { header: "Category", accessor: (p) => p.category_name || "—" },
    { header: "Supplier", accessor: (p) => p.supplier_name || "—" },
    { header: "Price", accessor: (p) => formatCurrency(p.price) },
    { header: "Stock", accessor: (p) => <StockBadge product={p} /> },
    {
      header: "Status",
      accessor: (p) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            p.status === "active" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {p.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (p) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(p)} className="rounded p-1.5 hover:bg-gray-100">
            <Pencil className="h-3.5 w-3.5 text-gray-500" />
          </button>
          <button onClick={() => onDelete(p)} className="rounded p-1.5 hover:bg-gray-100">
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={products} keyExtractor={(p) => p.id} emptyMessage="No products found." />;
}
