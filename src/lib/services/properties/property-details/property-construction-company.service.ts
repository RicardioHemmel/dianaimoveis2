import connectMongoDB from "@/lib/db/mongodbConnection";
import ConstructionCompany from "@/lib/db/models/property/construction-company/construction-company.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";

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
