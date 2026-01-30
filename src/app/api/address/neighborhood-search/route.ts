import Neighborhood from "@/lib/db/models/property/address/neighborhood.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // GET URL PARAM
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");

    // IF THERE NO QUERY, RETURN
    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    // SEARCH NEIGHBORHOODS ON DB
    const neighborhoods = await Neighborhood.find({
      name: { $regex: query, $options: "i" }, // IGNORES UPPER AND LOWER CASE
    })
      .limit(6)
      .lean();

    // MAPS TO ZOD SCHEMA
    const mappedNeighborhoods = neighborhoods.map((n) =>
      PropertyMapper.PropertyNeighborhoodToSchema(n),
    );

    return NextResponse.json(mappedNeighborhoods, { status: 200 });
  } catch (error) {
    console.error("Erro na busca de bairros:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
