"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, PackageX } from "lucide-react";
import { getProduct, getProductMovements } from "@/lib/mock-api";
import { Product, StockMovement } from "@/types/product";
import StockMovementHistory from "@/components/inventory/StockMovementHistory";
import StockBadge from "@/components/inventory/StockBadge";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    const id = Number(params.id);
    setLoading(true);
    setError(null);
    Promise.all([getProduct(id), getProductMovements(id)])
      .then(([p, m]) => { setProduct(p); setMovements(m); })
      .catch(() => setError("Couldn't load this product. Please try again."))
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />;
  }

  if (!product) {
    return <EmptyState icon={PackageX} title="Product not found" description="This product may have been removed." actionLabel="Back to products" onAction={() => router.push("/dashboard/products")} />;
  }

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </button>

      <div className="rounded-xl border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">{product.name}</h1>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">SKU: {product.sku} · Added {formatDate(product.created_at)}</p>
          </div>
          <StockBadge product={product} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Category</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{product.category_name}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Supplier</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{product.supplier_name}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Price</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(product.price)}</p>
          </div>
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark">Low stock threshold</p>
            <p className="font-medium text-text-primary dark:text-text-primary-dark">{product.low_stock_threshold}</p>
          </div>
        </div>
      </div>

      <StockMovementHistory movements={movements} />
    </div>
  );
}
