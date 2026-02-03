import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import { Types } from "mongoose";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";

// AUXILIARY SERVICES
import { getAmenities } from "@/lib/services/properties/property-details/property-amenities.service";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies.service";

// REFS
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

//SCHEMA
import { DetailsQty, SelectedFilters } from "@/context/SearchPropertyContext";

//--------------------------------------------- AUXILIARY FOR RANGE FILTERS ------------------------------------------
const applyDetailFilter = (
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
  pagination: { page: number; limit: number } = { page: 1, limit: 9 },
) {
  await connectMongoDB();

  // APPLY FILTERS BASED ON FILTERS VALUES
  const query: any = {
    status: "PUBLISHED",
  };

  // SORT DATA WITH SORT WEIGHTS
  let pipeline: any[] = [{ $match: query }];

  // PAGINATION VALUES
  const { page, limit } = pagination;

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
  today.setUTCHours(0, 0, 0, 0);

  if (filters.deliveryStatus) {
    if (filters.deliveryStatus === "Lançamento") {
      query.deliveryDate = { $gt: today };
    } else if (filters.deliveryStatus === "Pronto") {
      query.deliveryDate = { $lte: today };
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
      $all: filters.amenities.map((id) => new Types.ObjectId(id)),
    };
  }

  //-------------- DETAILS FILTERS ------------------
  applyDetailFilter(query, "bedrooms", filters.bedrooms);
  applyDetailFilter(query, "bathrooms", filters.bathrooms);
  applyDetailFilter(query, "parkingSpaces", filters.parkingSpaces);

  //-------------- SLIDER FILTERS ------------------

  if (filters.areaRange) {
    query["area.min"] = { $gte: filters.areaRange.min };
    query["area.max"] = { $lte: filters.areaRange.max };
  }

  if (filters.priceRange) {
    query.price = {
      $gte: filters.priceRange.min,
      $lte: filters.priceRange.max,
    };
  }

  //-------------- TITLE | CONSTRUCTION COMPANY FILTER ------------------

  if (filters.search) {
    const search = filters.search.trim();
    query.$or = [
      { title: { $regex: search, $options: "i" } }, // REGEX WITH "I" IGNORES UPPER AND LOWER CASE
      { constructionCompany: { $regex: search, $options: "i" } },
    ];
  }

  //-------------- ADDRESS FILTER ------------------

  if (filters.address) {
    const address = filters.address;
    query["address.neighborhood.name"] = { $regex: address, $options: "i" }; // REGEX WITH "I" IGNORES UPPER AND LOWER CASE
  }
  // ---------------- PAGINATION ----------------
  const skip = (page - 1) * limit;

  pipeline.push({ $skip: skip }, { $limit: limit });

  // USES AGGREGATE TO BE ABLE TO SORT BY WEIGHT SORT
  const properties = await Property.aggregate(pipeline);

  const total = await Property.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  const populatedProperties = (await Property.populate(
    properties,
    POPULATE_FIELDS,
  )) as unknown as IPropertyPopulated[];

  return {
    properties: populatedProperties.map((property) =>
      PropertyMapper.toViewSchema(property),
    ),
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      limit,
    },
  };
}

// -------------------------------- RETURNS ALL NECESSARY FILTERS --------------------------------
export async function getPropertyFilterValues() {
  await connectMongoDB();

  const [amenities, typologies, ranges] = await Promise.all([
    getAmenities(),
    getTypologies(),
    Property.aggregate([
      {
        $group: {
          _id: null,

          // PRICE RANGE
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },

          // AREA RANGE
          minArea: { $min: "$area.min" },
          maxArea: { $max: "$area.max" },
        },
      },
    ]),
  ]);

  // IF THERE IS NO RANGES SET VALUES AS "0"
  const { minPrice, maxPrice, minArea, maxArea } = ranges[0] || {
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
  };

  // FILTERS
  return {
    amenities,
    typologies,
    priceRange: {
      min: minPrice,
      max: maxPrice,
    },
    areaRange: {
      min: minArea,
      max: maxArea,
    },
  };
}
