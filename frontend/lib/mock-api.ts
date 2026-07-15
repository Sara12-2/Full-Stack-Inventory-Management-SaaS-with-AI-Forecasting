import { Product, StockMovement } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";
import { Order } from "@/types/order";
import { DashboardStats, RevenuePoint, TopProduct } from "@/types/dashboard";

// ---- Mock data ----

const categories: Category[] = [
  { id: 1, name: "Electronics", description: "Gadgets and devices", created_at: "2026-01-05" },
  { id: 2, name: "Clothing", description: "Apparel", created_at: "2026-01-05" },
  { id: 3, name: "Food", description: "Consumables", created_at: "2026-01-05" },
  { id: 4, name: "Beauty", description: "Cosmetics", created_at: "2026-01-05" },
  { id: 5, name: "Home", description: "Household items", created_at: "2026-01-05" },
];

const suppliers: Supplier[] = [
  { id: 1, name: "Acme Supplies", email: "contact@acme.com", phone: "555-0101", created_at: "2026-01-05" },
  { id: 2, name: "Global Traders", email: "hello@globaltraders.com", phone: "555-0102", created_at: "2026-01-05" },
  { id: 3, name: "Northwind Distribution", email: "info@northwind.com", phone: "555-0103", created_at: "2026-01-05" },
];

const products: Product[] = [
  { id: 1, name: "Wireless Mouse", sku: "ELE-001", category_id: 1, category_name: "Electronics", supplier_id: 1, supplier_name: "Acme Supplies", price: 19.99, cost_price: 9.5, stock_quantity: 45, low_stock_threshold: 10, status: "active", created_at: "2026-02-01" },
  { id: 2, name: "Bluetooth Speaker", sku: "ELE-002", category_id: 1, category_name: "Electronics", supplier_id: 1, supplier_name: "Acme Supplies", price: 39.99, cost_price: 20, stock_quantity: 6, low_stock_threshold: 10, status: "active", created_at: "2026-02-01" },
  { id: 3, name: "Cotton T-Shirt", sku: "CLO-001", category_id: 2, category_name: "Clothing", supplier_id: 2, supplier_name: "Global Traders", price: 14.99, cost_price: 6, stock_quantity: 120, low_stock_threshold: 20, status: "active", created_at: "2026-02-02" },
  { id: 4, name: "Denim Jacket", sku: "CLO-002", category_id: 2, category_name: "Clothing", supplier_id: 2, supplier_name: "Global Traders", price: 59.99, cost_price: 28, stock_quantity: 8, low_stock_threshold: 10, status: "active", created_at: "2026-02-02" },
  { id: 5, name: "Organic Honey 500g", sku: "FOO-001", category_id: 3, category_name: "Food", supplier_id: 3, supplier_name: "Northwind Distribution", price: 8.99, cost_price: 4, stock_quantity: 60, low_stock_threshold: 15, status: "active", created_at: "2026-02-03" },
  { id: 6, name: "Face Moisturizer", sku: "BEA-001", category_id: 4, category_name: "Beauty", supplier_id: 2, supplier_name: "Global Traders", price: 24.99, cost_price: 11, stock_quantity: 5, low_stock_threshold: 10, status: "active", created_at: "2026-02-04" },
  { id: 7, name: "Scented Candle", sku: "HOM-001", category_id: 5, category_name: "Home", supplier_id: 3, supplier_name: "Northwind Distribution", price: 12.99, cost_price: 5, stock_quantity: 75, low_stock_threshold: 15, status: "active", created_at: "2026-02-05" },
  { id: 8, name: "Ceramic Mug Set", sku: "HOM-002", category_id: 5, category_name: "Home", supplier_id: 3, supplier_name: "Northwind Distribution", price: 22.99, cost_price: 10, stock_quantity: 3, low_stock_threshold: 10, status: "active", created_at: "2026-02-05" },
];

const stockMovements: StockMovement[] = [
  { id: 1, product_id: 2, movement_type: "out", quantity: 4, reason: "Order fulfillment", created_by: 1, created_by_name: "Admin", created_at: "2026-06-01" },
  { id: 2, product_id: 2, movement_type: "in", quantity: 10, reason: "Restock", created_by: 1, created_by_name: "Admin", created_at: "2026-05-20" },
  { id: 3, product_id: 8, movement_type: "adjustment", quantity: -2, reason: "Damaged in warehouse", created_by: 1, created_by_name: "Admin", created_at: "2026-06-02" },
];

const orders: Order[] = [
  {
    id: 1, order_number: "ORD-1001", customer_name: "Ayesha Khan", customer_email: "ayesha@example.com",
    customer_phone: "555-1111", total_amount: 59.97, status: "delivered", created_at: "2026-06-20",
    items: [{ id: 1, order_id: 1, product_id: 1, product_name: "Wireless Mouse", quantity: 3, unit_price: 19.99, total_price: 59.97 }],
  },
  {
    id: 2, order_number: "ORD-1002", customer_name: "Bilal Ahmed", customer_email: "bilal@example.com",
    customer_phone: "555-2222", total_amount: 39.99, status: "shipped", created_at: "2026-06-25",
    items: [{ id: 2, order_id: 2, product_id: 2, product_name: "Bluetooth Speaker", quantity: 1, unit_price: 39.99, total_price: 39.99 }],
  },
  {
    id: 3, order_number: "ORD-1003", customer_name: "Sara Manzoor", customer_email: "sara@example.com",
    customer_phone: "555-3333", total_amount: 82.97, status: "processing", created_at: "2026-07-01",
    items: [
      { id: 3, order_id: 3, product_id: 4, product_name: "Denim Jacket", quantity: 1, unit_price: 59.99, total_price: 59.99 },
      { id: 4, order_id: 3, product_id: 7, product_name: "Scented Candle", quantity: 1, unit_price: 12.99, total_price: 12.99 },
    ],
  },
  {
    id: 4, order_number: "ORD-1004", customer_name: "Usman Tariq", customer_email: "usman@example.com",
    customer_phone: "555-4444", total_amount: 14.99, status: "pending", created_at: "2026-07-05",
    items: [{ id: 5, order_id: 4, product_id: 3, product_name: "Cotton T-Shirt", quantity: 1, unit_price: 14.99, total_price: 14.99 }],
  },
  {
    id: 5, order_number: "ORD-1005", customer_name: "Hina Riaz", customer_email: "hina@example.com",
    customer_phone: "555-5555", total_amount: 22.99, status: "cancelled", created_at: "2026-07-06",
    items: [{ id: 6, order_id: 5, product_id: 8, product_name: "Ceramic Mug Set", quantity: 1, unit_price: 22.99, total_price: 22.99 }],
  },
];

const revenueTrend: RevenuePoint[] = [
  { label: "Mon", revenue: 320 },
  { label: "Tue", revenue: 480 },
  { label: "Wed", revenue: 260 },
  { label: "Thu", revenue: 610 },
  { label: "Fri", revenue: 540 },
  { label: "Sat", revenue: 720 },
  { label: "Sun", revenue: 390 },
];

const topProducts: TopProduct[] = [
  { id: 1, name: "Wireless Mouse", units_sold: 58, revenue: 1159.42 },
  { id: 3, name: "Cotton T-Shirt", units_sold: 44, revenue: 659.56 },
  { id: 7, name: "Scented Candle", units_sold: 39, revenue: 506.61 },
  { id: 5, name: "Organic Honey 500g", units_sold: 33, revenue: 296.67 },
  { id: 2, name: "Bluetooth Speaker", units_sold: 21, revenue: 839.79 },
];

// simulate network latency
const delay = <T,>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 250));

// ---- Mock API functions (mirror real api.ts signatures) ----

export const getProducts = () => delay(products);
export const getProduct = (id: number) => delay(products.find((p) => p.id === id) || null);
export const getProductMovements = (productId: number) =>
  delay(stockMovements.filter((m) => m.product_id === productId));

export const getCategories = () => delay(categories);
export const getSuppliers = () => delay(suppliers);

export const getOrders = () => delay(orders);
export const getOrder = (id: number) => delay(orders.find((o) => o.id === id) || null);

export const getDashboardStats = (): Promise<DashboardStats> =>
  delay({
    total_products: products.length,
    total_orders: orders.length,
    low_stock_count: products.filter((p) => p.stock_quantity <= p.low_stock_threshold).length,
    revenue_this_month: orders.reduce((sum, o) => sum + o.total_amount, 0),
  });

export const getRevenueTrend = () => delay(revenueTrend);
export const getTopProducts = () => delay(topProducts);
export const getRecentOrders = () => delay(orders.slice(0, 5));
export const getLowStockProducts = () =>
  delay(products.filter((p) => p.stock_quantity <= p.low_stock_threshold));

// ---- Customers (Phase 1 mock) ----
import { Customer } from "@/types/customer";

const customers: Customer[] = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@example.com", phone: "555-1111", total_orders: 3, total_spent: 184.5, created_at: "2026-05-10" },
  { id: 2, name: "Bilal Ahmed", email: "bilal@example.com", phone: "555-2222", total_orders: 1, total_spent: 39.99, created_at: "2026-05-18" },
  { id: 3, name: "Hina Riaz", email: "hina@example.com", phone: "555-5555", total_orders: 2, total_spent: 45.98, created_at: "2026-06-01" },
];

export const getCustomers = () => delay(customers);
export const getCustomer = (id: number) => delay(customers.find((c) => c.id === id) || null);
