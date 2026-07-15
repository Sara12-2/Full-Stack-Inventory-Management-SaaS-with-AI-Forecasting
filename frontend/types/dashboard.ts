export interface DashboardStats {
  total_products: number;
  total_orders: number;
  low_stock_count: number;
  revenue_this_month: number;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
}

export interface TopProduct {
  id: number;
  name: string;
  units_sold: number;
  revenue: number;
}
