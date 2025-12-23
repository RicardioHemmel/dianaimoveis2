import { NextResponse } from "next/server";

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

// SENDS A RESET TOKEN TO REDEFINE PASSWORD ON EMAIL
export async function POST(req: Request) {
  // VALIDATES JSON BODY
  const body = await req.json();
  const { email } = body;
  const validation = emailSchema.safeParse(email);

  if (validation.error) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectMongoDB();

  const existingUser = await User.findOne({
    email,
    password: { $exists: true, $ne: null },
  });

  // SIMULATES SUCCESS FOR ENUMERATION PROTECTION
  if (!existingUser) {
    console.log("Usuário não existe no banco", existingUser);
    return NextResponse.json(
      {
        success: successMsg,
      },
      { status: 200 }
    );
  }

  // SIMULATES SUCCESS FOR ENUMERATION PROTECTION AND PREVENTS TO SEND UNECESSARY EMAILS
  if (
    existingUser.resetTokenExpiry &&
    existingUser.resetTokenExpiry > new Date()
  ) {
    console.log("Usuário existe, mas o token ainda é válido");
    return NextResponse.json(
      {
        success: successMsg,
      },
      { status: 200 }
    );
  }

  // TOKEN TO SEND BY EMAIL
  const resetToken = crypto.randomBytes(20).toString("hex");

  // HASHED TOKEN TO SAVE ON DB
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // VALID FOR 1 HOUR SINCE GENERATED
  const hashedResetTokenExpiresIn = Date.now() + 3600000;

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

    // IF ANY ERROR WITH "RESEND API" INVALIDATES TOKEN
    if (error) {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      console.error("Erro ao enviar email:", error);
      return NextResponse.json(
        { error: "Erro ao enviar o email. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: successMsg,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno no forgot-password:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno." },
      { status: 500 }
    );
  }
}
