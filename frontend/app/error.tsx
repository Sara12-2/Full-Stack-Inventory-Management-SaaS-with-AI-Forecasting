"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production this is where you'd log to an error tracking service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6 dark:bg-surface-dark">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-light dark:bg-danger/10">
          <AlertTriangle className="h-6 w-6 text-danger" />
        </div>
        <h2 className="mt-4 font-heading text-lg font-bold text-text-primary dark:text-text-primary-dark">Something went wrong</h2>
        <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
          We hit an unexpected error. Try again, and if it keeps happening, refresh the page.
        </p>
        <button
          onClick={reset}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
      </div>
    </div>
  );
}
