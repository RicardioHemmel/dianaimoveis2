import mongoose, { Schema } from "mongoose";

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
    // coverImage: { type: Schema.Types.ObjectId, ref: "Media" },
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

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
