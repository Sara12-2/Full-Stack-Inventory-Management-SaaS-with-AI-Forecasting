import { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/5">
        <Icon className="h-5 w-5 text-text-secondary dark:text-text-secondary-dark" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-text-primary dark:text-text-primary-dark">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-text-secondary dark:text-text-secondary-dark">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
