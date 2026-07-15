import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "danger" | "primary";

const variantClasses: Record<Variant, string> = {
  default: "bg-neutral-100 text-text-secondary dark:bg-white/5 dark:text-text-secondary-dark",
  primary: "bg-primary-light text-primary dark:bg-primary/10",
  success: "bg-success-light text-success dark:bg-success/10",
  warning: "bg-warning-light text-warning dark:bg-warning/10",
  danger: "bg-danger-light text-danger dark:bg-danger/10",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export default function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
