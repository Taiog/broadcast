import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(11, "Número inválido"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
