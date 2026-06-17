export function StackTag({ children }: { children: string }) {
  return (
    <span className="border border-border-bright text-accent-cyan text-[11px] px-2 py-0.5 tracking-wide">
      {children}
    </span>
  );
}
