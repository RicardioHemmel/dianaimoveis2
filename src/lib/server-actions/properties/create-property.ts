"use server";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import {
  PropertyInputSchema,
  propertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import ServerActionResponse from "@/lib/types/server-action-response";
import mongoose from "mongoose";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";

export default async function createProperty(
  formData: PropertyInputSchema
): Promise<ServerActionResponse> {
  await connectMongoDB();

  const parsed = propertyInputSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const mappedProperty = PropertyMapper.toPersistence(parsed.data);

  console.log(mappedProperty);

  const existingProperty = await Property.findOne({
    title: mappedProperty.title,
  }).lean();

  if (existingProperty) {
    return {
      success: false,
      message: "Já existe um imóvel com esse nome",
    };
  }

  const res = await Property.create(mappedProperty);

  console.log("from DB: ", res);

  return {
    success: true,
  };
}