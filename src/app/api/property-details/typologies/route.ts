import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyTypology from "@/lib/db/models/property/typologies.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const typologies = await PropertyTypology.find({}, { name: 1 }).sort({
      name: 1,
    });

    return NextResponse.json(typologies, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar typologies:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de typologies" },
      { status: 500 }
    );
  }
}
