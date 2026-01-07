import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import {
  PropertyInputSchema,
  PropertyViewSchema,
} from "@/lib/schemas/property/property.schema";
import { getAmenities } from "@/lib/services/properties/property-details/property-amenities";
import { getPurposes } from "@/lib/services/properties/property-details/property-purposes";
import { getStandings } from "@/lib/services/properties/property-details/property-standings";
import { getStatus } from "@/lib/services/properties/property-details/property-status";
import { getTypes } from "@/lib/services/properties/property-details/property-types";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies";

export async function getProperties(): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  const properties = await Property.find()
    .populate("propertyType")
    .populate("propertyPurpose")
    .populate("propertyStanding")
    .populate("propertyStatus")
    .populate("propertyTypology")
    .lean<IPropertyPopulated[]>();

  const mappedProperties = properties.map((property) =>
    PropertyMapper.toView(property)
  );

  return mappedProperties;
}

export async function getPropertyById(
  id: string
): Promise<PropertyInputSchema | null> {
  await connectMongoDB();

  const property = await Property.findById(id)
    .populate("propertyType")
    .lean<IPropertyPopulated>();

  if (!property) {
    return null;
  }

  const mappedProperty = PropertyMapper.toInput(property);
  return mappedProperty;
}

export async function createProperty(
  data: PropertyInputSchema
): Promise<{ id: string }> {
  await connectMongoDB();

  const mappedProperty = PropertyMapper.toPersistence(data);

  const existingProperty = await Property.findOne({
    title: mappedProperty.title,
  }).lean();

  if (existingProperty) {
    throw new Error("PROPERTY_TITLE_ALREADY_EXISTS");
  }

  const createdProperty = await Property.create(mappedProperty);

  return { id: createdProperty._id.toString() };
}

export async function getAllPropertyDetails() {
  await connectMongoDB();

  const amenities = await getAmenities();
  const purposes = await getPurposes();
  const standings = await getStandings();
  const status = await getStatus();
  const types = await getTypes();
  const typologies = await getTypologies();

  return {
    amenities,
    purposes,
    standings,
    status,
    types,
    typologies,
  };
}

export async function updateProperty(id: string, data: PropertyInputSchema) {
  await connectMongoDB();

  const existingProperty = await Property.findById(id).lean();

  if (!existingProperty) {
    throw new Error("Imóvel não encontrado");
  }

  const mappedProperty = PropertyMapper.toPersistence(data);

  const updatedProperty = await Property.findByIdAndUpdate(id, mappedProperty)
    .populate("propertyType")
    .lean<IPropertyPopulated>();


  if (!updatedProperty) {
    throw new Error("Erro ao atualizar o imóvel");
  }

  return {property: PropertyMapper.toInput(updatedProperty)};
}
