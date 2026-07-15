import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-neutral-100 text-text-primary hover:bg-neutral-200 dark:bg-white/5 dark:text-text-primary-dark dark:hover:bg-white/10",
  outline: "border border-border bg-card text-text-primary hover:bg-neutral-50 dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark dark:hover:bg-white/5",
  ghost: "text-text-secondary hover:bg-neutral-100 hover:text-text-primary dark:text-text-secondary-dark dark:hover:bg-white/5 dark:hover:text-text-primary-dark",
  danger: "bg-danger text-white hover:bg-red-800",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  icon: "p-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
