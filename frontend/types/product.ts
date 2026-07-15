export type ProductStatus = "active" | "inactive";

export interface Product {
  id: number;
  name: string;
  sku: string;
  category_id: number;
  category_name?: string;
  supplier_id: number;
  supplier_name?: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  image_url?: string;
  status: ProductStatus;
  created_at: string;
}

export type MovementType = "in" | "out" | "adjustment";

export interface StockMovement {
  id: number;
  product_id: number;
  movement_type: MovementType;
  quantity: number;
  reason: string;
  created_by: number;
  created_by_name?: string;
  created_at: string;
}
