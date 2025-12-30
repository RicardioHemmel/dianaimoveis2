import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyStatus from "@/lib/db/models/property/property-details/status.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const status = await PropertyStatus.find({}, { name: 1 }).sort({
      name: 1,
    });

    return NextResponse.json(status, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar status:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de status" },
      { status: 500 }
    );
  }
}
