"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getProductMovements } from "@/lib/mock-api";
import { Product, StockMovement } from "@/types/product";
import StockMovementHistory from "@/components/inventory/StockMovementHistory";
import StockBadge from "@/components/inventory/StockBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    const id = Number(params.id);
    getProduct(id).then(setProduct);
    getProductMovements(id).then(setMovements);
  }, [params.id]);

  if (!product) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </button>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-400">SKU: {product.sku} · Added {formatDate(product.created_at)}</p>
          </div>
          <StockBadge product={product} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-gray-400">Category</p>
            <p className="font-medium text-gray-800">{product.category_name}</p>
          </div>
          <div>
            <p className="text-gray-400">Supplier</p>
            <p className="font-medium text-gray-800">{product.supplier_name}</p>
          </div>
          <div>
            <p className="text-gray-400">Price</p>
            <p className="font-medium text-gray-800">{formatCurrency(product.price)}</p>
          </div>
          <div>
            <p className="text-gray-400">Low stock threshold</p>
            <p className="font-medium text-gray-800">{product.low_stock_threshold}</p>
          </div>
        </div>
      </div>

      <StockMovementHistory movements={movements} />
    </div>
  );
}
