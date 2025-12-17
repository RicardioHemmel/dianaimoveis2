import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyAmenities from "@/lib/db/models/property/amenities.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const amenities = await PropertyAmenities.find({}, { name: 1 }).sort({
      name: 1,
    });

    return NextResponse.json(amenities, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar amenities:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de amenidades" },
      { status: 500 }
    );
  }
}
