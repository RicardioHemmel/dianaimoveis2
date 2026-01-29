import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";
import PropertyStandings from "@/lib/db/models/property/property-details/standings.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

//------------------------ RETURNS EVERY PROPERTY THAT CONTAINS "STUDIO" TYPOLOGY ----------------------
export async function getStudios(
  limit: number = 10,
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();
  const studioTypology = await PropertyTypologies.findOne({ name: "Studio" });
  const properties = await Property.find({
    propertyTypologies: { $in: [studioTypology?._id!] },
  })
    .limit(limit)
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}

//------------------------ RETURNS EVERY PROPERTY THAT CONTAINS "STUDIO" TYPOLOGY ----------------------
export async function getHighEnd(
  limit: number = 10,
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();
  const highEndStanding = await PropertyStandings.findOne({
    name: "Alto Padrão",
  });
  const properties = await Property.find({
    propertyStanding: { $eq: [highEndStanding?._id!] },
  })
    .limit(limit)
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}

// -------------------------------- RETURNS FEATURED PROPERTIES --------------------------------
export async function getFeaturedProperties() {
  await connectMongoDB();

  const properties = await Property.find({ isFeatured: true }).lean<
    IPropertyPopulated[]
  >();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}

// -------------------------------- RETURNS ALL PROPERTIES --------------------------------
export async function getAllProperties(
  page: number = 1,
  limit: number = 12,
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  const skip = (page - 1) * limit;

  const properties = await Property.find()
    .skip(skip)
    .limit(limit)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}

// -------------------------------- RETURNS NEIGHBORHOOD PROPERTIES QTY --------------------------------
export async function getQtyPropertiesOnNeighborhoods(neighborhoods: string[]) {
  await connectMongoDB();

  const result = await Property.aggregate([
    {
      $match: {
        "address.neighborhood.name": { $in: neighborhoods }, // ONLY BRINGS PROPERTIES IN THE NEIGHBORHOODS LIST
      },
    },
    {
      $group: {
        _id: "$address.neighborhood.name", // GROUP INTO A "BUCKET" ALL PROPERTIES WITH THE SAME NEIGHBORHOOD AND COUNT THEM
        total: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0, // CHANGES "_ID" LABEL TO "NEIGHBORHOOD"
        neighborhood: "$_id",
        total: 1,
      },
    },
  ]);

  return result;
}
