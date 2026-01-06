"use server";

// MONGODB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

import bcrypt from "bcryptjs";
import { passwordResetSchema } from "@/lib/schemas/auth/credentials.schema";
import ServerActionResponse from "@/lib/types/server-action-response";

export interface ResetPasswordResponse extends ServerActionResponse {
  fieldError?: string;
}

export async function resetPasswordAction(
  userEmail: string,
  _: unknown,
  formData: FormData
): Promise<ResetPasswordResponse> {
  // userEmail has already been validated on "verifyResetTokenAction"
  const newPassword = formData.get("newPassword")?.toString();
  const parsedNewPassword = passwordResetSchema.safeParse(newPassword);

  if (!parsedNewPassword.success) {
    return {
      success: false,
      fieldError: parsedNewPassword.error.flatten().fieldErrors,
    };
  }

  await connectMongoDB();

  // SEARCHES FOR A USER WITH THE SAME HASHED TOKEN THAT WAS GENERATED WITHIN 1 HOUR
  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado",
    };
  }

  if (
    !user.resetToken ||
    !user.resetTokenExpiry ||
    user.resetTokenExpiry <= new Date()
  ) {
    return {
      success: false,
      message: "Token inválido ou expirado",
    };
  }

  const newPasswordHash = await bcrypt.hash(parsedNewPassword.data, 10);

  // INVALIDATES TOKEN
  try {
    user.password = newPasswordHash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.save();

    return {
      success: true,
      message: "Senha atualizada com sucesso",
    };
  } catch (e) {
    return {
      success: false,
      message: `Erro ao redefinir senha: ${e}`,
    };
  }
}
