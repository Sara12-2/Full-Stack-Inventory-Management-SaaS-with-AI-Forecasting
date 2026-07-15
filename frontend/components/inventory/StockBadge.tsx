import { Product } from "@/types/product";

export default function StockBadge({ product }: { product: Product }) {
  const low = product.stock_quantity <= product.low_stock_threshold;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        low ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
      }`}
    >
      {product.stock_quantity} in stock
    </span>
  );
}
