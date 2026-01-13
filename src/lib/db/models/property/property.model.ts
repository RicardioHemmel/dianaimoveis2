import mongoose, { Schema, Model } from "mongoose";
import { IProperty } from "@/lib/schemas/property/IProperty";

// GALLERY WITH ORDER FOR DISPLAY AND CLOUD KEY
const gallerySchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

// GUARANTEES INTEGRITY FOR PROPERTY DETAILS OF TYPE NUMBER
const rangeSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

// PROPERTY DETAILS WITH VISIBILITY TOGGLE
const toggleFieldSchema = new Schema(
  {
    value: Boolean,
    show: Boolean,
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    street: String,
    neighborhood: String,
    city: String,
    stateUf: String,
    zipCode: String,
  },
  { _id: false }
);

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, unique: true },
    description: String,
    price: Number,

    bedrooms: rangeSchema,
    suites: rangeSchema,
    bathrooms: rangeSchema,
    parkingSpaces: rangeSchema,
    area: rangeSchema,
    floors: rangeSchema,

    deliveryDate: String,
    condominiumFee: Number,
    constructionCompany: String,

    isFurnished: toggleFieldSchema,
    isNearSubway: toggleFieldSchema,
    isFeatured: toggleFieldSchema,
    showSquareMeterPrice: toggleFieldSchema,
    isPetFriendly: toggleFieldSchema,

    propertyType: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true,
    },

    propertyPurpose: {
      type: Schema.Types.ObjectId,
      ref: "PropertyPurpose",
    },
    propertyStanding: {
      type: Schema.Types.ObjectId,
      ref: "PropertyStanding",
    },
    propertyTypology: {
      type: Schema.Types.ObjectId,
      ref: "PropertyTypology",
    },
    propertyAmenities: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities" },
    ],

    gallery: [gallerySchema],
    floorPlanGallery: [gallerySchema],

    videoUrl: String,

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      index: true,
    },

    address: addressSchema,
  },
  { strict: true, timestamps: true }
);

const PropertyModel =
  (mongoose.models.Property as Model<IProperty>) ||
  mongoose.model<IProperty>("Property", propertySchema);
export default PropertyModel;
