import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyType from "@/lib/db/models/property/types.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const types = await PropertyType.find().sort({
      name: 1,
    });

    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar types:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de types" },
      { status: 500 }
    );
  }
}
