import { ResetPasswordForm } from "@/components/public/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir senha",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f2936] px-2">
      <ResetPasswordForm token={token} />
    </div>
  );
}
