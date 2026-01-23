import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import {
  PropertyInputSchema,
  PropertyViewSchema,
} from "@/lib/schemas/property/property.schema";

// AUXILIARY SERVICES
import { getAmenities } from "@/lib/services/properties/property-details/property-amenities.service";
import { getPurposes } from "@/lib/services/properties/property-details/property-purposes.service";
import { getStandings } from "@/lib/services/properties/property-details/property-standings.service";
import { getTypes } from "@/lib/services/properties/property-details/property-types.service";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies.service";
import { PopulateOptions } from "mongoose";

// --- CONSTANTS ---
export const POPULATE_FIELDS: PopulateOptions[] = [
  { path: "propertyType" },
  { path: "propertyPurpose" },
  { path: "propertyStanding" },
  { path: "propertyTypologies" },
  {
    path: "propertyAmenities",
    options: {
      sort: { name: 1 },
    },
  },
];

//-------------------------------- RETURN ALL PROPERTIES INCLUDING DRAFTS MAPPED TO BE SHOWN -------------------------------- //
export async function getAllPropertiesToView(): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  const properties = await Property.find()
    .setOptions({ includeDrafts: true }) // BRINGS ALSO DRAFT PROPERTIES
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}

//-------------------------------- RETURNS ONE PROPERTY BASED ON THE "ID" TO BE SHOWN --------------------------------//
export async function getPropertyToView(
  id: string,
): Promise<PropertyViewSchema | null> {
  await connectMongoDB();

  const property = await Property.findById(id)
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated>();

  if (!property) return null;

  return PropertyMapper.toViewSchema(property);
}

//-------------------------------- RETURNS ONE PROPERTY BASED ON ID TO BE SET ON THE "PROPERTY EDIT FORM" --------------------------------//
export async function getPropertyToInput(
  id: string,
): Promise<PropertyInputSchema | null> {
  await connectMongoDB();

  const property = await Property.findById(id)
    .populate("propertyType") // RETURNS THE POPULATED TYPE TO SET "Apartamento" AS THE DEFAULT VALUE
    .lean<IPropertyPopulated>();

  if (!property) return null;

  return PropertyMapper.toInputSchema(property);
}

// -------------------------------- RETURNS ALL PROPERTY DETAILS TO MAP ON PROPERTY FORM SELECTS --------------------------------
export async function getAllPropertyDetails() {
  await connectMongoDB();

  // PROMISE.ALL TO EXECUTE ALL QUERIES IN PARALLEL (FASTER)
  const [amenities, purposes, standings, types, typologies] = await Promise.all(
    [
      getAmenities(),
      getPurposes(),
      getStandings(),
      getTypes(),
      getTypologies(),
    ],
  );

  return { amenities, purposes, standings, types, typologies };
}

// -------------------------------- RETURNS RELATED PROPERTIES BASED ON THE STANDING OF THE SELECTED PROPERTY --------------------------------
export async function getRelatedProperties(id: string) {
  await connectMongoDB();

  const property = await Property.findById(id);

  if (!property || !property.propertyStanding) return [];

  const relatedProperties = await Property.find({
    propertyStanding: property.propertyStanding,
    _id: { $ne: property._id }, // AVOIDS BRINGING THE MAIN PROPERTY
  })
    .sort({ price: 1 })
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>(); // MINOR PRICE FIRST

  return relatedProperties.map((property) =>
    PropertyMapper.toViewSchema(property),
  );
}

// -------------------------------- RETURNS FEATURED PROPERTIES --------------------------------
export async function getFeaturedProperties() {
  await connectMongoDB();

  const properties = await Property.find({ isFeatured: true })
    .populate("propertyType")
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
