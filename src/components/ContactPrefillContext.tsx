"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Prefill = { topic: string; message: string; nonce: number } | null;

type ContactPrefillContextValue = {
  prefill: Prefill;
  /** Wywoływane np. z karty oferty — ustawia temat i wiadomość, które
   * Contact.tsx odczyta i wstawi do formularza, po czym przewija do sekcji. */
  requestContact: (topic: string, message: string) => void;
};

const ContactPrefillContext = createContext<ContactPrefillContextValue | null>(null);

export function ContactPrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>(null);

  // `nonce` rośnie przy każdym wywołaniu, dzięki czemu Contact.tsx wie, że
  // to nowe żądanie nawet jeśli temat/wiadomość są identyczne jak ostatnio
  // (np. ktoś dwa razy z rzędu klika "Wizytówki").
  const requestContact = useCallback((topic: string, message: string) => {
    setPrefill((prev) => ({ topic, message, nonce: (prev?.nonce ?? 0) + 1 }));
  }, []);

  return (
    <ContactPrefillContext.Provider value={{ prefill, requestContact }}>
      {children}
    </ContactPrefillContext.Provider>
  );
}

export function useContactPrefill() {
  const ctx = useContext(ContactPrefillContext);
  if (!ctx) {
    throw new Error("useContactPrefill musi być użyty wewnątrz ContactPrefillProvider");
  }
  return ctx;
}
