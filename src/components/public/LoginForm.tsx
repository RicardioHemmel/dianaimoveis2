"use client";

// REACT | NEXT
import Link from "next/link";
import { useState, useActionState } from "react";

// ACTIONS
import { loginGoogleAction } from "@/lib/server-actions/auth/login-google.action";
import { loginCredentialsAction } from "@/lib/server-actions/auth/login-credentials.action";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";

interface LoginFormProps {
  googleError?: string;
}

export function LoginForm({ googleError }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [state, credentialsFormAction, pending] = useActionState(
    loginCredentialsAction,
    null
  );

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden relative">
      <div className="p-8 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bem-vindo</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Entre com suas credenciais para acessar.
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <form action={loginGoogleAction}>
          <div className="my-6">
            <Button
              type="submit"
              variant="outline"
              className="w-full h-12 gap-3 border-gray-200 hover:bg-gray-50 text-gray-700 bg-transparent"
            >
              <img
                src="/icons/googleIcon.png"
                alt="Google Icone"
                className="w-5 h-auto"
              />
              Continuar com Google
            </Button>
          </div>
        </form>

        {/* WHITELIST ERROR FROM URL */}
        {googleError === "AccessDenied" && (
          <p className="text-sm text-red-600 mb-4 text-center bg-red-50 p-2 rounded">
            Gmail não autorizado.
          </p>
        )}
        {/* DIVIDER */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500">ou</span>
          </div>
        </div>

        {/* CREDENTIALS LOGIN */}
        <form className="space-y-5" action={credentialsFormAction}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                defaultValue={state?.email}
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c4c5b] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>
            {state?.fieldsErrors?.email && (
              <p className="text-sm text-red-600 mt-1">
                {state.fieldsErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                Senha
              </label>
              <Link
                href="/forget-password"
                className="text-xs font-medium text-[#2c4c5b] hover:text-[#1e3641] hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c4c5b] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
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

            {state?.fieldsErrors?.password && (
              <p className="text-sm text-red-600 mt-1">
                {state.fieldsErrors.password}
              </p>
            )}
          </div>

          {state?.message && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#2c4c5b] hover:bg-[#1e3641] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>{pending ? "Entrando..." : "Entrar"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
