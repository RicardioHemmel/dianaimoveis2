"use server";

import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import crypto from "crypto";
import ServerActionResponse from "@/lib/types/server-action-response";

export interface VerifyResetTokenResult extends ServerActionResponse {
  email?: string;
};

export async function verifyResetTokenAction(
  token: string
): Promise<VerifyResetTokenResult> {
  if (!token) {
    return { success: false, message: "Token inválido ou expirado" };
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  await connectMongoDB();

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return { success: false, message: "Token inválido ou expirado" };
  }

  return {
    success: true,
    email: user.email,
  };
}
