import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().min(1, "Mensagem é obrigatória"),
  contactIds: z.array(z.string()).min(1, "Selecione ao menos 1 contato"),
  scheduledAt: z.date({ required_error: "Data obrigatória" }),
  status: z.enum(["agendada", "enviada"]).default("agendada").optional(),
});

export type MessageFormData = z.infer<typeof messageSchema>;
