import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import TypologiesModel from "@/lib/db/models/property/property-details/typologies.model";

export type PropertiesSummaryCount = {
  total: number;
  published: number;
  draft: number;
};

export async function getPropertiesSummaryCount(): Promise<PropertiesSummaryCount> {
  await connectMongoDB();

  const result = await Property.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        published: {
          $sum: {
            $cond: [{ $eq: ["$status", "PUBLISHED"] }, 1, 0],
          },
        },
        draft: {
          $sum: {
            $cond: [{ $eq: ["$status", "DRAFT"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        published: 1,
        draft: 1,
      },
    },
  ]);

  if (!result.length) {
    return { total: 0, published: 0, draft: 0 };
  }

  const summary = result[0] as PropertiesSummaryCount;
  return {
    total: summary.total ?? 0,
    published: summary.published ?? 0,
    draft: summary.draft ?? 0,
  };
}

type StandingCount = {
  standingId: string;
  name: string;
  total: number;
};

type TypologyCount = {
  typologyId: string;
  name: string;
  total: number;
};

// COUNTS TOTAL OF APARTMENTS IN EACH STANDING
export async function countPropertiesByStanding(): Promise<StandingCount[]> {
  await connectMongoDB();

  const result = await Property.aggregate([
    { $match: { propertyStanding: { $ne: null } } },
    { $group: { _id: "$propertyStanding", total: { $sum: 1 } } },
    {
      $lookup: {
        from: "property_standings",
        localField: "_id",
        foreignField: "_id",
        as: "standing",
      },
    },
    { $unwind: "$standing" },
    {
      $project: {
        _id: 0,
        standingId: "$_id",
        name: "$standing.name",
        total: 1,
      },
    },
  ]);

  return result;
}

// COUNTS TOTAL OF APARTMENTS IN EACH TYPOLOGY
export async function countPropertiesByTypology(): Promise<TypologyCount[]> {
  await connectMongoDB();

  const result = await TypologiesModel.aggregate([
    {
      $lookup: {
        from: "properties",
        let: { typologyId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$$typologyId", "$propertyTypologies"] },
            },
          },
          { $count: "total" },
        ],
        as: "properties",
      },
    },
    {
      $addFields: {
        total: {
          $ifNull: [{ $arrayElemAt: ["$properties.total", 0] }, 0],
        },
      },
    },
    {
      $project: {
        _id: 0,
        typologyId: "$_id",
        name: "$name",
        total: 1,
      },
    },
    { $sort: { total: -1, name: 1 } },
  ]);

  return result.map((item: TypologyCount) => ({
    typologyId: String(item.typologyId),
    name: item.name,
    total: item.total ?? 0,
  }));
}
