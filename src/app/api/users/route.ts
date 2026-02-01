// import User from "@/lib/db/models/user/user.model";
// import connectMongoDB from "@/lib/db/mongodbConnection";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, password, name } = body;

//     if (!email || !password || !name) {
//       return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
//     }

//     await connectMongoDB();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Email já cadastrado" },
//         { status: 409 },
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       email,
//       name,
//       password: hashedPassword,
//     });

//     const userSafe = {
//       _id: user._id,
//       email: user.email,
//       name: user.name,
//     };

//     return NextResponse.json(userSafe, { status: 201 });
//   } catch (error) {
//     console.error("Erro no cadastro:", error);

//     return NextResponse.json(
//       { error: "Erro interno ao criar conta" },
//       { status: 500 },
//     );
//   }
// }
