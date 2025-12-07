import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyPurpose from "@/lib/db/models/property/purposes.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const purposes = await PropertyPurpose.find({}, { name: 1 }).sort({
      name: 1,
    });

    return NextResponse.json(purposes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar purposes:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de purposes" },
      { status: 500 }
    );
  }
}
