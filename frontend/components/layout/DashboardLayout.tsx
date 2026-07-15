"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DesktopSidebar, MobileSidebar } from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useToast } from "@/components/providers/ToastProvider";
import { disconnectSocket, getSocket } from "@/lib/socket";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    const onLowStock = (data: { product_name: string; stock_quantity: number }) => {
      showToast("warning", `${data.product_name} is low on stock (${data.stock_quantity} left).`);
    };
    const onNewOrder = (data: { order_number: string; customer_name: string }) => {
      showToast("info", `New order ${data.order_number} from ${data.customer_name}.`);
    };

    socket.on("low_stock_alert", onLowStock);
    socket.on("new_order_alert", onNewOrder);

    return () => {
      socket.off("low_stock_alert", onLowStock);
      socket.off("new_order_alert", onNewOrder);
      disconnectSocket();
    };
  }, [showToast]);

  return (
    <ProtectedRoute>
      <div className="flex bg-surface dark:bg-surface-dark">
        <DesktopSidebar />
        <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <div className="min-w-0 flex-1">
          <Navbar onMenuClick={() => setMobileNavOpen(true)} />
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-[calc(100vh-4rem)] p-4 sm:p-6"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
