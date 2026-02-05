import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyAmenities from "@/lib/db/models/property/property-details/amenities.model";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import { resolveImageUrl } from "@/lib/media/resolveImageUrl";

export type AmenityWithLinkedProperties = PropertyDetailSchema & {
  linkedProperties: {
    _id: string;
    title: string;
    imageUrl?: string;
  }[];
};

export async function getAmenities(): Promise<PropertyDetailSchema[]> {
  await connectMongoDB();

  const amenities = await PropertyAmenities.find({}, { name: 1 })
    .sort({
      name: 1,
    })
    .collation({ locale: "pt" });

  if (amenities.length === 0) {
    return [];
  }

  return amenities.map((amenity) =>
    PropertyMapper.PropertyDetailToView(amenity),
  );
}

export async function createAmenity(
  name: string,
): Promise<PropertyDetailSchema> {
  await connectMongoDB();

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("AMENITY_NAME_REQUIRED");
  }

  const existing = await PropertyAmenities.findOne({ name: trimmedName })
    .collation({ locale: "pt", strength: 2 })
    .lean();

  if (existing) {
    throw new Error("AMENITY_ALREADY_EXISTS");
  }

  const amenity = await PropertyAmenities.create({ name: trimmedName });

  return PropertyMapper.PropertyDetailToView(amenity);
}

export async function deleteAmenity(id: string) {
  await connectMongoDB();

  if (!id) {
    throw new Error("AMENITY_ID_REQUIRED");
  }

  const updateResult = await Property.updateMany(
    { propertyAmenities: id },
    { $pull: { propertyAmenities: id } },
  );

  const deleteResult = await PropertyAmenities.deleteOne({ _id: id });

  if (deleteResult.deletedCount === 0) {
    throw new Error("AMENITY_NOT_FOUND");
  }

  return {
    removedFromProperties: updateResult.modifiedCount ?? 0,
  };
}
// RETURN AMENITIES WITH COUNT OF LINKED PROPERTIES
export async function getAmenitiesWithLinkedProperties(): Promise<
  AmenityWithLinkedProperties[]
> {
  await connectMongoDB();

  const amenities = await PropertyAmenities.aggregate([
    {
      $lookup: {
        from: "properties",
        let: { amenityId: "$_id" },
        pipeline: [
          {
            $match: {
              status: { $in: ["DRAFT", "PUBLISHED"] },
              $expr: {
                $in: ["$$amenityId", { $ifNull: ["$propertyAmenities", []] }],
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

  return amenities.map((amenity) => ({
    _id: amenity._id.toString(),
    name: amenity.name,
    linkedProperties:
      amenity.linkedProperties?.map(
        (property: { _id: string; title: string; imageKey?: string }) => ({
          _id: property._id.toString(),
          title: property.title,
          imageUrl: resolveImageUrl(property.imageKey),
        }),
      ) ?? [],
  }));
}
