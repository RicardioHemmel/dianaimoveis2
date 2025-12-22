// MONGODB
import User from "@/lib/db/models/user/user.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

import crypto from "crypto";

import { NextResponse } from "next/server";

// CHECKS IF THE PROVIDED TOKEN IS VALID
export async function POST(req: Request) {
  // RESET TOKEN
  const { token } = await req.json();

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
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.save();

    const safeUser = {
      email: user.email,
    };

    return NextResponse.json(safeUser, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: `Falha ao validar o token`,
      },
      {
        status: 500,
      }
    );
  }
}
