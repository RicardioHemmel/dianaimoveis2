"use client";

// REACT | NEXT
import Link from "next/link";
import { useState, useActionState } from "react";

// ICONS
import { Eye, EyeOff, Lock } from "lucide-react";

// SCHEMA
import { passwordResetSchema } from "@/lib/schemas/auth/credentials.schema";

import { Button } from "@/components/ui/button";


interface ResetPasswordProps {
  verifyResetTokenResponse: {
    success: boolean;
    message?: string;
    email?: string;
  };
  action: (prevState: any, formData: FormData) => Promise<any>;
}


export function ResetPasswordForm({
  verifyResetTokenResponse,
  action,

}: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false); // TOGGLE PASSWORD VISIBILITY
  const [validationError, setValidationError] = useState<string>(""); // ZOD VALIDATION FOR THE NEW PASSWORD
  const [state, formAction, pending] = useActionState(action, null)

  function validatePassword(value: string) {
    const result = passwordResetSchema.safeParse(value);

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
    } else {
      setValidationError("");
    }
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

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Nova Senha
            </label>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-5 w-5" />
              </div>

              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => {
                  const value = e.target.value;
                  validatePassword(value);
                }}
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

          {state?.success === false && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}

          {validationError && (
            <p className="text-sm">{validationError}</p>
          )}


          {state?.success && (
            <p className="text-sm text-green-600">{state.message}</p>
          )}

          <Button
            type="submit"
            disabled={pending || validationError.length > 0}
            className="w-full bg-[var(--bg-selected)] hover:bg-[var(--bg-selected-hover)]"
          >
            {pending ? "Enviando..." : "Enviar"}
          </Button>

          <div className="flex justify-center">
            <Link
              href="/diana-corretora"
              className="text-sm font-medium text-[#2c4c5b]"
            >
              Voltar para Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
