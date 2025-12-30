import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyStanding from "@/lib/db/models/property/property-details/standings.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const standings = await PropertyStanding.find({}, { name: 1 }).sort({
      name: 1,
    });

    return NextResponse.json(standings, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar standings:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de standings" },
      { status: 500 }
    );
  }
}
