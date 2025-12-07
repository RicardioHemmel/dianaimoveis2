// app/api/properties/route.ts
import { NextResponse } from "next/server";
import Property from "@/lib/db/models/property/property.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { PropertySchema } from "@/lib/schemas/property/property.schema";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const json = await req.json();

    const parsed = PropertySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const property = await Property.create(parsed.data);

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro interno ao criar imóvel" },
      { status: 500 }
    );
  }
}
