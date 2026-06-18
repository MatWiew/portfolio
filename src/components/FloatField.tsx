"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function FloatField({
  label,
  type = "text",
  value,
  onChange,
  textarea,
  name,
  required,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  name: string;
  required?: boolean;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const baseClass =
    "w-full bg-white/[0.03] border rounded-xl px-4 pt-7 pb-3 text-foreground outline-none transition-colors focus:border-primary/50 font-sans text-sm " +
    (error ? "border-red-500/50" : "border-white/10");

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          rows={4}
          name={name}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
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
          onFocus={() => setFocused(true)}
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
    </div>
  );
}
