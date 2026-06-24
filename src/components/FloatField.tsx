"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function FloatField({
  label,
  type = "text",
  value,
  onChange,
  onFocus: onFocusExternal,
  textarea,
  name,
  required,
  error,
  highlight,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  textarea?: boolean;
  name: string;
  required?: boolean;
  error?: string;
  /** Gdy true, pole na krótko "pulsuje" — sygnalizuje że wartość została
   * wstawiona automatycznie (np. po kliknięciu "Zapytaj o..." w ofercie). */
  highlight?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
    onFocusExternal?.();
  };
  const floated = focused || value.length > 0;
  const baseClass =
    "w-full bg-white/[0.03] border rounded-xl px-4 pt-7 pb-3 text-foreground outline-none transition-colors focus:border-primary/50 font-sans text-sm " +
    (error ? "border-red-500/50" : "border-white/10");

  return (
    <motion.div
      className="relative rounded-xl"
      animate={
        highlight
          ? { boxShadow: ["0 0 0 0 rgba(0,212,255,0)", "0 0 0 4px rgba(0,212,255,0.18)", "0 0 0 0 rgba(0,212,255,0)"] }
          : {}
      }
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      {textarea ? (
        <textarea
          rows={4}
          name={name}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          className={baseClass + " resize-none"}
          aria-label={label}
          aria-invalid={!!error}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          className={baseClass}
          aria-label={label}
          aria-invalid={!!error}
        />
      )}
      <motion.span
        animate={{
          y: floated ? -9 : 0,
          scale: floated ? 0.72 : 1,
          color: error
            ? "#ef4444"
            : focused
            ? "#00d4ff"
            : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute left-4 top-5 text-sm origin-left pointer-events-none font-mono"
      >
        {label}
      </motion.span>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono px-1">{error}</p>
      )}
    </motion.div>
  );
}
