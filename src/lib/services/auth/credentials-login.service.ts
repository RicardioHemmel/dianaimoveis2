import { signIn } from "next-auth/react";

interface LoginData {
  email: string;
  password: string;
}

export async function credentialsLogin(data: LoginData) {
  const response = await signIn("credentials", {
    ...data,
    redirect: false,
  });

  if (!response?.ok) {
    throw new Error(response?.error ?? "Erro ao validar usuário");
  }
}
