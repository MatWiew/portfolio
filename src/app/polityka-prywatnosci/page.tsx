import Link from "next/link";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Polityka Prywatności | Mateusz Wiewióra",
  description:
    "Polityka prywatności strony mateuszwiewiora.pl — informacje o przetwarzaniu danych osobowych, plikach cookies, narzędziach analitycznych i Twoich prawach zgodnie z RODO.",
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosci() {
  return (
    <main className="px-6 py-20 md:px-16 max-w-3xl mx-auto text-foreground">
      {/* Nawigacja powrotna */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors mb-10"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ← Powrót na stronę główną
      </Link>

      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
      >
        Polityka Prywatności
      </h1>
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-xs text-muted-foreground/50 mb-12"
      >
        Ostatnia aktualizacja: 24 czerwca 2025
      </p>

      <article className="space-y-10 text-muted-foreground leading-relaxed text-[15px]">
        {/* 1. Informacje ogólne */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            1. Informacje ogólne
          </h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych
            zbieranych za pośrednictwem strony internetowej{" "}
            <strong className="text-foreground/80">mateuszwiewiora.pl</strong> (dalej: „Strona").
          </p>
          <p className="mt-3">
            Administratorem danych osobowych jest{" "}
            <strong className="text-foreground/80">{SITE.name}</strong>, prowadzący działalność
            jako freelancer w zakresie tworzenia stron i aplikacji internetowych.
          </p>
          <p className="mt-3">
            Kontakt z administratorem:{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary/70 hover:text-primary transition-colors">
              {SITE.email}
            </a>
          </p>
        </section>

        {/* 2. Podstawa prawna */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            2. Podstawa prawna przetwarzania
          </h2>
          <p>Dane osobowe przetwarzane są na podstawie:</p>
          <ul className="list-none space-y-2 mt-3 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Art. 6 ust. 1 lit. a RODO</strong> — zgoda
              użytkownika (pliki cookies analityczne).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Art. 6 ust. 1 lit. b RODO</strong> —
              niezbędność do wykonania umowy lub podjęcia działań na żądanie osoby (formularz kontaktowy).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Art. 6 ust. 1 lit. f RODO</strong> —
              prawnie uzasadniony interes administratora (analiza statystyk, ochrona przed nadużyciami).
            </li>
          </ul>
        </section>

        {/* 3. Jakie dane zbieram */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            3. Jakie dane zbieram?
          </h2>

          <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-4" style={{ fontFamily: "var(--font-mono)" }}>
            Formularz kontaktowy
          </h3>
          <p>
            Imię, adres e-mail oraz treść wiadomości — podawane dobrowolnie w celu nawiązania kontaktu.
            Dane te są przekazywane wyłącznie do serwisu{" "}
            <strong className="text-foreground/70">Resend</strong> (dostawca usługi e-mail) w celu
            dostarczenia wiadomości na mój adres e-mail.
          </p>

          <h3 className="text-sm font-semibold text-foreground/80 mb-2 mt-5" style={{ fontFamily: "var(--font-mono)" }}>
            Dane techniczne (analityka)
          </h3>
          <p>
            Adresy IP (anonimizowane), informacje o urządzeniu, systemie operacyjnym, przeglądarce
            oraz zachowaniu na stronie (np. czas wizyty, odwiedzane podstrony, kliknięcia).
            Dane te zbierane są wyłącznie po wyrażeniu zgody w banerze cookies przez:
          </p>
          <ul className="list-none space-y-2 mt-3 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Google Analytics 4</strong> — analiza
              statystyk ruchu na stronie.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Microsoft Clarity</strong> — analiza
              zachowania użytkowników (mapy cieplne, nagrania sesji — bez danych wrażliwych).
            </li>
          </ul>
        </section>

        {/* 4. Cel przetwarzania */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            4. Cel przetwarzania danych
          </h2>
          <ul className="list-none space-y-2 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Udzielanie odpowiedzi na zapytania przesłane za pośrednictwem formularza kontaktowego.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Analiza ruchu na stronie w celu ulepszania jej funkcjonalności i doświadczenia użytkownika.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Identyfikacja i eliminacja błędów technicznych na stronie.
            </li>
          </ul>
        </section>

        {/* 5. Pliki cookies */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            5. Pliki cookies
          </h2>
          <p>Strona wykorzystuje następujące rodzaje plików cookies:</p>

          <div className="mt-4 rounded-xl border border-white/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left px-4 py-3 text-foreground/70 font-semibold text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    Typ
                  </th>
                  <th className="text-left px-4 py-3 text-foreground/70 font-semibold text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    Cel
                  </th>
                  <th className="text-left px-4 py-3 text-foreground/70 font-semibold text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    Czas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                <tr>
                  <td className="px-4 py-3 text-foreground/60">Niezbędne</td>
                  <td className="px-4 py-3">Zapamiętanie decyzji o cookies</td>
                  <td className="px-4 py-3 text-foreground/60">Bezterminowo (localStorage)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground/60">Analityczne (GA4)</td>
                  <td className="px-4 py-3">Statystyki ruchu, źródła wizyt</td>
                  <td className="px-4 py-3 text-foreground/60">do 14 miesięcy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground/60">Analityczne (Clarity)</td>
                  <td className="px-4 py-3">Mapy cieplne, nagrania sesji</td>
                  <td className="px-4 py-3 text-foreground/60">do 1 roku</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Cookies analityczne są aktywowane <strong className="text-foreground/70">wyłącznie po
            wyrażeniu dobrowolnej zgody</strong> w banerze cookies. Bez zgody żadne dane
            analityczne nie są zbierane.
          </p>
        </section>

        {/* 6. Odbiorcy danych */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            6. Odbiorcy danych
          </h2>
          <p>Dane mogą być przekazywane następującym podmiotom:</p>
          <ul className="list-none space-y-2 mt-3 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Google LLC</strong> — w ramach usługi
              Google Analytics 4 (Stany Zjednoczone — na podstawie standardowych klauzul umownych).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Microsoft Corporation</strong> — w ramach
              usługi Microsoft Clarity (Stany Zjednoczone — na podstawie standardowych klauzul umownych).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Resend Inc.</strong> — w ramach usługi
              wysyłki e-maili z formularza kontaktowego (Stany Zjednoczone).
            </li>
          </ul>
        </section>

        {/* 7. Transfer danych */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            7. Transfer danych do krajów trzecich
          </h2>
          <p>
            W związku z korzystaniem z usług Google, Microsoft i Resend, dane mogą być
            przekazywane do Stanów Zjednoczonych. Transfer odbywa się na podstawie{" "}
            <strong className="text-foreground/70">standardowych klauzul umownych</strong>{" "}
            zatwierdzonych przez Komisję Europejską oraz decyzji o adekwatności w ramach
            EU-US Data Privacy Framework (gdzie ma to zastosowanie).
          </p>
        </section>

        {/* 8. Okres przechowywania */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            8. Okres przechowywania danych
          </h2>
          <ul className="list-none space-y-2 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Formularz kontaktowy</strong> — dane
              przechowywane są przez czas niezbędny do udzielenia odpowiedzi i realizacji kontaktu,
              nie dłużej niż 12 miesięcy od ostatniej komunikacji.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Dane analityczne</strong> — zgodnie z
              politykami retencji Google Analytics (do 14 miesięcy) i Microsoft Clarity (do 13 miesięcy).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              <strong className="text-foreground/70">Zgoda na cookies</strong> — decyzja
              o akceptacji lub odrzuceniu cookies jest przechowywana w localStorage przeglądarki
              bezterminowo (do momentu ręcznego wyczyszczenia danych przeglądarki).
            </li>
          </ul>
        </section>

        {/* 9. Twoje prawa */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            9. Twoje prawa
          </h2>
          <p>Zgodnie z RODO przysługują Ci następujące prawa:</p>
          <ul className="list-none space-y-2 mt-3 pl-4">
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo dostępu do swoich danych osobowych.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do sprostowania (poprawienia) danych.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do usunięcia danych („prawo do bycia zapomnianym").
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do ograniczenia przetwarzania.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do przenoszenia danych.
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem
              przetwarzania dokonanego przed cofnięciem).
            </li>
            <li className="relative pl-4 before:content-['›'] before:absolute before:left-0 before:text-primary/50">
              Prawo do złożenia skargi do organu nadzorczego —{" "}
              <strong className="text-foreground/70">Prezesa Urzędu Ochrony Danych Osobowych (UODO)</strong>,
              ul. Stawki 2, 00-193 Warszawa.
            </li>
          </ul>
          <p className="mt-4">
            W celu realizacji powyższych praw prosimy o kontakt na adres:{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary/70 hover:text-primary transition-colors">
              {SITE.email}
            </a>
          </p>
        </section>

        {/* 10. Cofnięcie zgody na cookies */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            10. Jak cofnąć zgodę na cookies?
          </h2>
          <p>
            Zgodę na cookies analityczne możesz cofnąć w dowolnym momencie, usuwając dane
            z localStorage przeglądarki (Ustawienia → Dane witryn → Usuń dane dla
            mateuszwiewiora.pl). Po usunięciu danych baner cookies pojawi się ponownie
            przy następnej wizycie.
          </p>
        </section>

        {/* 11. Zmiany */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
            11. Zmiany w polityce prywatności
          </h2>
          <p>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce
            Prywatności. O wszelkich istotnych zmianach użytkownicy zostaną poinformowani
            poprzez aktualizację daty na górze dokumentu.
          </p>
        </section>
      </article>

      {/* Powrót */}
      <div className="mt-16 pt-8 border-t border-white/[0.05]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ← Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}