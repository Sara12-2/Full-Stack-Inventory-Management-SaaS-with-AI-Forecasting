import { StockMovement } from "@/types/product";
import { formatDate } from "@/lib/utils";

const typeColor: Record<string, string> = {
  in: "bg-success-light text-success dark:bg-success/10",
  out: "bg-danger-light text-danger dark:bg-danger/10",
  adjustment: "bg-warning-light text-warning dark:bg-warning/10",
};

export default function StockMovementHistory({ movements }: { movements: StockMovement[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
      <h3 className="mb-4 font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">Stock movement history</h3>
      {movements.length === 0 ? (
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">No movements recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {movements.map((m) => (
            <li key={m.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColor[m.movement_type]}`}>{m.movement_type}</span>
                <span className="text-text-primary dark:text-text-primary-dark">{m.reason}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary dark:text-text-secondary-dark">
                <span>{m.quantity > 0 ? `+${m.quantity}` : m.quantity}</span>
                <span>{formatDate(m.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
