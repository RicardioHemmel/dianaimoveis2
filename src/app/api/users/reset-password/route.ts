// MONGODB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// REDEFINES USER PASSWORD
export async function POST(req: Request) {
  // NEW PASSWORD AND WHO TO DEFINE IT
  const { newPassword, userEmail } = await req.json();
  await connectMongoDB();

  // SEARCHES FOR A USER WITH THE SAME HASHED TOKEN THAT WAS GENERATED WITHIN 1 HOUR
  const user = await User.findOne({
    email: userEmail,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 400 }
    );
  }

  if (
    !user.resetToken ||
    !user.resetTokenExpiry ||
    user.resetTokenExpiry <= new Date()
  ) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 400 }
    );
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  // INVALIDATES TOKEN
  try {
    user.password = newPasswordHash;
    user.resetToken = null;
    user.resetTokenExpiry = null;
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
