# mateuszwiewiora.com

Wizytówka osobista w stylu "Cyber-Noir Terminal" — ciemny UI, animacje
scroll-triggered (GSAP), tło WebGL z chmurą cząstek reagującą na kursor
(React Three Fiber), oraz działający formularz kontaktowy wysyłający
e-maile przez Resend.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — paleta "Cyber-Noir Terminal" zdefiniowana w `src/app/globals.css`
- **GSAP + ScrollTrigger** — animacje wejścia sekcji przy scrollu, wypełnianie progress barów
- **React Three Fiber + Three.js** — chmura punktów 3D w tle Hero
- **react-hook-form + zod** — walidacja formularza kontaktowego
- **Resend** — wysyłka e-maili z formularza

## Setup

```bash
npm install
cp .env.example .env.local
```

Wypełnij `.env.local`:

| Zmienna | Opis |
|---|---|
| `RESEND_API_KEY` | klucz API z [resend.com](https://resend.com) (darmowy plan wystarczy na start) |
| `CONTACT_RECEIVER_EMAIL` | adres, na który trafiają zgłoszenia z formularza |
| `CONTACT_SENDER_EMAIL` | adres "from" — domyślnie `onboarding@resend.dev` (działa od razu, ale warto zweryfikować własną domenę w Resend dla produkcji) |

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Struktura projektu

```
src/
├── app/
│   ├── api/contact/route.ts   — endpoint formularza (walidacja + rate limit + Resend)
│   ├── layout.tsx             — fonty (JetBrains Mono + Inter), metadata SEO
│   ├── page.tsx                — składa wszystkie sekcje strony
│   └── globals.css             — paleta kolorów, glow utilities, scanline overlay
├── components/
│   ├── ui/                     — TerminalWindow, TerminalButton, StatusBadge,
│   │                              StackTag, ProgressBar, SectionHeading,
│   │                              SystemBar, RevealOnScroll
│   ├── sections/                — Hero, About, CapabilityMatrix, Portfolio,
│   │                              ProjectModal, Shop, Contact, ContactForm
│   └── three/                   — HeroCanvas, ParticleField, BootOverlay
├── data/                        — treść: projects.ts, operator.ts, templates.ts
├── types/                       — content.ts (typy dla całej treści)
├── lib/validation/              — schema zod dla formularza kontaktowego
└── hooks/                       — useHeroReveal
```

## Zarządzanie treścią

Cała treść (projekty portfolio, capability matrix, szablony) żyje w
`src/data/*.ts` jako proste obiekty TypeScript — edycja nie wymaga CMS-a.

### Dodawanie nowego projektu do portfolio

Edytuj `src/data/projects.ts`, dodaj obiekt zgodny z typem `Project`
(`src/types/content.ts`). Pole `challenge`/`solution`/`metrics` zasila
modal "INSPECT SYSTEM" — opcjonalne, ale wzmacniają narrację techniczną.

### Dodawanie szablonu do sklepu

Edytuj `src/data/templates.ts`. Gdy szablon jest gotowy do sprzedaży,
ustaw `available: true` i dodaj `price`, `previewImage`, `href` —
znika wtedy badge "SOON". Filtrowanie po kategorii (WordPress/MERN/
WooCommerce) działa automatycznie w `Shop.tsx`.

Jeśli w przyszłości liczba szablonów wyrośnie i edycja plików `.ts`
stanie się niewygodna, naturalna migracja to headless CMS (np. Sanity.io)
— struktura typów w `content.ts` jest już do tego przygotowana.

## Deploy

Zalecany hosting: [Vercel](https://vercel.com) (natywna integracja z
Next.js, zero-config).

1. Połącz repozytorium z Vercel.
2. Ustaw zmienne środowiskowe z `.env.example` w panelu Vercel (Settings → Environment Variables).
3. Deploy — Vercel automatycznie wykryje Next.js i zbuduje projekt.

## Performance

- WebGL canvas (`HeroCanvas`) jest ładowany dynamicznie (`next/dynamic`,
  `ssr: false`) i montowany tylko po zakończeniu boot-sequence w Hero —
  nie blokuje pierwszego renderu.
- DPR canvasu ograniczony do `[1, 1.5]` dla stabilnej liczby FPS na
  słabszym sprzęcie.
- Wszystkie animacje (boot sequence, scroll reveal, progress bary)
  respektują `prefers-reduced-motion`.
