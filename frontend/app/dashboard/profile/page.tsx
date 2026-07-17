"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Mail, Shield, CalendarDays } from "lucide-react";
import { getMe, getErrorMessage } from "@/lib/api";
import { User } from "@/types/user";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getMe()
      .then(setUser)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description={error ?? "Couldn't load your profile."}
        actionLabel="Retry"
        onAction={load}
      />
    );
  }

  const initials = user.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Profile</h1>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{user.name}</h2>
            <p className="text-sm capitalize text-text-secondary dark:text-text-secondary-dark">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t border-border pt-6 dark:border-border-dark">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
            <span className="text-text-secondary dark:text-text-secondary-dark">Email</span>
            <span className="ml-auto font-medium text-text-primary dark:text-text-primary-dark">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
            <span className="text-text-secondary dark:text-text-secondary-dark">Role</span>
            <span className="ml-auto font-medium capitalize text-text-primary dark:text-text-primary-dark">{user.role}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="h-4 w-4 text-text-secondary dark:text-text-secondary-dark" />
            <span className="text-text-secondary dark:text-text-secondary-dark">Member since</span>
            <span className="ml-auto font-medium text-text-primary dark:text-text-primary-dark">{formatDate(user.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
