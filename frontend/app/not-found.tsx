import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6 dark:bg-surface-dark">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 text-center shadow-sm dark:border-border-dark dark:bg-card-dark dark:shadow-sm-dark">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light dark:bg-primary/10">
          <PackageSearch className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-text-primary dark:text-text-primary-dark">Page not found</h2>
        <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
