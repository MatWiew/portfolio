"use client";

import { motion } from "framer-motion";
import { Mail, Shield } from "lucide-react";
import Link from "next/link"; // Importujemy Link z next/link
import { LinkedInIcon } from "./LinkedInIcon";
import { GitHubIcon } from "./GitHubIcon";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-xs text-muted-foreground text-center sm:text-left select-none flex flex-wrap justify-center sm:justify-start gap-3 items-center"
      >
        <span>© {new Date().getFullYear()} {SITE.name} — {SITE.role}</span>
      </span>

      <div className="flex gap-5">
        <motion.a
          whileHover={{ y: -3, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <GitHubIcon className="w-4 h-4" />
        </motion.a>
        <motion.a
          whileHover={{ y: -3, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <LinkedInIcon className="w-4 h-4" />
        </motion.a>
        <motion.a
          whileHover={{ y: -3, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          href={`mailto:${SITE.email}`}
          aria-label="E-mail"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="w-4 h-4" />
        </motion.a>
      </div>
      <Link 
        href="/polityka-prywatnosci" 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-muted-foreground/50 hover:text-primary/70 transition-colors"
        title="Polityka Prywatności"
      >
        <Shield className="w-3 h-3" />
        <span>Privacy</span>
      </Link>
    </footer>
  );
}