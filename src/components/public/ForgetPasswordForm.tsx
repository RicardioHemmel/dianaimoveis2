"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

// ROUTE TO SEND EMAIL
async function fetchForgetPassword(email: string) {
  const response = await fetch("/api/users/forget-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "Erro ao enviar email");
  }

  return result;
}

export function ForgetPasswordForm() {
  const router = useRouter();

  // STATE MANAGEMENT
  const [email, setEmail] = useState("");
  const { mutateAsync, isPending, isError, isSuccess, error, data } =
    useMutation({
      mutationFn: fetchForgetPassword,
    });

  // FORM SUBMIT
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateAsync(email);
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.replace("/diana-corretora");
      }, 5000);
    }
  }, [isSuccess]);

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recuperação de Senha
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enviaremos um link de redefinição para seu email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              E-mail
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {isError && (
            <p className="text-sm text-red-600">{(error as Error).message}</p>
          )}

          {isSuccess && (
            <p className="text-sm text-green-600">{data.success}</p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-[var(--bg-selected)] hover:bg-[var(--bg-selected-hover)]"
          >
            {isPending ? "Enviando..." : "Enviar"}
          </Button>

          <div className="flex justify-center">
            <Link
              href="/diana-corretora"
              className="text-xs font-medium text-[#2c4c5b]"
            >
              Voltar para Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
