# /templates

Ten folder to Twoja biblioteka podglądów projektów wyświetlanych w sekcji
„Szablony MERN” na stronie głównej. Każdy podfolder = jeden szablon
widoczny jako zakładka z live-preview w iframe.

## Jak dodać nowy szablon

1. Stwórz nowy podfolder, np. `templates/moj-projekt/`.
2. W środku dodaj plik `meta.json` (zobacz przykład poniżej).
3. W podfolderze `preview/` umieść statyczny build podglądu —
   **musi zawierać plik `index.html`** jako punkt wejścia. To może być:
   - eksport statyczny z Vite/CRA (`npm run build` → skopiuj zawartość `dist/`),
   - prosty, samodzielny plik HTML/CSS/JS,
   - zrzut/snapshot strony (np. wygenerowany przez `wget --mirror`).
4. Strona główna automatycznie wykryje nowy folder (patrz `src/app/api/templates/route.ts`)
   i doda go jako kolejną zakładkę — nie trzeba nic zmieniać w kodzie.

## Plik meta.json

```json
{
  "name": "Nazwa wyświetlana w zakładce",
  "desc": "Krótki opis pod podglądem (1-2 zdania).",
  "tech": ["React", "Node.js", "MongoDB"],
  "accent": "#00d4ff"
}
```

- `accent` to kolor HEX używany do akcentowania zakładki i badge'y tech stacku.
- Pola `name`, `desc`, `tech` są wymagane. `accent` jest opcjonalny
  (domyślnie użyty zostanie kolor primary strony: `#00d4ff`).

## Bezpieczeństwo

Podglądy są wczytywane w `<iframe sandbox="allow-scripts allow-same-origin">`,
więc nawet jeśli build w `preview/` zawiera błędy lub zewnętrzne skrypty,
nie wpłynie to na resztę strony portfolio.
