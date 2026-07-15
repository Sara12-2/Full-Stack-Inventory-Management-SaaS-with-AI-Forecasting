"use client";

import { Supplier } from "@/types/supplier";
import DataTable, { Column } from "@/components/shared/DataTable";
import { Pencil, Trash2 } from "lucide-react";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export default function SupplierTable({ suppliers, onEdit, onDelete }: SupplierTableProps) {
  const columns: Column<Supplier>[] = [
    { header: "Name", accessor: (s) => <span className="font-medium text-text-primary dark:text-text-primary-dark">{s.name}</span> },
    { header: "Email", accessor: (s) => s.email },
    { header: "Phone", accessor: (s) => s.phone },
    {
      header: "Actions",
      accessor: (s) => (
        <div className="flex gap-1">
          <button onClick={() => onEdit(s)} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/10">
            <Pencil className="h-3.5 w-3.5 text-text-secondary dark:text-text-secondary-dark" />
          </button>
          <button onClick={() => onDelete(s)} className="rounded-lg p-1.5 hover:bg-danger-light dark:hover:bg-danger/10">
            <Trash2 className="h-3.5 w-3.5 text-danger" />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={suppliers} keyExtractor={(s) => s.id} emptyMessage="No suppliers found." />;
}
