import "server-only";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { S3 } from "@/lib/clients/s3Client"; // CONFIGURED CLIENT

// INTERFACE TO TYPE THE UPLOAD INPUT
interface GenerateUploadUrlParams {
  fileName: string;
  contentType: string;
  size: number;
}

export const StorageService = {
  /**
   * GENERATES A PRE-SIGNED URL FOR DIRECT UPLOAD TO THE BUCKET (PUT)
   */
  async getPresignedUploadUrl({
    fileName,
    contentType,
    size,
  }: GenerateUploadUrlParams) {
    const ext = path.extname(fileName).toLowerCase();
    const uniqueKey = `${uuidv4()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    //GENERATES THE URL VALID FOR 6 MINUTES
    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 360 });

    return {
      presignedUrl,
      key: uniqueKey,
    };
  },

  /**
   * REMOVE A FILE FROM THE BUCKET
   */
  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    // SEND DOES NOT RETURN USEFUL DATA ON DELETE, IT JUST THROWS AN ERROR IF IT FAILS
    await S3.send(command);
  },

  /**
   * DELETE ALL PHOTOS OF A PROPERTY AT ONCE
   */
  async deleteManyFiles(keys: string[]) {
    if (keys.length === 0) return;

    // Executa todos os deletes em paralelo
    await Promise.all(
      keys.map((key) =>
        this.deleteFile(key).catch((err) =>
          console.error(`Erro ao deletar arquivo ${key}:`, err)
        )
      )
    );
  },
};
