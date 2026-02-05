import connectMongoDB from "@/lib/db/mongodbConnection";
import Neighborhood from "@/lib/db/models/property/address/neighborhood.model";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { NeighborhoodSchema } from "@/lib/schemas/property/property.schema";
import { resolveImageUrl } from "@/lib/media/resolveImageUrl";

export type NeighborhoodWithLinkedProperties = NeighborhoodSchema & {
  linkedProperties: {
    _id: string;
    title: string;
    imageUrl?: string;
  }[];
};

export async function getNeighborhoods(): Promise<NeighborhoodSchema[]> {
  await connectMongoDB();

  const neighborhoods = await Neighborhood.find({}, { name: 1 })
    .sort({
      name: 1,
    })
    .collation({ locale: "pt" });

  if (neighborhoods.length === 0) {
    return [];
  }

  return neighborhoods.map((neighborhood) =>
    PropertyMapper.PropertyNeighborhoodToSchema(neighborhood),
  );
}

export async function createNeighborhood(
  name: string,
): Promise<NeighborhoodSchema> {
  await connectMongoDB();

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("NEIGHBORHOOD_NAME_REQUIRED");
  }

  const existing = await Neighborhood.findOne({ name: trimmedName })
    .collation({ locale: "pt", strength: 2 })
    .lean();

  if (existing) {
    throw new Error("NEIGHBORHOOD_ALREADY_EXISTS");
  }

  const neighborhood = await Neighborhood.create({ name: trimmedName });

  return PropertyMapper.PropertyNeighborhoodToSchema(neighborhood);
}

export async function deleteNeighborhood(id: string) {
  await connectMongoDB();

  if (!id) {
    throw new Error("NEIGHBORHOOD_ID_REQUIRED");
  }

  const updateResult = await Property.updateMany(
    { "address.neighborhood._id": id },
    { $unset: { "address.neighborhood": "" } },
  );

  const deleteResult = await Neighborhood.deleteOne({ _id: id });

  if (deleteResult.deletedCount === 0) {
    throw new Error("NEIGHBORHOOD_NOT_FOUND");
  }

  return {
    removedFromProperties: updateResult.modifiedCount ?? 0,
  };
}

export async function getNeighborhoodsWithLinkedProperties(): Promise<
  NeighborhoodWithLinkedProperties[]
> {
  await connectMongoDB();

  const neighborhoods = await Neighborhood.aggregate([
    {
      $lookup: {
        from: "properties",
        let: { neighborhoodId: "$_id" },
        pipeline: [
          {
            $match: {
              status: { $in: ["DRAFT", "PUBLISHED"] },
              $expr: {
                $eq: ["$address.neighborhood._id", "$$neighborhoodId"],
              },
            },
          },
          { $project: { title: 1, gallery: 1 } },
          {
            $unwind: {
              path: "$gallery",
              preserveNullAndEmptyArrays: true,
            },
          },
          { $sort: { "gallery.order": 1 } },
          {
            $group: {
              _id: "$_id",
              title: { $first: "$title" },
              imageKey: { $first: "$gallery.key" },
            },
          },
          { $project: { _id: 1, title: 1, imageKey: 1 } },
          { $sort: { title: 1 } },
        ],
        as: "linkedProperties",
      },
    },
    { $sort: { name: 1 } },
  ]).collation({ locale: "pt" });

  return neighborhoods.map((neighborhood) => ({
    _id: neighborhood._id.toString(),
    name: neighborhood.name,
    linkedProperties:
      neighborhood.linkedProperties?.map(
        (property: { _id: string; title: string; imageKey?: string }) => ({
          _id: property._id.toString(),
          title: property.title,
          imageUrl: resolveImageUrl(property.imageKey),
        }),
      ) ?? [],
  }));
}
