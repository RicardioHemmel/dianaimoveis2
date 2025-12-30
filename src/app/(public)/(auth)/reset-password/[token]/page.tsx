import { ResetPasswordForm } from "@/components/custom/ResetPasswordForm";
import { Metadata } from "next";
import { verifyResetTokenAction } from "@/lib/server-actions/auth/verify-reset-token.action"
import { resetPasswordAction } from "@/lib/server-actions/auth/reset-password.action";

export const metadata: Metadata = {
  title: "Redefinir senha",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const verifyResetTokenResponse = await verifyResetTokenAction(token)


const boundResetPasswordAction = resetPasswordAction.bind(
  null,
  verifyResetTokenResponse.email ?? ""
);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f2936] px-2">
      <ResetPasswordForm action={boundResetPasswordAction} verifyResetTokenResponse={verifyResetTokenResponse} />
    </div>
  );
}
