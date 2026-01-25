import Neighborhood from "@/lib/db/models/address/neighborhood.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { NextRequest, NextResponse } from "next/server";
import { neighborhoodSchema } from "@/lib/schemas/property/property.schema";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    // PARSE
    const body = await req.json();
    const createNeighborhoodSchema = neighborhoodSchema.omit({ _id: true }); // ID IS GENERATED ON DB
    const parsed = createNeighborhoodSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error },
        { status: 400 },
      );
    }

    // AVOIDS DUPLICATES
    const existing = await Neighborhood.findOne({
      name: { $regex: `^${parsed.data}$`, $options: "i" },
    });

    if (existing) {
      const mapped = PropertyMapper.PropertyNeighborhoodToSchema(existing);
      return NextResponse.json(mapped, { status: 200 });
    }

    // CREATES NEW NEIGHBORHOOD
    const newNeighborhood = await Neighborhood.create(parsed.data);

    if (!newNeighborhood) {
      return NextResponse.json(
        { error: "Falha ao criar bairro no banco de dados" },
        { status: 500 },
      );
    }

    // 4. Retornar resposta correta (NextResponse)
    const mappedResponse =
      PropertyMapper.PropertyNeighborhoodToSchema(newNeighborhood);

    return NextResponse.json(mappedResponse, { status: 201 });
  } catch (error) {
    console.error("Erro na criação de bairro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
