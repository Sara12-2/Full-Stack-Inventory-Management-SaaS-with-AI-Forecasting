"use client";

import { Sparkles, PackageCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

interface Recommendation {
  product_id: number;
  product_name: string;
  current_stock: number;
  avg_weekly_sales: number;
  coverage_weeks: number;
  recommended_quantity: number;
}

interface RestockRecommendationsProps {
  recommendations: Recommendation[];
  summary: string;
}

export default function RestockRecommendations({ recommendations, summary }: RestockRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Reorder Recommendations
        </CardTitle>
        <CardDescription>Based on recent sales velocity, not just current stock level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-text-primary-dark">
          {summary}
        </div>

        {recommendations.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <PackageCheck className="h-6 w-6 text-text-secondary dark:text-text-secondary-dark" />
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Nothing needs reordering right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-border dark:divide-border-dark">
            {recommendations.map((r) => (
              <div key={r.product_id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-medium text-text-primary dark:text-text-primary-dark">{r.product_name}</p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                    {r.current_stock} in stock · ~{r.avg_weekly_sales}/week
                  </p>
                </div>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                  Reorder {r.recommended_quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
