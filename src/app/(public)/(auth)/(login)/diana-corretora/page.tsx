import { LoginForm } from "@/components/public/LoginForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const googleError = resolvedParams.error as string | undefined;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f2936] p-4 md:p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE - BRANDING/TEXT */}
        <div className="hidden md:flex flex-col justify-center space-y-6 text-white">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="size-24 relative">
              <Image alt="Diana Logo" src="/roundedLogo.svg" fill />
            </span>
            <span className="text-4xl font-bold tracking-tight">
              Diana Imóveis
            </span>
          </div>
          <div className="flex flex-col text-center gap-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Acesse seu painel administrativo
            </h1>
            <p className="text-lg text-gray-300 px-8">
              Gerencie seus imóveis, acompanhe negociações e maximize seus
              resultados.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORMS */}
        <div className="flex justify-center md:justify-end">
          <LoginForm googleError={googleError} />
        </div>
      </div>
    </div>
  );
}
