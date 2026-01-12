import { NextResponse } from "next/server";
import { StorageService } from "@/lib/services/storage/storage.service";
import { z } from "zod";

const deleteManySchema = z.object({
  keys: z.array(z.string()).min(1),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parsed = deleteManySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await StorageService.deleteManyFiles(parsed.data.keys);

    return NextResponse.json(
      { message: "Arquivos excluídos com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "JSON malformado" }, { status: 400 });
    }

    console.error("Erro na rota de delete:", error);
    return NextResponse.json(
      { error: "Falha ao excluir os arquivos" },
      { status: 500 }
    );
  }
}
