import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, contactTopicOptions } from "@/lib/validation/contact";

// Simple in-memory rate limiter (per server instance). For production-grade
// rate limiting across multiple instances, use a shared store (e.g. Redis/Upstash).
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max submissions per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    submissionLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return false;
}

function topicLabel(topic: string): string {
  return contactTopicOptions.find((t) => t.value === topic)?.label ?? topic;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Za dużo zapytań. Spróbuj ponownie za chwilę." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane formularza.", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, email, topic, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toAddress = process.env.CONTACT_RECEIVER_EMAIL;
    const fromAddress = process.env.CONTACT_SENDER_EMAIL ?? "kontakt@mateuszwiewiora.pl";

    if (!apiKey || !toAddress) {
      console.error(
        "Contact API misconfigured: missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL env vars."
      );
      return NextResponse.json(
        { error: "Serwer nie jest skonfigurowany do wysyłki wiadomości." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `MWSYS Contact <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `[${topicLabel(topic)}] Nowe zgłoszenie od ${name}`,
      text: [
        `>_ NAME: ${name}`,
        `>_ EMAIL: ${email}`,
        `>_ TOPIC: ${topicLabel(topic)}`,
        "",
        ">_ MESSAGE:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Wewnętrzny błąd serwera." },
      { status: 500 }
    );
  }
}
