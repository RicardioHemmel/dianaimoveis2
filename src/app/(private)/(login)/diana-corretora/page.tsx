import { LoginForm } from "@/components/ui-custom/private/login-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f2936] p-4 md:p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding/Text */}
        <div className="hidden md:flex flex-col justify-center space-y-6 text-white p-8">
          <div className="flex items-center gap-2 mb-4">
            <Image
              alt="Diana Logo"
              src="/roundedLogo.png"
              width={240}
              height={240}
              className="w-20 h-20"
            />

            <span className="text-3xl font-bold tracking-tight">
              Diana Imóveis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Acesse seu painel de controle
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Gerencie seus imóveis, acompanhe negociações e maximize seus
            resultados em um só lugar.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center md:justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
