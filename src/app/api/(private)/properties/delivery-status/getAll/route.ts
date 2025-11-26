import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyDeliveryStatus from "@/lib/db/models/property/delivery-status.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const delivery_status = await PropertyDeliveryStatus.find(
      {},
      { name: 1 }
    ).sort({
      name: 1,
    });

    return NextResponse.json(delivery_status, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar delivery_status:", error);

    return NextResponse.json(
      { error: "Erro ao carregar lista de delivery_status" },
      { status: 500 }
    );
  }
}
