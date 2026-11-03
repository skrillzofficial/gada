import type { TaskerStatus } from "../mock-data";

const styles: Record<TaskerStatus, { label: string; className: string }> = {
  pending_review: {
    label: "Pending review",
    className: "bg-bridge-100 text-gada",
  },
  changes_requested: {
    label: "Changes requested",
    className: "bg-orange-100 text-orange-800",
  },
  verified: { label: "Verified", className: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
};

export function StatusBadge({ status }: { status: TaskerStatus }) {
  const { label, className } = styles[status];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
