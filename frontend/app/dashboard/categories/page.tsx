"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/mock-api";
import { Category } from "@/types/category";
import DataTable, { Column } from "@/components/shared/DataTable";
import { formatDate } from "@/lib/utils";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const columns: Column<Category>[] = [
    { header: "Name", accessor: (c) => <span className="font-medium text-gray-800">{c.name}</span> },
    { header: "Description", accessor: (c) => c.description },
    { header: "Created", accessor: (c) => formatDate(c.created_at) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Categories</h1>
      <DataTable columns={columns} data={categories} keyExtractor={(c) => c.id} emptyMessage="No categories found." />
    </div>
  );
}
