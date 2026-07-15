import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: number;
}

export default function StatsCard({ label, value, icon: Icon, trend }: StatsCardProps) {
  const positive = trend >= 0;
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{label}</span>
        <Icon className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary dark:text-text-primary-dark">{value}</p>
      <div className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-danger"}`}>
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {Math.abs(trend)}% vs last month
      </div>
    </Card>
  );
}
