"use client";

import { useState } from "react";
import { FileBarChart, Download, Loader2 } from "lucide-react";
import { downloadReport, getErrorMessage, ReportType } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";

const reports: { id: ReportType; label: string; description: string }[] = [
  { id: "inventory", label: "Inventory Report", description: "Current stock levels, values, and low stock items" },
  { id: "orders", label: "Order Report", description: "All orders within a selected date range" },
  { id: "revenue", label: "Revenue Report", description: "Total revenue broken down by period" },
  { id: "movements", label: "Stock Movement Report", description: "All stock movements by product" },
];

export default function ReportsPage() {
  const [loadingId, setLoadingId] = useState<ReportType | null>(null);
  const { showToast } = useToast();

  const handleExport = async (id: ReportType) => {
    setLoadingId(id);
    try {
      await downloadReport(id);
    } catch (err) {
      showToast("error", getErrorMessage(err));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Reports</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reports.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary p-2.5">
                <FileBarChart className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">{r.label}</h3>
                <p className="mt-1 text-xs text-text-secondary dark:text-text-secondary-dark">{r.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleExport(r.id)}
              disabled={loadingId === r.id}
              className="mt-4 flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-border-dark dark:text-text-secondary-dark dark:hover:bg-white/5"
            >
              {loadingId === r.id ? (
                <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download aria-hidden="true" className="h-3.5 w-3.5" />
              )}
              Export CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
