"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";
interface Toast { id: number; type: ToastType; message: string; }
interface ToastContextValue { showToast: (type: ToastType, message: string) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

const config: Record<ToastType, { icon: typeof CheckCircle2; iconClass: string }> = {
  success: { icon: CheckCircle2, iconClass: "text-success" },
  error: { icon: XCircle, iconClass: "text-danger" },
  info: { icon: Info, iconClass: "text-primary" },
  warning: { icon: AlertTriangle, iconClass: "text-warning" },
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const { icon: Icon, iconClass } = config[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark"
              >
                <Icon aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} />
                <p className="flex-1 text-sm text-text-primary dark:text-text-primary-dark">{t.message}</p>
                <button onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="shrink-0 text-text-secondary hover:text-text-primary dark:text-text-secondary-dark">
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
