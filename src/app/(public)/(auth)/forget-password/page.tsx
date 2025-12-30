import { ForgetPasswordForm } from "@/components/custom/ForgetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esqueceu a Senha",
};

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f2936] px-2">
      <ForgetPasswordForm />
    </div>
  );
}
