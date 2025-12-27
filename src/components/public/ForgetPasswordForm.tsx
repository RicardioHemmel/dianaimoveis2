"use client";

// REACT | NEXT
import Link from "next/link";
import { useActionState } from "react";

// ICONS
import { Mail } from "lucide-react";

// SERVER ACTION
import { forgetPasswordAction } from "@/lib/server-actions/auth/forget-password.action";

// COMPONENTS
import { Button } from "@/components/ui/button";

export function ForgetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgetPasswordAction,
    null
  );

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

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              E-mail
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
            </div>
          </div>
          
          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          {state?.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-[var(--bg-selected)] hover:bg-[var(--bg-selected-hover)]"
          >
            {pending ? "Enviando..." : "Enviar"}
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
