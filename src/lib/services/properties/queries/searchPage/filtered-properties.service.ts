import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// AUXILIARY SERVICES
import { getAmenities } from "@/lib/services/properties/property-details/property-amenities.service";
import { getPurposes } from "@/lib/services/properties/property-details/property-purposes.service";
import { getStandings } from "@/lib/services/properties/property-details/property-standings.service";
import { getTypes } from "@/lib/services/properties/property-details/property-types.service";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies.service";

// REFS
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

//SCHEMA
import { DetailsQty, SelectedFilters } from "@/context/SearchPropertyContext";
import { Types } from "mongoose";

//--------------------------------------------- AUXILIARY ------------------------------------------
const applyRangeFilter = (
  query: any,
  field: string,
  value: DetailsQty | null,
) => {
  if (value === null) return;

  if (value === "5+") {
    query[`${field}.max`] = { $gte: 5 };
  } else {
    const numValue = Number(value);
    query[`${field}.min`] = { $lte: numValue };
    query[`${field}.max`] = { $gte: numValue };
  }
};

//-------------------------------- RETURN ALL PROPERTIES THAT MATCHES THE FILTER QUERY -------------------------------- //
export async function getFilteredProperties(
  filters: SelectedFilters,
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  const query: any = {};

  // SORT DATA
  let sortQuery: any = { createdAt: -1 };

  switch (filters.sortOption) {
    case "price_desc":
      sortQuery = { price: -1 };
      break;

    case "price_asc":
      sortQuery = { price: 1 };
      break;

    case "date_desc":
      sortQuery = { createdAt: -1 };
      break;

    case "date_asc":
      sortQuery = { createdAt: 1 };
      break;

    case "area_desc":
      sortQuery = { "area.min": -1 };
      break;

    case "area_asc":
      sortQuery = { "area.min": 1 };
      break;

    case "launch":
      sortQuery = { deliveryDate: -1 };
      break;

    case "ready":
      sortQuery = { deliveryDate: 1 };
      break;
  }

  //-------------- DATE FILTER ----------------
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // BD SAVES DATE AS STRING

  if (filters.deliveryStatus) {
    if (filters.deliveryStatus === "Lançamento") {
      query.deliveryDate = { $gt: todayStr };
    } else if (filters.deliveryStatus === "Pronto") {
      query.deliveryDate = { $lte: todayStr };
    }
  }

  //-------------- ID FILTERS ------------------
  if (filters.typologies?.length) {
    query.propertyTypologies = {
      $in: filters.typologies.map((id) => new Types.ObjectId(id)),
    };
  }

  if (filters.amenities?.length) {
    query.propertyAmenities = {
      $in: filters.amenities.map((id) => new Types.ObjectId(id)),
    };
  }

  //-------------- RANGE FILTERS ------------------
  applyRangeFilter(query, "bedrooms", filters.bedrooms);
  applyRangeFilter(query, "bathrooms", filters.bathrooms);
  applyRangeFilter(query, "parkingSpaces", filters.parkingSpaces);

  const properties = await Property.find(query)
    .sort(sortQuery)
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
// -------------------------------- RETURNS ALL NECESSARY FILTERS --------------------------------
export async function getPropertyFilterValues() {
  await connectMongoDB();

  // PROMISE.ALL TO EXECUTE ALL QUERIES IN PARALLEL (FASTER)
  const [amenities, typologies] = await Promise.all([
    getAmenities(),
    getTypologies(),
  ]);

  return { amenities, typologies };
}
