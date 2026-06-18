import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const TEMPLATES_DIR = path.join(process.cwd(), "templates");

// Pozwala na bezpieczne tylko-nazwy-folderów (zero ../ traversal)
const SAFE_SLUG = /^[a-z0-9-]+$/i;

export async function GET(
  req: NextRequest, // Zmienione z _req, aby użyć go do odczytania query params
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

  // 1. Wyciągamy parametr ?device z adresu URL (domyślnie "desktop")
  const { searchParams } = new URL(req.url);
  const device = searchParams.get("device") || "desktop";

  // 2. Definiujemy oszukany viewport dla urządzeń mobilnych
  let viewportMeta = '<meta name="viewport" content="width=device-width, initial-scale=1">';
  
  if (device === "desktop") {
    viewportMeta = '<meta name="viewport" content="width=1200">'; // Zmusza telefon do renderowania wersji PC
  } else if (device === "tablet") {
    viewportMeta = '<meta name="viewport" content="width=768">';
  }

  // 3. Czytamy oryginalny plik HTML
  const html = fs.readFileSync(filePath, "utf-8");

  // 4. Modyfikujemy kod HTML w pamięci RAM przed wysłaniem
  // Usuwamy stary tag viewport (jeśli istnieje) i wklejamy nowy zaraz po <head>
  let modifiedHtml = html.replace(/<meta name="viewport"[^>]*>/gi, "");
  modifiedHtml = modifiedHtml.replace(/<head>/i, `<head>\n    ${viewportMeta}`);

  return new NextResponse(modifiedHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Pozwalamy na osadzenie tylko w ramach własnej domeny (iframe na stronie głównej)
      "X-Frame-Options": "SAMEORIGIN",
      "Cache-Control": "public, max-age=300",
    },
  });
}