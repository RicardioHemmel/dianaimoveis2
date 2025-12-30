// import connectMongoDB from "@/lib/db/mongodbConnection";
// import Property from "@/lib/db/models/property/property.model";
// import PropertyType from "@/lib/db/models/property/property-details/types.model";
// import { PropertyFormData } from "@/lib/schemas/property/zod/property-base.schema";
// import { PropertyDB } from "@/lib/schemas/property/property-db";
// import { mapPropertyDBToForm } from "@/lib/db/mappers/property/property.mapper";

// export async function getPropertyById(
//   id: string
// ): Promise<PropertyFormData | null> {
//   await connectMongoDB();

//   const property = await Property.findById(id).lean<PropertyDB>();

//   if (!property) return null;

//   const propertyType = await PropertyType.findById(
//     property.propertyTypeId
//   ).lean<{ slug: string }>();

//   if (!propertyType) return null;

//   return mapPropertyDBToForm(property, propertyType.slug);
// }
