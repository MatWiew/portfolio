import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const TEMPLATES_DIR = path.join(process.cwd(), "templates");

// Pozwala na bezpieczne tylko-nazwy-folderów (zero ../ traversal)
const SAFE_SLUG = /^[a-z0-9-]+$/i;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!SAFE_SLUG.test(slug)) {
    return NextResponse.json({ error: "Nieprawidłowy identyfikator szablonu" }, { status: 400 });
  }

  const filePath = path.join(TEMPLATES_DIR, slug, "preview", "index.html");
  const resolvedDir = path.resolve(TEMPLATES_DIR, slug, "preview");

  // Dodatkowa ochrona przed path traversal
  if (!resolvedDir.startsWith(path.resolve(TEMPLATES_DIR))) {
    return NextResponse.json({ error: "Nieprawidłowa ścieżka" }, { status: 400 });
  }

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Podgląd dla tego szablonu nie istnieje. Dodaj plik preview/index.html." },
      { status: 404 }
    );
  }

  const html = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Pozwalamy na osadzenie tylko w ramach własnej domeny (iframe na stronie głównej)
      "X-Frame-Options": "SAMEORIGIN",
      "Cache-Control": "public, max-age=300",
    },
  });
}
