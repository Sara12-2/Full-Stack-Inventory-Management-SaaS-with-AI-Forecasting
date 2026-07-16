import axios from "axios";
import { getToken } from "@/lib/auth";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalizes any axios error into a plain, user-facing message.
// Never surfaces raw network/localhost error text to the UI.
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.error) return err.response.data.error;
    if (err.code === "ERR_NETWORK") return "Can't reach the server. Make sure the backend is running.";
    return "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}

// ---- Auth ----
export const login = (email: string, password: string) =>
  client.post("/auth/login", { email, password }).then((r) => r.data);
export const signup = (name: string, email: string, password: string) =>
  client.post("/auth/signup", { name, email, password }).then((r) => r.data);
export const getMe = () => client.get("/auth/me").then((r) => r.data);

// ---- Products ----
export const getProducts = () => client.get("/products").then((r) => r.data);
export const getProduct = (id: number) => client.get(`/products/${id}`).then((r) => r.data);
export const createProduct = (data: Record<string, unknown>) => client.post("/products", data).then((r) => r.data);
export const updateProduct = (id: number, data: Record<string, unknown>) => client.put(`/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id: number) => client.delete(`/products/${id}`).then((r) => r.data);
export const getProductMovements = (productId: number) => client.get(`/products/${productId}/movements`).then((r) => r.data);

// ---- Categories ----
export const getCategories = () => client.get("/categories").then((r) => r.data);
export const createCategory = (data: Record<string, unknown>) => client.post("/categories", data).then((r) => r.data);

// ---- Suppliers ----
export const getSuppliers = () => client.get("/suppliers").then((r) => r.data);
export const createSupplier = (data: Record<string, unknown>) => client.post("/suppliers", data).then((r) => r.data);
export const updateSupplier = (id: number, data: Record<string, unknown>) => client.put(`/suppliers/${id}`, data).then((r) => r.data);
export const deleteSupplier = (id: number) => client.delete(`/suppliers/${id}`).then((r) => r.data);

// ---- Inventory ----
export const adjustStock = (productId: number, movementType: string, quantity: number, reason: string) =>
  client.post("/inventory/adjust", { product_id: productId, movement_type: movementType, quantity, reason }).then((r) => r.data);

// ---- Orders ----
export const getOrders = () => client.get("/orders").then((r) => r.data);
export const getOrder = (id: number) => client.get(`/orders/${id}`).then((r) => r.data);
export const createOrder = (data: Record<string, unknown>) => client.post("/orders", data).then((r) => r.data);
export const updateOrderStatus = (id: number, status: string) => client.put(`/orders/${id}/status`, { status }).then((r) => r.data);

// ---- Customers ----
export const getCustomers = () => client.get("/customers").then((r) => r.data);
export const getCustomer = (id: number) => client.get(`/customers/${id}`).then((r) => r.data);
export const createCustomer = (data: Record<string, unknown>) => client.post("/customers", data).then((r) => r.data);

// ---- Dashboard ----
export const getDashboardStats = () => client.get("/dashboard/stats").then((r) => r.data);
export const getRevenueTrend = () => client.get("/dashboard/revenue").then((r) => r.data);
export const getTopProducts = () => client.get("/dashboard/top-products").then((r) => r.data);
export const getRecentOrders = () => client.get("/dashboard/recent-orders").then((r) => r.data);
export const getLowStockProducts = () => client.get("/dashboard/low-stock").then((r) => r.data);

// ---- Reports ----
export type ReportType = "inventory" | "orders" | "revenue" | "movements";

export async function downloadReport(reportType: ReportType): Promise<void> {
  const response = await client.get(`/reports/${reportType}`, { responseType: "blob" });
  const blob = new Blob([response.data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${reportType}_report.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export default client;
