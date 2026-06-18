import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────
// KONFIGURACJA — zmienne środowiskowe (ustaw je w Vercel → Project →
// Settings → Environment Variables, oraz lokalnie w .env.local):
//
//   RESEND_API_KEY      — klucz API z resend.com/api-keys
//   CONTACT_TO_EMAIL    — adres, na który trafiają wiadomości z formularza
//                          (domyślnie: kontakt@mateuszwiewiora.pl)
//   CONTACT_FROM_EMAIL  — adres "From" używany do wysyłki (musi być z domeny
//                          zweryfikowanej w Resend, np. wiadomosci@mateuszwiewiora.pl)
//
// Resend wymaga zweryfikowanej domeny do wysyłki produkcyjnej — w trybie
// testowym (bez własnej domeny) można wysyłać tylko z "onboarding@resend.dev"
// i tylko na adres właściciela konta Resend.
// ─────────────────────────────────────────────────────────────────────────

let resendClient: Resend | null = null;
function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "kontakt@mateuszwiewiora.pl";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Imię musi mieć co najmniej 2 znaki.").max(80),
  email: z.string().trim().email("Podaj prawidłowy adres e-mail."),
  topic: z.string().trim().min(1).max(120).optional(),
  msg: z.string().trim().min(10, "Wiadomość musi mieć co najmniej 10 znaków.").max(5000),
});

// Proste escapowanie HTML, by treść formularza nie mogła wstrzyknąć znaczników
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: "Wysyłka e-maili nie jest skonfigurowana (brak RESEND_API_KEY)." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Nieprawidłowe dane formularza.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { name, email, topic, msg } = parsed.data;
  const safeName = escapeHtml(name);
  const safeTopic = topic ? escapeHtml(topic) : null;
  const safeMsg = escapeHtml(msg).replace(/\n/g, "<br/>");

  try {
    // ───────────────────────────────────────────────────────────────────
    // WARIANT A (aktywny domyślnie): wysyłka TYLKO do Ciebie.
    // Prosty, jeden e-mail, jedno wywołanie API — najmniej rzeczy może się
    // wysypać. Dobry wybór na start / MVP.
    // ───────────────────────────────────────────────────────────────────
    const { error } = await resend.emails.send({
      from: `Formularz kontaktowy <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: safeTopic
        ? `[${topic}] Nowa wiadomość od ${name} — portfolio`
        : `Nowa wiadomość od ${name} — portfolio`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="margin-bottom: 4px;">Nowa wiadomość z formularza kontaktowego</h2>
          <p><strong>Imię:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          ${safeTopic ? `<p><strong>Temat:</strong> ${safeTopic}</p>` : ""}
          <p><strong>Wiadomość:</strong></p>
          <p style="background:#f4f4f5; padding:12px 16px; border-radius:8px;">${safeMsg}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
        { status: 502 }
      );
    }

    // ───────────────────────────────────────────────────────────────────
    // WARIANT B (wyłączony — odkomentuj, żeby aktywować): wysyłka do Ciebie
    // + automatyczne potwierdzenie do nadawcy. Wymaga, by FROM_EMAIL był
    // z domeny zweryfikowanej w Resend (auto-reply z "onboarding@resend.dev"
    // może trafiać do spamu lub być odrzucany jako "from" dla maila do
    // osoby trzeciej).
    //
    // await resend.emails.send({
    //   from: `Mateusz Wiewióra <${FROM_EMAIL}>`,
    //   to: [email],
    //   subject: "Dziękuję za wiadomość!",
    //   html: `
    //     <div style="font-family: sans-serif; line-height: 1.6;">
    //       <p>Cześć ${safeName},</p>
    //       <p>Dziękuję za kontakt${safeTopic ? ` w temacie „${safeTopic}”` : ""}! Odpiszę najszybciej jak możliwe (zwykle w ciągu 24 godzin).</p>
    //       <p>Pozdrawiam,<br/>Mateusz Wiewióra</p>
    //     </div>
    //   `,
    // });
    // ───────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
