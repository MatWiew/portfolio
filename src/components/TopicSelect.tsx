"use client";

import { motion } from "framer-motion";

export const TOPICS = [
  "Wizytówki",
  "Sklepy WWW",
  "Landing Page",
  "Strony Firmowe",
  "Aplikacje Webowe",
  "Inne",
] as const;

export function TopicSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-[13px] uppercase tracking-widest text-muted-foreground/70 mb-2.5 px-1"
      >
        Temat wiadomości
      </p>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic, i) => {
          const active = value === topic;
          return (
            <motion.button
              key={topic}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(topic)}
              className={`relative text-sm px-4 py-2 rounded-full border transition-colors overflow-hidden ${
                active
                  ? "border-primary/60 text-primary"
                  : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground/80"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="topic-highlight"
                  className="absolute inset-0 bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{topic}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
