import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const properties = await Property.find().lean();

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de imóveis" },
      { status: 500 }
    );
  }
}
