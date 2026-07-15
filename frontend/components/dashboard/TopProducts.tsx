import { TopProduct } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function TopProducts({ products }: { products: TopProduct[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Top products</CardTitle></CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {products.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3 rounded-md px-1 py-2 transition-colors hover:bg-neutral-50 dark:hover:bg-white/5">
              <span className="w-4 text-xs font-medium text-text-secondary dark:text-text-secondary-dark">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{p.name}</p>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{p.units_sold} units sold</p>
              </div>
              <span className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{formatCurrency(p.revenue)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
