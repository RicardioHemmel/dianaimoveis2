"use server";

// MONGODB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

// HASH
import crypto from "crypto";

// EMAIL SERVICE
import ResetPasswordEmail from "@/components/emails/ResetPassword";
import { Resend } from "resend";

// SCHEMA
import { emailSchema } from "@/lib/schemas/auth/credentials.schema";

// EMAIL PROVIDER
const resend = new Resend(process.env.RESEND_API_KEY);

const successMsg =
  "Se o email estiver cadastrado, você receberá um link de redefinição.";

export async function forgetPasswordAction(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString().toLowerCase();
  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0].message,
    };
  }

  await connectMongoDB();

  const existingUser = await User.findOne({
    email,
    password: { $exists: true, $ne: null },
  });

  // SIMULATES SUCCESS FOR ENUMERATION PROTECTION
  if (!existingUser) {
    console.log("Usuário não existe no banco", existingUser);
    return {
      success: successMsg,
    };
  }

  // SIMULATES SUCCESS FOR ENUMERATION PROTECTION AND PREVENTS TO SEND UNECESSARY EMAILS
  if (
    existingUser.resetTokenExpiry &&
    existingUser.resetTokenExpiry > new Date()
  ) {
    return {
      success: successMsg,
    };
  }

  // TOKEN TO SEND BY EMAIL
  const resetToken = crypto.randomBytes(20).toString("hex");

  // HASHED TOKEN TO SAVE ON DB
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // VALID FOR 1 HOUR SINCE GENERATED
  const hashedResetTokenExpiresIn = new Date(Date.now() + 3600000);

  // STORES TOKEN LOGIC
  existingUser.resetToken = hashedResetToken;
  existingUser.resetTokenExpiry = hashedResetTokenExpiresIn;
  existingUser.save();

  // URL TO PASS INTO THE RESET PASSWORD BUTTON ON EMAIL MSG
  const resetURL = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;

  // SENDS EMAIL
  try {
    const { error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [existingUser.email],
      subject: "Redefinição de Senha",
      react: ResetPasswordEmail({
        resetPasswordLink: resetURL,
        userFirstname: existingUser.name,
      }),
    });

    // IF ANY ERROR ON "RESEND API" INVALIDATES TOKEN
    if (error) {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return {
        error: "Erro ao enviar o email. Tente novamente.",
      };
    }

    return {
      success: successMsg,
    };
  } catch (error) {
    return {
      error: "Ocorreu um erro interno.",
    };
  }
}
