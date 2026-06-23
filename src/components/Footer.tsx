"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link"; // Importujemy Link z next/link
import { LinkedInIcon } from "./LinkedInIcon";
import { GitHubIcon } from "./GitHubIcon";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-xs text-muted-foreground text-center sm:text-left select-none flex flex-wrap justify-center sm:justify-start gap-3 items-center"
      >
        <span>© {new Date().getFullYear()} {SITE.name} — {SITE.role}</span>
        
        {/* Link do polityki prywatności */}
        <Link 
          href="/polityka-prywatnosci" 
          className="hover:text-primary transition-colors underline underline-offset-4"
        >
          Polityka prywatności
        </Link>
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
    </footer>
  );
}