import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Gets frontend data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderName = formData.get("folderName") as string;

    // Error is file is not provided
    if (!file) {
      return NextResponse.json({ msg: "Arquivo não encontrado", status: 404 });
    }

    // Transform the uploaded file into bynaries to send to Cloudinary API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Creates HTTP conection to Cloudinary server to send the file bynaries
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      msg: "Arquivo enviado com sucesso",
      data: result,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { msg: "Erro ao enviar arquivo", error, status: 500 },
      { status: 500 }
    );
  }
}
