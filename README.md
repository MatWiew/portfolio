# Portfolio — Mateusz Wiewióra

Strona portfolio typu one-page zbudowana w Next.js (App Router), z animacjami
Framer Motion, dynamiczną sekcją podglądu szablonów i formularzem kontaktowym
wysyłającym maile przez Resend. Gotowa do wdrożenia na Vercel.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** — animacje i mikro-interakcje
- **Resend** — wysyłka maili z formularza kontaktowego
- **Zod** — walidacja danych formularza

## Uruchomienie lokalnie

```bash
npm install
cp .env.example .env.local   # i uzupełnij RESEND_API_KEY
npm run dev
```

Strona będzie dostępna na `http://localhost:3000`.

## Struktura projektu

```
src/
  app/
    page.tsx               # składa wszystkie sekcje strony
    layout.tsx              # fonty, meta tagi SEO
    api/
      contact/route.ts       # wysyłka formularza przez Resend
      templates/route.ts     # listuje szablony z /templates
      templates/[slug]/preview/route.ts  # serwuje preview/index.html danego szablonu
  components/                # Hero, Nav, Templates, Projects, Contact, Footer...
  data/
    projects.ts              # treść sekcji "Projekty" (bento grid)
    skills.ts                # treść paska umiejętności w hero
    site.ts                  # mail, telefon, linki social — edytuj tutaj
templates/                   # ZOBACZ templates/README.md
  ecommerce-panel/
  social-platform/
  saas-project-manager/
```

## Jak edytować treść strony

| Co chcesz zmienić | Gdzie edytować |
|---|---|
| Mail, telefon, LinkedIn, GitHub | `src/data/site.ts` |
| Karty w sekcji „Projekty” (realizacje) | `src/data/projects.ts` |
| Pasek umiejętności w hero | `src/data/skills.ts` |
| Tekst hero, nagłówki sekcji | odpowiedni plik w `src/components/` |
| Szablony z live-preview | folder `templates/` — zobacz `templates/README.md` |

### Projekty bez zdjęcia

W `src/data/projects.ts` pole `image` jest **opcjonalne**. Jeśli je pominiesz,
karta w bento grid automatycznie dostanie wygenerowane tło (gradient + wzór
linii w kolorze zależnym od ID projektu) — sekcja nigdy nie wygląda na
niedokończoną, nawet bez grafiki.

```ts
{
  id: 6,
  title: "Projekt bez zdjęcia",
  desc: "Opis realizacji...",
  tech: ["React", "Node.js"],
  // image: "https://...",   ← pomiń to pole, gdy nie masz zrzutu
  link: "https://...",
}
```

## Wdrożenie na Vercel

1. Wypchnij repozytorium na GitHub.
2. Na [vercel.com](https://vercel.com) → **Add New Project** → wybierz repo.
   Framework Preset zostanie wykryty automatycznie jako Next.js.
3. W **Project Settings → Environment Variables** dodaj:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (domyślnie `kontakt@mateuszwiewiora.pl`)
   - `CONTACT_FROM_EMAIL` (zobacz sekcję Resend poniżej)
4. Deploy.

Folder `templates/` jest częścią repozytorium, więc trafia do builda
automatycznie — żeby dodać nowy szablon, wystarczy dodać podfolder i wypchnąć
zmiany (Vercel zrobi nowy deploy).

## Konfiguracja Resend (wysyłka maili)

1. Załóż konto na [resend.com](https://resend.com) i wygeneruj klucz API
   (Dashboard → API Keys).
2. **Zweryfikuj domenę** (Dashboard → Domains → Add Domain), np.
   `mateuszwiewiora.pl`, dodając wskazane rekordy DNS. Bez tego można wysyłać
   tylko z `onboarding@resend.dev` i tylko na adres właściciela konta Resend —
   wystarczy do testów, ale nie do produkcji.
3. Po weryfikacji domeny ustaw `CONTACT_FROM_EMAIL` na adres z tej domeny,
   np. `wiadomosci@mateuszwiewiora.pl`.

Logika wysyłki znajduje się w `src/app/api/contact/route.ts` i ma w kodzie
dwa gotowe warianty z komentarzem:
- **Wariant A (aktywny)** — wiadomość trafia tylko do Ciebie.
- **Wariant B (zakomentowany)** — dodatkowo wysyła automatyczne potwierdzenie
  do osoby, która wypełniła formularz. Odkomentuj blok w pliku, gdy będziesz
  gotowy/-a go używać.

## Dodawanie nowych szablonów do podglądu na żywo

Zobacz `templates/README.md` — w skrócie: nowy podfolder w `templates/` z
plikiem `meta.json` i `preview/index.html`, i szablon automatycznie pojawi
się jako nowa zakładka na stronie.
