import User from "@/lib/db/models/user/user";
import connectMongoDB from "@/lib/db/mongodbConnection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    await connectMongoDB();

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new Error("Erro ao criar conta");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Falha ao criar usuário" },
      { status: 500 }
    );
  }
}
