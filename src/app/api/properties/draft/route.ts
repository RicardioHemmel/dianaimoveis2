import { NextResponse } from "next/server";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/types.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { PropertyDraftSchema } from "@/lib/schemas/property/zod/property-draft.schema";
import mongoose from "mongoose";

// Creates a property draft
export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const json = await req.json();

    const parsed = PropertyDraftSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
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

    // Remove o slug do payload
    const { propertyTypeSlug, _id, ...data } = parsed.data;

    const payloadToSave = {
      ...data,
      propertyTypeId: propertyType._id as string,
      status: "DRAFT",
    };

    let draftProperty;

    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      draftProperty = await Property.findByIdAndUpdate(
        _id,
        { $set: payloadToSave },
        { new: true }
      );

      if (!draftProperty) {
        return NextResponse.json(
          { success: false, message: "Rascunho não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, draftProperty },
        { status: 200 }
      );
    } else {
      draftProperty = await Property.create(payloadToSave);
      return NextResponse.json(
        { success: true, draftProperty },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
