"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { RevenuePoint } from "@/types/dashboard";

export default function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E5E5", fontSize: 13 }} />
            <Line type="monotone" dataKey="revenue" stroke="#0D9479" strokeWidth={2} dot={{ r: 3, fill: "#0D9479" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
