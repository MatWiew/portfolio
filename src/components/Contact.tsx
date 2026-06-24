"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "./LinkedInIcon";
import { GitHubIcon } from "./GitHubIcon";
import { FloatField } from "./FloatField";
import { TopicSelect, TOPICS } from "./TopicSelect";
import { useContactPrefill } from "./ContactPrefillContext";
import { SITE } from "@/data/site";
import { trackFormInteraction } from "./Analytics";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0] as string, msg: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { prefill } = useContactPrefill();
  const [justPrefilled, setJustPrefilled] = useState(false);
  const formStartedRef = useRef(false);

  // Gdy ktoś kliknie "Zapytaj o [usługę]" w sekcji Oferta, kontekst dostaje
  // nową wartość (nonce się zmienia) — wtedy nadpisujemy temat i treść
  // wiadomości, nie ruszając imienia/maila, jeśli ktoś już je wpisał.
  useEffect(() => {
    if (!prefill) return;
    // setState jest odroczony poza synchroniczne ciało efektu (przez
    // requestAnimationFrame), żeby uniknąć kaskadowego re-renderu
    // wywołanego bezpośrednio przy zmianie zależności efektu.
    const raf = requestAnimationFrame(() => {
      setForm((p) => ({ ...p, topic: prefill.topic, msg: prefill.message }));
      setJustPrefilled(true);
    });
    const t = setTimeout(() => setJustPrefilled(false), 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [prefill]);

  const handleFieldFocus = (field: string) => {
    // Śledzenie pierwszego kontaktu z formularzem
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormInteraction("start", { first_field: field });
    }
    trackFormInteraction("field_focus", { field });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    trackFormInteraction("submit", { topic: form.topic });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Nie udało się wysłać wiadomości.");
        setStatus("error");
        trackFormInteraction("error", { error: data.error || "unknown", topic: form.topic });
        return;
      }

      setStatus("sent");
      trackFormInteraction("success", { topic: form.topic });
    } catch {
      setErrorMsg("Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.");
      setStatus("error");
      trackFormInteraction("error", { error: "network_error", topic: form.topic });
    }
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[13px] tracking-[0.2em] text-primary uppercase mb-4"
          >
            {"// 03 — Napisz do mnie"}
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 0.9 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-5"
          >
            Zbudujmy
            <br />
            coś razem
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Porozmawiajmy o Twoim projekcie <span className="inline-block text-2xl translate-y-[4px] translate-x-[1px]">➮</span> Napisz do mnie aby umówić się na bezpłatną konsultację.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card border border-white/[0.07] rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <motion.div
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none"
          />

          <AnimatePresence mode="wait">
            {status !== "sent" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                onSubmit={submit}
                className="relative space-y-4"
              >
                <FloatField
                  label="Twoje imię"
                  name="name"
                  required
                  value={form.name}
                  onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  onFocus={() => handleFieldFocus("name")}
                />
                <FloatField
                  label="Adres e-mail"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  onFocus={() => handleFieldFocus("email")}
                />
                <TopicSelect
                  value={form.topic}
                  onChange={(v) => setForm((p) => ({ ...p, topic: v }))}
                />
                <FloatField
                  label="Twoja wiadomość"
                  name="msg"
                  required
                  value={form.msg}
                  onChange={(v) => setForm((p) => ({ ...p, msg: v }))}
                  textarea
                  highlight={justPrefilled}
                  onFocus={() => handleFieldFocus("msg")}
                />

                {status === "error" && (
                  <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "sending" || !form.name || !form.email || !form.msg}
                  type="submit"
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-black text-sm font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 mt-2 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
                >
                  {status === "sending" ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Wyślij wiadomość
                    </>
                  )}
                </motion.button>

                <ContactDetails />
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="relative flex flex-col items-center justify-center py-14 gap-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                  className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"
                >
                  <CheckCircle className="w-9 h-9 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-3xl font-black tracking-tight mb-2"
                  >
                    Wiadomość wysłana!
                  </h3>
                  <p className="text-muted-foreground">
                    Dzięki za kontakt. Odpiszę w ciągu 24 godzin.
                  </p>
                </motion.div>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", topic: TOPICS[0], msg: "" });
                    formStartedRef.current = false;
                  }}
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-xs text-primary/50 hover:text-primary transition-colors uppercase tracking-widest mt-2"
                >
                  Wyślij kolejną wiadomość
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
      <a
        href={`mailto:${SITE.email}`}
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Mail className="w-3.5 h-3.5" /> {SITE.email}
      </a>
      <a
        href={`tel:+48${SITE.phoneRaw}`}
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <Phone className="w-3.5 h-3.5" /> {SITE.phone}
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <LinkedInIcon className="w-3.5 h-3.5" /> LinkedIn
      </a>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-primary transition-colors"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <GitHubIcon className="w-3.5 h-3.5" /> GitHub
      </a>
    </div>
  );
}
