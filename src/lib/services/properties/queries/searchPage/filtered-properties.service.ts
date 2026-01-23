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

//--------------------------------------------- AUXILIARY FOR RANGE FILTERS ------------------------------------------
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

  // SORT DATA WITH SORT WEIGHTS
  let pipeline: any[] = [{ $match: query }];

  switch (filters.sortOption) {
    // PROPERTIES THAT CONTAIN AREA COMES FIRST INSTEAD OF THE ONES WITH "NULL AREA"
    case "area_asc":
      pipeline.push(
        {
          $addFields: { hasArea: { $cond: [{ $gt: ["$area.min", 0] }, 1, 0] } },
        },
        { $sort: { hasArea: -1, "area.min": 1 } },
      );
      break;

    case "area_desc":
      pipeline.push({ $sort: { "area.min": -1 } });
      break;

    // PROPERTIES THAT CONTAI DELIVERY_DATE COMES FIRST INDETAD OF THE ONES WITH "NULL DELIVERY_DATE"
    case "ready":
      pipeline.push(
        {
          $addFields: {
            hasDate: { $cond: [{ $ifNull: ["$deliveryDate", false] }, 1, 0] },
          },
        },
        { $sort: { hasDate: -1, deliveryDate: 1 } },
      );
      break;

    case "launch":
      pipeline.push({ $sort: { deliveryDate: -1 } });
      break;

    case "price_asc":
      pipeline.push({ $sort: { price: 1 } });
      break;

    case "price_desc":
      pipeline.push({ $sort: { price: -1 } });
      break;

    case "date_asc":
      pipeline.push({ $sort: { createdAt: 1 } });
      break;

    default: // DEFAUL "DATE_DESC"
      pipeline.push({ $sort: { createdAt: -1 } });
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

  // USES AGGREGATE TO BE ABLE TO SORT BY WEIGHT SORT
  const properties = await Property.aggregate(pipeline);

  const populatedProperties = (await Property.populate(
    properties,
    POPULATE_FIELDS,
  )) as unknown as IPropertyPopulated[];

  return populatedProperties.map((property) =>
    PropertyMapper.toViewSchema(property),
  );
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
