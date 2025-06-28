import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().regex(/^\+55 \d{2} \d{5} \d{4}$/, {
    message: "Telefone deve estar no formato +55 79 99999 9999",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
