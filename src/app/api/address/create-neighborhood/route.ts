import type { NextApiRequest, NextApiResponse } from "next";
import Neighborhood from "@/lib/db/models/address/neighborhood.model";
import connectMongoDB from "@/lib/db/mongodbConnection";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const existing = await Neighborhood.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  });

  if (existing) {
    return res.status(200).json(existing);
  }

  const neighborhood = await Neighborhood.create({
    name,
  });

  return res.status(201).json(neighborhood);
}
