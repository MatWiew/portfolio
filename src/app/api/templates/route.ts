import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Wymuszamy dynamiczne renderowanie — lista szablonów jest czytana z
// systemu plików przy każdym requeście, więc nowy folder w /templates
// pojawi się bez potrzeby przebudowy aplikacji (poza ponownym deployem
// na Vercelu, które i tak jest wymagane, by nowe pliki trafiły do builda).
export const dynamic = "force-dynamic";

const TEMPLATES_DIR = path.join(process.cwd(), "templates");

export type TemplateMeta = {
  slug: string;
  name: string;
  desc: string;
  tech: string[];
  accent: string;
  /** true jeśli folder zawiera templates/<slug>/preview/index.html */
  hasPreview: boolean;
};

function readTemplate(slug: string): TemplateMeta | null {
  const dir = path.join(TEMPLATES_DIR, slug);
  const metaPath = path.join(dir, "meta.json");

  if (!fs.existsSync(metaPath)) return null;

  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    const json = JSON.parse(raw);

    if (!json.name || !json.desc || !Array.isArray(json.tech)) {
      return null;
    }

    const previewPath = path.join(dir, "preview", "index.html");

    return {
      slug,
      name: String(json.name),
      desc: String(json.desc),
      tech: json.tech.map(String),
      accent: typeof json.accent === "string" ? json.accent : "#00d4ff",
      hasPreview: fs.existsSync(previewPath),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    return NextResponse.json({ templates: [] });
  }

  const entries = fs
    .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const templates = entries
    .map(readTemplate)
    .filter((t): t is TemplateMeta => t !== null);

  return NextResponse.json({ templates });
}
