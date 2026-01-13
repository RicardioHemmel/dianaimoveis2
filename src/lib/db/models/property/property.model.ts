import mongoose, { Schema, Model } from "mongoose";
import { IPropertyRaw } from "@/lib/schemas/property/IProperty";

// GALLERY WITH ORDER FOR DISPLAY AND CLOUD KEY
const GalleryItemSchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

// GUARANTEES INTEGRITY FOR PROPERTY DETAILS OF TYPE NUMBER
const RangeSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

// MAX VALUE CAN'T BE LESS THEN MIN
RangeSchema.path("max").validate(function (value) {
  return this.min <= value;
}, "Min não pode ser maior que Max");

const propertySchema = new Schema(
  {
    title: { type: String, unique: true },
    description: String,
    price: Number,

    bedrooms: RangeSchema,
    suites: RangeSchema,
    bathrooms: RangeSchema,
    parkingSpaces: RangeSchema,
    area: RangeSchema,

    deliveryDate: String,
    condominiumFee: Number,
    floorStart: Number,
    floorEnd: Number,
    constructionCompany: String,

    isFurnished: Boolean,
    isNearSubway: Boolean,
    isFeatured: Boolean,
    showSquareMeterPrice: Boolean,
    isPetFriendly: Boolean,

    propertyType: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
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

    propertyGallery: [GalleryItemSchema],
    propertyFloorPlanGallery: [GalleryItemSchema],

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
      stateUf: String,
      zipCode: String,
      _id: false,
    },
  },
  { strict: true, timestamps: true }
);

const PropertyModel =
  (mongoose.models.Property as Model<IPropertyRaw>) ||
  mongoose.model<IPropertyRaw>("Property", propertySchema);
export default PropertyModel;
