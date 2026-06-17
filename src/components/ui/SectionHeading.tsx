interface SectionHeadingProps {
  windowLabel: string; // e.g. "WINDOW.01"
  title: string; // e.g. "OPERATOR DOSSIER"
}

export function SectionHeading({ windowLabel, title }: SectionHeadingProps) {
  return (
    <h2 className="text-accent-yellow text-glow-green text-sm sm:text-base font-bold tracking-widest uppercase mb-6">
      <span className="text-text-dim">[</span>
      {windowLabel}
      <span className="text-text-dim">]</span>{" "}
      <span className="text-text-dim">{"//"}</span> {title}
    </h2>
  );
}
