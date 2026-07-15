import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
}

export default function DataTable<T>({ columns, data, keyExtractor, emptyMessage = "No records found." }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50/60 text-xs uppercase text-text-secondary dark:bg-white/[0.02] dark:text-text-secondary-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-medium">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary dark:text-text-secondary-dark">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={keyExtractor(row)} className="text-text-primary transition-colors hover:bg-slate-50/60 dark:text-text-primary-dark dark:hover:bg-white/[0.03]">
                {columns.map((col) => (
                  <td key={col.header} className={`px-4 py-3 ${col.className || ""}`}>{col.accessor(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
