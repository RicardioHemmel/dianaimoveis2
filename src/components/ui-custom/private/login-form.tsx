"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm();
  const handleSubmit = form.handleSubmit((data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
    console.log(data);
  });

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden relative">
      <div className="p-8 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bem-vindo</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Entre com suas credenciais para acessar.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c4c5b] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                {...form.register("email")}
                required
              />
            </div>
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
                href="#"
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c4c5b] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                {...form.register("password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-[#2c4c5b] focus:ring-[#2c4c5b]"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Lembrar-me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c4c5b] hover:bg-[#1e3641] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Entrar</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
