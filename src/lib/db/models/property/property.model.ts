import mongoose, { Schema, Model } from "mongoose";
import { IPropertyRaw } from "@/lib/schemas/property/IProperty";

const propertySchema = new Schema(
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
    propertyStatus: { type: Schema.Types.ObjectId, ref: "PropertyStatus" },
    propertyTypology: {
      type: Schema.Types.ObjectId,
      ref: "PropertyTypology",
    },
    propertyAmenities: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities" },
    ],

    propertyGallery: [{ imageKey: String, order: Number }],
    propertyFloorPlanGallery: [{ imageKey: String, order: Number }],
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

const PropertyModel =
  (mongoose.models.Property as Model<IPropertyRaw>) ||
  mongoose.model<IPropertyRaw>("Property", propertySchema);
export default PropertyModel;
