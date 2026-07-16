"use client";

import { useCallback, useEffect, useState } from "react";
import { Package, ShoppingCart, AlertTriangle, DollarSign } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import TopProducts from "@/components/dashboard/TopProducts";
import RecentOrders from "@/components/dashboard/RecentOrders";
import LowStockAlert from "@/components/dashboard/LowStockAlert";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import {
  getDashboardStats,
  getRevenueTrend,
  getTopProducts,
  getRecentOrders,
  getLowStockProducts,
} from "@/lib/api";
import { DashboardStats, RevenuePoint, TopProduct } from "@/types/dashboard";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      getDashboardStats(),
      getRevenueTrend(),
      getTopProducts(),
      getRecentOrders(),
      getLowStockProducts(),
    ])
      .then(([s, r, t, o, l]) => {
        setStats(s);
        setRevenue(r);
        setTopProducts(t);
        setRecentOrders(o);
        setLowStock(l);
      })
      .catch(() => setError("Couldn't load your dashboard data. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-72 w-full lg:col-span-2" />
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description={error ?? "Couldn't load your dashboard data."}
        actionLabel="Retry"
        onAction={load}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">Dashboard</h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Overview of your store&apos;s performance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total products" value={stats.total_products.toString()} icon={Package} trend={4.2} />
        <StatsCard label="Total orders" value={stats.total_orders.toString()} icon={ShoppingCart} trend={2.1} />
        <StatsCard label="Low stock items" value={stats.low_stock_count.toString()} icon={AlertTriangle} trend={-1.4} />
        <StatsCard label="Revenue this month" value={formatCurrency(stats.revenue_this_month)} icon={DollarSign} trend={6.8} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenue} />
        </div>
        <TopProducts products={topProducts} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrders} />
        </div>
        <LowStockAlert products={lowStock} />
      </div>
    </div>
  );
}
