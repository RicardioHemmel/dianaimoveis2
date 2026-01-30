import { NextRequest, NextResponse } from "next/server";
import { uploadRequestSchema } from "@/lib/schemas/property/media/file.schema";
import { StorageService } from "@/lib/services/storage/storage.service";

// UPLOADS IMAGES TO CLOUD
export async function POST(req: NextRequest) {
  try {
    // PARSE AND VALIDATION
    const body = await req.json();
    const parsed = uploadRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Conteúdo inválido" }, { status: 400 });
    }

    // EXTRACTION OF VALIDATED DATA
    const { fileName, contentType, size } = parsed.data;

    const response = await StorageService.getPresignedUploadUrl({
      fileName,
      contentType,
      size,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro na rota de upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
