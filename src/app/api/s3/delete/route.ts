import { NextResponse } from "next/server";
import { StorageService } from "@/lib/services/storage/storage.service";

// DELETE ONE IMAGE FROM ONE PROPERTY
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json(
        { error: "Chave do arquivo não fornecida" },
        { status: 400 }
      );
    }

    await StorageService.deleteFile(key);

    return NextResponse.json(
      { message: "Arquivo excluído com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na rota de delete:", error);
    return NextResponse.json(
      { error: "Falha ao excluir o arquivo" },
      { status: 500 }
    );
  }
}
