"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Link/przycisk, który delikatnie "przyciąga się" do kursora przy hover —
 * mikro-interakcja podkreślająca dbałość o detal w sekcji projektów.
 */
export function MagneticBtn({
  children,
  className,
  href,
  target,
  rel,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href ?? "#"}
      target={target}
      rel={rel}
      onClick={onClick}
      animate={{ x: xy.x, y: xy.y }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setXY({
          x: (e.clientX - r.left - r.width / 2) * 0.28,
          y: (e.clientY - r.top - r.height / 2) * 0.28,
        });
      }}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      className={className}
    >
      {children}
    </motion.a>
  );
}
