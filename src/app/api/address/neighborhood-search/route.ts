import type { NextApiRequest, NextApiResponse } from "next";
import Neighborhood from "@/lib/db/models/address/neighborhood.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(200).json([]);
  }

  const neighborhoods = await Neighborhood.find({
    name: { $regex: q, $options: "i" },
  })
    .limit(10)
    .lean();

  return res.status(200).json(neighborhoods);
}
