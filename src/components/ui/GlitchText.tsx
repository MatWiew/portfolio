"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  /** Data attribute duplicated into ::before/::after via CSS attr() for the glitch layers */
  text: string;
}

/**
 * Renders text with a periodic RGB-split glitch effect (CSS-only, no JS
 * animation loop — keeps it cheap). The glitch fires every few seconds
 * via the `glitch` keyframes in globals.css, plus a stronger one-shot
 * burst on hover.
 */
export function GlitchText({ children, className, text }: GlitchTextProps) {
  return (
    <span className={clsx("glitch-text", className)} data-glitch-text={text}>
      {children}
    </span>
  );
}
