import { z } from "zod";

// PASSWORD REDEFINITION
export const passwordResetSchema = z
  .string()
  .min(8, "Senha precisa ter no mínimo 8 caracteres")
  .max(20, "Senha não pode ter mais do que 20 caracteres")
  .regex(/[a-z]/, "Senha deve conter letra minúscula")
  .regex(/[A-Z]/, "Senha deve conter letra maiúscula")
  .regex(/\d/, "Senha deve conter um número")
  .regex(/[@$!%*#?&]/, "Senha deve conter um caractere especial");

// PASSWORD LOGIN SCHEMA
export const passwordSchema = z.string();

// EMAIL LOGIN SCHEMA
export const emailSchema = z
  .email("Email inválido")
  .toLowerCase();

// LOGIN WITH CREDENTIALS
export const loginCredentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type PasswordSchema = z.infer<typeof passwordSchema>;
export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
export type LoginCredentialsSchema = z.infer<typeof loginCredentialsSchema>;
