import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email é obrigatório" }),
  password: z.string({ error: "Senha é obrigatória" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
