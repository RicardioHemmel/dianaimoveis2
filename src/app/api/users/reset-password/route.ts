// MONGODB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

import crypto from "crypto";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // RESET TOKEN AND NEW PASSWORD
  const { token, newPassword } = await req.json();

  // HASHES TOKEN TO COMPARE WITH THE ONE ON DB
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  await connectMongoDB();

  // SEARCHES FOR A USER WITH THE SAME HASHED TOKEN THAT WAS GENERATED WITHIN 1 HOUR
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 400 }
    );
  }

  // INVALIDATES TOKEN
  try {
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.save();

    return NextResponse.json(
      { success: "Senha atualizada com sucesso" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: `Erro ao redefinir senha: ${e}`,
      },
      {
        status: 500,
      }
    );
  }
}
