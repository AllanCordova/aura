import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  name: z.string().min(5, "Um nome e obrigátorio"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "A senha deve conter letra maiúscula, minúscula, número e caractere especial"
    ),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;
