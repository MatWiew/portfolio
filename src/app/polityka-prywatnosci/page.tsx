export const metadata = {
  title: "Polityka Prywatności | Mateusz Wiewióra",
  description: "Informacje o przetwarzaniu danych osobowych na stronie.",
};

export default function PolitykaPrywatnosci() {
  return (
    <main className="px-6 py-20 md:px-16 max-w-3xl mx-auto text-foreground">
      <h1 className="text-3xl font-bold mb-8">Polityka Prywatności</h1>
      
      <section className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          <strong>1. Informacje ogólne</strong><br />
          Dbam o Twoją prywatność. Administratorem danych osobowych zbieranych za pośrednictwem strony jest Mateusz Wiewióra.
        </p>

        <p>
          <strong>2. Jakie dane zbieram?</strong><br />
          • Dane przesyłane w formularzu: Imię, adres e-mail oraz treść wiadomości, które podajesz dobrowolnie w celu kontaktu.<br />
          • Dane techniczne (Analityka): Adresy IP, informacje o urządzeniu oraz zachowaniu na stronie zbierane przez Google Analytics 4 oraz Microsoft Clarity.
        </p>

        <p>
          <strong>3. Cel przetwarzania danych</strong><br />
          • Udzielenie odpowiedzi na przesłane zapytania.<br />
          • Analiza statystyk ruchu w celu ulepszania strony i doświadczeń użytkownika.
        </p>

        <p>
          <strong>4. Narzędzia analityczne</strong><br />
          Korzystam z usług Google Analytics 4 oraz Microsoft Clarity. Oba narzędzia są aktywowane dopiero po wyrażeniu przez Ciebie dobrowolnej zgody w banerze cookies.
        </p>

        <p>
          <strong>5. Twoje prawa</strong><br />
          Masz prawo do wglądu w swoje dane, ich poprawiania, usunięcia lub ograniczenia przetwarzania. W sprawach związanych z ochroną danych proszę o kontakt pod adresem e-mail wskazanym w stopce strony.
        </p>
      </section>
    </main>
  );
}