import mongoose, { Schema, Types, Model } from "mongoose";

export interface IProperty {
  title: string;
  description?: string,

  price?: number,
  bedroomsQty?: number,
  suitesQty?: number,
  bathroomsQty?: number,
  parkingSpacesQty?: number,
  area?: number,
  condominiumFee?: number,
  floorStart?: number,
  floorEnd?: number,

  isFurnished?: boolean,
  isNearSubway?: boolean,
  isFeatured?: boolean,
  showSquareMeterPrice?: boolean,
  isPetFriendly?: boolean,

  propertyTypeId: Types.ObjectId,
  propertyPurposeId: Types.ObjectId,
  propertyStandingId: Types.ObjectId,
  propertyStatusId: Types.ObjectId,
  propertyTypologyId: Types.ObjectId,
  propertyAmenitiesId: Types.ObjectId[],

  // propertyGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
  // propertyFloorPlanGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
  videoUrl: string,

  status: "DRAFT" | "PUBLISHED",

  address: {
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
  },

}

const PropertySchema = new Schema(
  {
    title: { type: String, unique: true },
    description: String,

    price: Number,
    bedroomsQty: Number,
    suitesQty: Number,
    bathroomsQty: Number,
    parkingSpacesQty: Number,
    area: Number,
    condominiumFee: Number,
    floorStart: Number,
    floorEnd: Number,

    isFurnished: Boolean,
    isNearSubway: Boolean,
    isFeatured: Boolean,
    showSquareMeterPrice: Boolean,
    isPetFriendly: Boolean,

    propertyTypeId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
    },
    propertyPurposeId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyPurpose",
    },
    propertyStandingId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyStanding",
    },
    propertyStatusId: { type: Schema.Types.ObjectId, ref: "PropertyStatus" },
    propertyTypologyId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyTypology",
    },
    propertyAmenitiesId: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities" },
    ],

    // propertyGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: Number }],
    // propertyFloorPlanGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: Number }],
    videoUrl: String,

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      index: true,
    },

    address: {
      street: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      _id: false,
    },

  },
  { strict: true, timestamps: true }
);


const PropertyModel = (mongoose.models.Property as Model<IProperty>) || mongoose.model<IProperty>("Property", PropertySchema)
export default PropertyModel;

