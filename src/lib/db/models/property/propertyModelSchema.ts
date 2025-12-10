// Property schema for mongodb

import mongoose, { Schema } from "mongoose";

const GalleryItem = {
  imageRef: String,
  order: Number,
  _id: false,
};

export const propertyDefaultSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    price: { type: Number, required: true },
    roomsQty: Number,
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

    propertyTypeId: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true,
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

    coverImage: String,
    propertyGallery: [GalleryItem],
    propertyFloorPlanGallery: [GalleryItem],
    videoUrl: String,

    address: {
      street: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      _id: false,
    },

    isActive: { type: Boolean, default: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { strict: true, timestamps: true }
);
