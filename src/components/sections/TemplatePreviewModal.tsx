"use client";

import { useEffect, useState } from "react";
import { Template } from "@/types/content";

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

/**
 * Renders the iframe + its own loading state. Mounted with `key={template.id}`
 * from the parent so switching templates naturally resets the loading state
 * via remount — no setState-in-effect needed.
 */
function PreviewFrame({
  previewUrl,
  templateName,
}: {
  previewUrl: string;
  templateName: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs text-text-dim tracking-widest animate-blink">
            LOADING PREVIEW...
          </p>
        </div>
      )}
      <iframe
        src={previewUrl}
        title={`Live preview: ${templateName}`}
        className="w-full h-full border-0"
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </>
  );
}

export function TemplatePreviewModal({
  template,
  onClose,
}: TemplatePreviewModalProps) {
  useEffect(() => {
    if (!template) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [template, onClose]);

  if (!template) return null;

  const previewUrl = template.previewUrl;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6 bg-bg-void/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Live preview: ${template.name}`}
    >
      <div
        className="terminal-panel w-full max-w-5xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header flex items-center justify-between px-4 py-2.5 text-xs tracking-wider shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold whitespace-nowrap text-accent-yellow">
              [PREVIEW]
            </span>
            <span className="text-text-dim">—</span>
            <span className="text-text-dim uppercase truncate">
              {template.name}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent-cyan transition-colors text-xs hidden sm:inline"
              >
                ↗ OTWÓRZ W NOWEJ KARCIE
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Zamknij podgląd"
              className="text-text-dim hover:text-accent-green transition-colors text-sm"
            >
              × CLOSE
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-bg-void">
          {!previewUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-text-dim">
                {"// Live preview jeszcze niedostępny dla tego szablonu."}
              </p>
            </div>
          )}

          {previewUrl && (
            <PreviewFrame
              key={template.id}
              previewUrl={previewUrl}
              templateName={template.name}
            />
          )}
        </div>

        {previewUrl && (
          <div className="px-4 py-2.5 border-t border-border-dim text-[11px] text-text-dim flex justify-between items-center shrink-0">
            <span>Pełna interakcja — scroll, klik, formularze</span>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan sm:hidden"
            >
              ↗ Otwórz w nowej karcie
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
