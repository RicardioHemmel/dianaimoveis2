import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/property-details/types.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";

export async function getProperties() {
  await connectMongoDB();

  const teste = PropertyType.find();

  const property = await Property.find()
    .populate("propertyTypeId")
    .lean<IPropertyPopulated[]>();

  console.log(property[0]);

  const mappedProperty = PropertyMapper.toView(property[0]);

  console.log("This one is mapped", mappedProperty);

  return mappedProperty;
}
