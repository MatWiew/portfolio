import { ReactNode } from "react";
import clsx from "clsx";

interface TerminalWindowProps {
  /** Window ID shown on the left of the header, e.g. "P.01" or "WND.02.FRO" */
  windowId: string;
  /** Title shown after the "—" separator, e.g. "NEUROVAULT" */
  title: string;
  /** Optional badge shown on the right of the header content area (e.g. status pill) */
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Accent color for the window id text */
  accent?: "green" | "cyan" | "yellow" | "dim";
}

const accentClasses: Record<NonNullable<TerminalWindowProps["accent"]>, string> = {
  green: "text-accent-green",
  cyan: "text-accent-cyan",
  yellow: "text-accent-yellow",
  dim: "text-text-dim",
};

export function TerminalWindow({
  windowId,
  title,
  headerRight,
  children,
  className,
  accent = "green",
}: TerminalWindowProps) {
  return (
    <div className={clsx("terminal-panel flex flex-col", className)}>
      <div className="terminal-header flex items-center justify-between px-4 py-2.5 text-xs tracking-wider">
        <div className="flex items-center gap-2 min-w-0">
          <span className={clsx("font-bold whitespace-nowrap", accentClasses[accent])}>
            {windowId}
          </span>
          <span className="text-text-dim">—</span>
          <span className="text-text-dim uppercase truncate">{title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          {headerRight}
          <div className="hidden sm:flex items-center gap-1.5 text-text-faint">
            <span>—</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-5 sm:p-6">{children}</div>
    </div>
  );
}
