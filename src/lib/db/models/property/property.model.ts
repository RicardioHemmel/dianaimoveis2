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

// SIMULAR TO THE GALLERY BUT WITH LABEL FOR DISPLAY
const floorPlanGallerySchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

// GUARANTEES INTEGRITY FOR PROPERTY DETAILS OF TYPE NUMBER
const rangeSchema = new Schema(
  {
    min: Number,
    max: Number,
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

// PROPERTY ADDRESS
const addressSchema = new Schema(
  {
    street: String,
    neighborhood: String,
    city: String,
    stateUf: String,
    zipCode: String,
    referencePoint: [String],
    lat: Number,
    lng: Number,
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

    isFeatured: { type: Boolean, default: false },
    isFurnished: toggleFieldSchema,
    isNearSubway: toggleFieldSchema,
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
    propertyTypologies: [
      {
        type: Schema.Types.ObjectId,
        ref: "PropertyTypologies",
      },
    ],
    propertyAmenities: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities" },
    ],

    gallery: [gallerySchema],
    floorPlanGallery: [floorPlanGallerySchema],

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
