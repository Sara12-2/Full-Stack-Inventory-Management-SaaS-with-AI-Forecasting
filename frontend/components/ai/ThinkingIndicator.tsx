import { Sparkles } from "lucide-react";

export default function ThinkingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-3.5 py-3 dark:border-border-dark dark:bg-card-dark">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-secondary dark:bg-text-secondary-dark"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
