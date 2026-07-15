import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary outline-none transition-shadow placeholder:text-text-secondary focus:border-primary focus:shadow-[0_0_0_3px_rgba(13,148,121,0.12)]",
        "dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
export default Input;
