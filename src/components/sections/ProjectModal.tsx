"use client";

import { useEffect } from "react";
import { Project } from "@/types/content";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StackTag } from "@/components/ui/StackTag";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-bg-void/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`System detail: ${project.codename}`}
    >
      <div
        className="terminal-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header flex items-center justify-between px-4 py-2.5 text-xs tracking-wider sticky top-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold whitespace-nowrap text-accent-yellow">
              {project.id}
            </span>
            <span className="text-text-dim">—</span>
            <span className="text-text-dim uppercase truncate">{project.codename}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-text-dim hover:text-accent-green transition-colors text-sm px-2"
          >
            × CLOSE
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-text-dim tracking-wider">{project.category}</span>
            <StatusBadge status={project.status} />
          </div>

          <p className="text-sm text-text-primary leading-relaxed">{project.description}</p>

          {project.challenge && (
            <div>
              <p className="text-xs font-bold text-accent-green tracking-widest mb-2">
                {"// PROBLEM TECHNICZNY"}
              </p>
              <p className="text-sm text-text-dim leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <p className="text-xs font-bold text-accent-cyan tracking-widest mb-2">
                {"// ROZWIĄZANIE"}
              </p>
              <p className="text-sm text-text-dim leading-relaxed">{project.solution}</p>
            </div>
          )}

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-border-dim">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="pt-4">
                  <p className="text-2xl font-extrabold text-accent-yellow text-glow-green">
                    {metric.value}
                  </p>
                  <p className="text-[10px] text-text-dim tracking-widest mt-1 uppercase">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-border-dim pt-4">
            {project.stack.map((tech) => (
              <StackTag key={tech}>{tech}</StackTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
