import clsx from "clsx";
import { ProjectStatus } from "@/types/content";

const statusStyles: Record<ProjectStatus, string> = {
  LIVE: "border-accent-green text-accent-green",
  BETA: "border-accent-yellow text-accent-yellow",
  OSS: "border-accent-cyan text-accent-cyan",
  ARCHIVED: "border-text-dim text-text-dim",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase",
        statusStyles[status]
      )}
    >
      <span className="text-[10px] leading-none">◆</span>
      {status}
    </span>
  );
}
