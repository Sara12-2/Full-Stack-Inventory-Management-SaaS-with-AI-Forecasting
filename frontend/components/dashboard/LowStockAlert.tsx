import { AlertTriangle } from "lucide-react";
import { Product } from "@/types/product";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { CheckCircle2 } from "lucide-react";

export default function LowStockAlert({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Low stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="All stocked up" description="No products are below their threshold right now." />
        ) : (
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-text-primary dark:text-text-primary-dark">{p.name}</span>
                <span className="font-medium text-warning">{p.stock_quantity}/{p.low_stock_threshold}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
