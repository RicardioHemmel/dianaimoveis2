// import connectMongoDB from "@/lib/db/mongodbConnection";
// import PropertyStatus from "@/lib/db/models/property/property-details/status.model";
// import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
// import { PropertyDetail } from "@/lib/schemas/property/property.schema";

// export async function getStatus(): Promise<PropertyDetail[]> {
//   await connectMongoDB();

//   const status = await PropertyStatus.find({}, { name: 1 }).sort({
//     name: 1,
//   });

//   if (status.length === 0) {
//     return [];
//   }

//   return status.map((s) => PropertyMapper.PropertyDetailToView(s));
// }
