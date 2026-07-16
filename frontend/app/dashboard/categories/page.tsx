"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { getCategories } from "@/lib/api";
import { Category } from "@/types/category";
import DataTable, { Column } from "@/components/shared/DataTable";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getCategories()
      .then(setCategories)
      .catch(() => setError("Couldn't load categories. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const columns: Column<Category>[] = [
    { header: "Name", accessor: (c) => <span className="font-medium text-text-primary dark:text-text-primary-dark">{c.name}</span> },
    { header: "Description", accessor: (c) => c.description },
    { header: "Created", accessor: (c) => formatDate(c.created_at) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Categories</h1>
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : error ? (
        <EmptyState icon={AlertTriangle} title="Something went wrong" description={error} actionLabel="Retry" onAction={load} />
      ) : (
        <DataTable columns={columns} data={categories} keyExtractor={(c) => c.id} emptyMessage="No categories found." />
      )}
    </div>
  );
}
