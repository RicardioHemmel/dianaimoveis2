import { NextResponse } from "next/server";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/property-details/types.model";
import connectMongoDB from "@/lib/db/mongodbConnection";
import { PropertyDraftSchema } from "@/lib/schemas/property/zod/property-draft.schema";

type RouteParams = {
  params: Promise<{ id: string }>;
};

let propertyType;

async function buildDraftPayload(parsedData: any) {
  const { propertyTypeSlug, _id, ...data } = parsedData;

  propertyType = await PropertyType.findOne({
    slug: propertyTypeSlug,
  });

  if (!propertyType) {
    throw new Error("Tipo de imóvel inválido");
  }

  return {
    ...data,
    propertyTypeId: propertyType._id,
    status: "DRAFT",
  };
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectMongoDB();

    // 1. Tenta ler o JSON. Se houver erro de caractere aqui, o catch pega.
    const json = await req.json();

    // 2. Validação do Zod
    const parsed = PropertyDraftSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    // 3. Montagem do payload
    let payloadToSave;
    try {
      payloadToSave = await buildDraftPayload(parsed.data);
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }

    // 4. Update no Banco (Onde o caractere especial costuma travar se houver erro de index)
    let draftProperty = await Property.findOneAndUpdate(
      { _id: id, status: "DRAFT" },
      { $set: payloadToSave },
      { new: true, runValidators: true } // Adicionado runValidators para segurança
    );

    if (!draftProperty) {
      return NextResponse.json(
        { success: false, message: "Rascunho não encontrado" },
        { status: 404 }
      );
    }

    // Retorno de sucesso
    return NextResponse.json({ success: true, draftProperty });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Já existe um imóvel cadastrado com este título. Escolha um nome diferente.",
        },
        { status: 409 } // Conflict
      );
    }
    // ESTE LOG É O MAIS IMPORTANTE:
    // Ele vai aparecer no terminal do seu VS Code (onde roda o npm run dev)
    console.error("ERRO NO BACKEND AO SALVAR CARACTER ESPECIAL:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno no servidor",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
