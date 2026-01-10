import mongoose, { Schema, Model } from "mongoose";
import { IPropertyRaw } from "@/lib/schemas/property/IProperty";

const galleryItemSchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

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
    deliveryDate: String,
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
    propertyTypology: {
      type: Schema.Types.ObjectId,
      ref: "PropertyTypology",
    },
    propertyAmenities: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities" },
    ],

    coverImage: String,
    propertyGallery: [galleryItemSchema],
    propertyFloorPlanGallery: [galleryItemSchema],

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
