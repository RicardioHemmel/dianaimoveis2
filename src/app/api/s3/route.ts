// Manage files upload
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import connectMongoDB from "@/lib/db/mongodbConnection";
import Media from "@/lib/db/models/property/property-details/media.model";

export async function POST(req: Request) {
  function generateMediaPath({
    ownerType,
    ownerId,
    purpose,
    mediaId,
    mimeType,
  }: {
    ownerType: string;
    ownerId: string;
    purpose: string;
    mediaId: string;
    mimeType: string;
  }) {
    const extension = mimeType.split("/")[1];

    return `${ownerType.toLowerCase()}s/${ownerId}/${purpose.toLowerCase()}/${mediaId}.${extension}`;
  }
  await connectMongoDB();

  const body = await req.json();
  const { ownerType, ownerId, purpose, mimeType } = body;

  // validações mínimas
  if (!ownerType || !ownerId || !purpose || !mimeType) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const mediaId = randomUUID();

  const path = generateMediaPath({
    ownerType,
    ownerId,
    purpose,
    mediaId,
    mimeType,
  });

  const media = await Media.create({
    id: mediaId,
    ownerType,
    ownerId,
    purpose,
    path,
    mimeType,
    status: "PENDING",
  });

  return NextResponse.json({
    id: media.id,
    path: media.path,
    status: media.status,
  });
}
