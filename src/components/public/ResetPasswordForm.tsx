"use client";

// REACT | NEXT
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

// ICONS
import { Eye, EyeOff, Lock } from "lucide-react";

// SERVICES
import { verifyResetToken } from "@/lib/services/auth/verify-reset-token.service";
import { resetPassword } from "@/lib/services/auth/reset-password.service";

import { Button } from "@/components/ui/button";
import { z } from "zod";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const PasswordSchema = z
    .string()
    .min(8, { message: "Senha precisa ter no mínimo 8 caracteres" })
    .max(20, { message: "Senha não pode ter mais do que 20 caracteres" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      {
        message:
          "Senha deve conter letra maiúscula, minúscula, número e caractere especial",
      }
    );

  // STATE MANAGEMENT
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [tokenError, setTokenError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { mutateAsync, isPending, isError, isSuccess, error, data } =
    useMutation({
      mutationFn: resetPassword,
    });

  // VERIFIES RESET TOKEN
  useEffect(() => {
    async function fetchVerifyResetToken() {
      try {
        const result = await verifyResetToken(token);
        console.log("Token válido:", result);
      } catch (e) {
        if (e instanceof Error) {
          setTokenError(e.message);
          console.log("Token inválido:", e.message);
        } else {
          setTokenError("Erro inesperado");
        }
      }
    }

    if (token) {
      fetchVerifyResetToken();
    }
  }, [token]);

  // FORM SUBMIT
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = PasswordSchema.safeParse(newPassword);

    if (!validation.success) {
      return setValidationError(validation.error.issues[0].message);
    }
    await mutateAsync(newPassword);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Defina sua nova senha
          </h2>
          <ul className="text-gray-500 mt-2 text-sm">
            <li className="my-1">• No mínimo 8 caracteres;</li>
            <li className="my-1">
              • Pelo menos uma letra maiúscula e uma minúscula;
            </li>
            <li className="my-1">
              • Ao menos um número e um caractere especial (@, #, $, etc.).
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Nova Senha
            </label>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {isError && (
            <p className="text-sm text-red-600">{(error as Error).message}</p>
          )}

          {validationError && (
            <p className="text-sm text-red-600">{validationError}</p>
          )}

          {tokenError && <p className="text-sm text-red-600">{tokenError}</p>}

          {isSuccess && (
            <p className="text-sm text-green-600">{data.success}</p>
          )}

          <Button
            type="submit"
            disabled={isPending || validationError.length > 0}
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
