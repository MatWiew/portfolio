import { z } from "zod";

export const contactTopicOptions = [
  { value: "template", label: "Zapytaj o szablon" },
  { value: "collaboration", label: "Zapytaj o współpracę" },
  { value: "project", label: "Nowy projekt" },
  { value: "other", label: "Inne" },
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Identyfikator musi mieć min. 2 znaki.")
    .max(80, "Identyfikator jest za długi."),
  email: z.string().email("Podaj prawidłowy adres e-mail."),
  topic: z.enum(["template", "collaboration", "project", "other"], {
    message: "Wybierz temat.",
  }),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć min. 10 znaków.")
    .max(2000, "Wiadomość jest za długa (max. 2000 znaków)."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
