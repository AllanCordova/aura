import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  name: z.string().trim().optional().or(z.literal("")),
});
