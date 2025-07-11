import { z } from "zod";

export const connectionSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
});

export type ConnectionFormData = z.infer<typeof connectionSchema>;
