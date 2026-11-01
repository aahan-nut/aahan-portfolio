import type { Status } from "@/content/types";

const LABEL: Record<Status, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
  unconfirmed: "Status needed",
};

export function StatusTag({ status }: { status: Status }) {
  return (
    <span className={`status status--${status}`} {...(status === "unconfirmed" ? { "data-missing": true } : {})}>
      <span className="status__dot" aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}
