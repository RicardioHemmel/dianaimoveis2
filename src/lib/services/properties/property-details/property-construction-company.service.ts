import connectMongoDB from "@/lib/db/mongodbConnection";
import ConstructionCompany from "@/lib/db/models/property/construction-company/construction-company.model";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import { resolveImageUrl } from "@/lib/media/resolveImageUrl";

export type ConstructionCompanyWithLinkedProperties = PropertyDetailSchema & {
  linkedProperties: {
    _id: string;
    title: string;
    imageUrl?: string;
  }[];
};

export async function getCompanies(): Promise<PropertyDetailSchema[]> {
  await connectMongoDB();

  const companies = await ConstructionCompany.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (companies.length === 0) {
    return [];
  }

  return companies.map((company) =>
    PropertyMapper.PropertyDetailToView(company),
  );
}

export async function createConstructionCompany(
  name: string,
): Promise<PropertyDetailSchema> {
  await connectMongoDB();

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("CONSTRUCTION_COMPANY_NAME_REQUIRED");
  }

  const existing = await ConstructionCompany.findOne({ name: trimmedName })
    .collation({ locale: "pt", strength: 2 })
    .lean();

  if (existing) {
    throw new Error("CONSTRUCTION_COMPANY_ALREADY_EXISTS");
  }

  const company = await ConstructionCompany.create({ name: trimmedName });

  return PropertyMapper.PropertyDetailToView(company);
}

export async function deleteConstructionCompany(id: string) {
  await connectMongoDB();

  if (!id) {
    throw new Error("CONSTRUCTION_COMPANY_ID_REQUIRED");
  }

  const updateResult = await Property.updateMany(
    { "constructionCompany._id": id },
    { $unset: { constructionCompany: "" } },
  );

  const deleteResult = await ConstructionCompany.deleteOne({ _id: id });

  if (deleteResult.deletedCount === 0) {
    throw new Error("CONSTRUCTION_COMPANY_NOT_FOUND");
  }

  return {
    removedFromProperties: updateResult.modifiedCount ?? 0,
  };
}

export async function getCompaniesWithLinkedProperties(): Promise<
  ConstructionCompanyWithLinkedProperties[]
> {
  await connectMongoDB();

  const companies = await ConstructionCompany.aggregate([
    {
      $lookup: {
        from: "properties",
        let: { companyId: "$_id" },
        pipeline: [
          {
            $match: {
              status: { $in: ["DRAFT", "PUBLISHED"] },
              $expr: {
                $eq: ["$constructionCompany._id", "$$companyId"],
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

  return companies.map((company) => ({
    _id: company._id.toString(),
    name: company.name,
    linkedProperties:
      company.linkedProperties?.map(
        (property: { _id: string; title: string; imageKey?: string }) => ({
          _id: property._id.toString(),
          title: property.title,
          imageUrl: resolveImageUrl(property.imageKey),
        }),
      ) ?? [],
  }));
}
