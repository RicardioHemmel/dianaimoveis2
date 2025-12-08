// app/api/properties/route.ts
import { NextResponse } from "next/server";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/types.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { PropertySchema } from "@/lib/schemas/property/property.schema";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const json = await req.json();

    const parsed = PropertySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format },
        { status: 400 }
      );
    }

    // Busca o tipo
    const propertyType = await PropertyType.findOne({
      slug: parsed.data.propertyTypeSlug,
    });

    if (!propertyType) {
      return NextResponse.json(
        { success: false, message: "Tipo de imóvel inválido" },
        { status: 400 }
      );
    }

    console.log(propertyType)

    // Remove o slug do payload
    const { propertyTypeSlug, ...data } = parsed.data;

    // Cria o imóvel
    const property = await Property.create({
      ...data,
      propertyTypeId: propertyType._id,
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro interno ao criar imóvel" },
      { status: 500 }
    );
  }
}
