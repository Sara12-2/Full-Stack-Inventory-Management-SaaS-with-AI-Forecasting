"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

interface ForecastHistoryPoint {
  week_start: string;
  units_sold: number;
}

interface ForecastPoint {
  period: string;
  units: number;
}

interface ForecastChartProps {
  history: ForecastHistoryPoint[];
  forecast: ForecastPoint[];
  insight: string;
}

export default function ForecastChart({ history, forecast, insight }: ForecastChartProps) {
  // The last actual point also carries a "projected" value equal to itself,
  // so the dashed forecast line visually connects to the solid actual line
  // instead of starting from a gap.
  const combined = [
    ...history.map((h, i) => ({
      label: h.week_start,
      actual: h.units_sold,
      projected: i === history.length - 1 ? h.units_sold : null,
    })),
    ...forecast.map((f) => ({ label: f.period, actual: null as number | null, projected: f.units })),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Demand Forecast
        </CardTitle>
        <CardDescription>Weekly units sold — last {history.length} weeks and next {forecast.length} weeks projected</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={combined}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#737373" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E5E5", fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#0D9479" strokeWidth={2} dot={{ r: 3, fill: "#0D9479" }} connectNulls={false} />
            <Line type="monotone" dataKey="projected" name="Projected" stroke="#0D9479" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: "#0D9479" }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-text-primary-dark">
          {insight}
        </div>
      </CardContent>
    </Card>
  );
}
