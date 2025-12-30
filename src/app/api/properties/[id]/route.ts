import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/property-details/types.model";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectMongoDB();

    // 1️⃣ Validação de ID (rápida e barata)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // 2️⃣ Busca do imóvel
    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Imóvel não encontrado" },
        { status: 404 }
      );
    }

    // 3️⃣ Buscar slug do tipo (frontend trabalha com slug)
    const propertyType = await PropertyType.findById(
      property.propertyTypeId
    ).lean();

    // 4️⃣ Normalização do payload para o FORM
    const propertyForForm = {
      ...property,
      _id: property._id.toString(),
      propertyTypeSlug: propertyType?.slug ?? null,
    };

    // 5️⃣ Retorno limpo e previsível
    return NextResponse.json(
      {
        success: true,
        data: propertyForForm,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar imóvel",
      },
      { status: 500 }
    );
  }
}
