"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  contactTopicOptions,
  ContactFormValues,
} from "@/lib/validation/contact";
import { TerminalButton } from "@/components/ui/TerminalButton";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "collaboration",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset();
    } catch {
      setServerError("Brak połączenia z serwerem. Spróbuj ponownie.");
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
        <p className="text-accent-green text-glow-green text-sm font-bold tracking-widest">
          {"// TRANSMISSION RECEIVED"}
        </p>
        <p className="text-text-dim text-sm max-w-sm">
          Wiadomość została wysłana. Odpowiem w ciągu 24h.
        </p>
        <TerminalButton variant="ghost" onClick={() => setSubmitState("idle")}>
          NEW TRANSMISSION
        </TerminalButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="name" className="text-xs text-accent-green tracking-widest block mb-2">
          &gt;_ NAME:
        </label>
        <input
          id="name"
          type="text"
          placeholder="ENTER IDENTIFIER..."
          {...register("name")}
          className="w-full bg-transparent border-b border-border-bright pb-2 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent-green"
        />
        {errors.name && (
          <p className="text-accent-red text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-xs text-accent-green tracking-widest block mb-2">
          &gt;_ EMAIL:
        </label>
        <input
          id="email"
          type="email"
          placeholder="ENTER ADDRESS..."
          {...register("email")}
          className="w-full bg-transparent border-b border-border-bright pb-2 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent-green"
        />
        {errors.email && (
          <p className="text-accent-red text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="topic" className="text-xs text-accent-green tracking-widest block mb-2">
          &gt;_ TOPIC:
        </label>
        <select
          id="topic"
          {...register("topic")}
          className="w-full bg-bg-panel border-b border-border-bright pb-2 text-sm text-text-primary focus:outline-none focus:border-accent-green"
        >
          {contactTopicOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label.toUpperCase()}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p className="text-accent-red text-xs mt-1">{errors.topic.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-xs text-accent-green tracking-widest block mb-2">
          &gt;_ MESSAGE:
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="OPISZ SWOJĄ WIADOMOŚĆ..."
          {...register("message")}
          className="w-full bg-transparent border border-border-bright p-3 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent-green resize-none"
        />
        {errors.message && (
          <p className="text-accent-red text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-accent-red text-xs border border-accent-red/40 px-3 py-2">
          {serverError}
        </p>
      )}

      <TerminalButton
        type="submit"
        variant="primary"
        className="self-start"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "TRANSMITTING..." : "CONFIRM"}
      </TerminalButton>
    </form>
  );
}
