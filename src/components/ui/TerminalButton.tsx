import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  prompt?: boolean; // show ">_" prefix
}

export function TerminalButton({
  children,
  variant = "ghost",
  prompt = true,
  className,
  ...props
}: TerminalButtonProps) {
  return (
    <button
      className={clsx(
        "group relative w-full sm:w-auto px-5 py-2.5 text-xs font-bold tracking-widest uppercase border transition-all duration-200",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary"
          ? "border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-void hover:shadow-glow-green"
          : "border-border-bright text-text-primary hover:border-accent-cyan hover:text-accent-cyan hover:shadow-glow-cyan",
        className
      )}
      {...props}
    >
      {prompt && <span className="mr-2 opacity-70">&gt;_</span>}
      {children}
    </button>
  );
}
