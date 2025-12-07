import { NextResponse } from "next/server";
import Property from "@/lib/db/models/property/property.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

// 1. Defina o tipo uma vez fora das funções
type RouteParams = {
  params: Promise<{ id: string }>;
};

// --- Rota GET ---
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params; // Lembre-se do await no Next 15
    await connectMongoDB();
    
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ message: "Imóvel não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// --- Rota PATCH ---
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    // 1. Pega o ID da URL
    const { id } = await params;

    // 2. Pega os dados enviados no corpo da requisição (JSON)
    const body = await req.json();

    await connectMongoDB();

    // 3. Atualiza no Banco (findByIdAndUpdate do Mongoose)
    // { new: true } retorna o objeto atualizado, não o antigo
    const updatedProperty = await Property.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true, // Garante que as regras do Schema sejam respeitadas
    });

    if (!updatedProperty) {
      return NextResponse.json({ message: "Imóvel não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: updatedProperty }, { status: 200 });

  } catch (error) {
    console.error(error); // Bom para debug
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar imóvel" },
      { status: 500 }
    );
  }
}

// --- Rota DELETE (Bônus) ---
export async function DELETE(req: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        await connectMongoDB();

        await Property.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Deletado com sucesso" });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao deletar" }, { status: 500 });
    }
}