"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StackTag } from "@/components/ui/StackTag";
import { TerminalButton } from "@/components/ui/TerminalButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { projects } from "@/data/projects";
import { Project } from "@/types/content";

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="px-4 sm:px-8 py-20">
      <SectionHeading windowLabel="WINDOW.03" title="DEPLOYED SYSTEMS" />

      <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.1}>
        {projects.map((project) => (
          <div key={project.id} data-reveal-item>
            <TerminalWindow
              windowId={project.id}
              title={project.codename}
              headerRight={<StatusBadge status={project.status} />}
              accent="yellow"
            >
              <div className="flex flex-col h-full">
                <p className="text-xs text-text-dim tracking-wider mb-3">
                  {project.category}
                </p>
                <p className="text-sm text-text-primary leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <StackTag key={tech}>{tech}</StackTag>
                  ))}
                </div>
                <TerminalButton
                  variant="ghost"
                  className="w-full"
                  onClick={() => setSelected(project)}
                >
                  INSPECT SYSTEM
                </TerminalButton>
              </div>
            </TerminalWindow>
          </div>
        ))}
      </RevealOnScroll>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
