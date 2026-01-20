import { NextRequest, NextResponse } from "next/server";
import { getFavorites } from "@/lib/services/properties/queries/favorite/get-favorite-properties.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { error: "ids precisa ser um array" },
        { status: 400 },
      );
    }

    if (ids.length > 100) {
      return NextResponse.json(
        { error: "Muitos favoritos de uma vez" },
        { status: 400 },
      );
    }

    const properties = await getFavorites(ids);

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar favoritos" },
      { status: 500 },
    );
  }
}
