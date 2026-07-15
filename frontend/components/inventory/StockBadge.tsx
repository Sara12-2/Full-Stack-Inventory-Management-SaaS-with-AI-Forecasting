import { Product } from "@/types/product";

export default function StockBadge({ product }: { product: Product }) {
  const low = product.stock_quantity <= product.low_stock_threshold;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        low
          ? "bg-danger-light text-danger dark:bg-danger/10"
          : "bg-success-light text-success dark:bg-success/10"
      }`}
    >
      {product.stock_quantity} in stock
    </span>
  );
}
