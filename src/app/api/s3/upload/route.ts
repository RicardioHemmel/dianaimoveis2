import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/clients/s3Client";
import { uploadRequestSchema } from "@/lib/schemas/property/property.schema";

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const parsed = uploadRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Conteúdo inválido" }, { status: 400 });
    }

    // Extract validated data
    const { fileName, contentType, size } = parsed.data;

    // Generate a unique key for the file
    const ext = path.extname(fileName).toLowerCase();
    const uniqueKey = `${uuidv4()}${ext}`;


    // Prepare the S3
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 360 }); // Valid for 6 minutes

    // Return the presigned URL and the unique key
    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
