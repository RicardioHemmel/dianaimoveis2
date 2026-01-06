import { S3 } from "@/lib/clients/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = req.json();
    const { key } = await body;

    if (!key) {
      return NextResponse.json(
        { error: "Chave do arquivo não fornecida" },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: "Arquivo excluído com sucesso" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao excluir o arquivo" },
      { status: 500 }
    );
  }
}
