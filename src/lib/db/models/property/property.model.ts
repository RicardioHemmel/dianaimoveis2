import mongoose, { Schema } from "mongoose";

const GalleryItem = {
  imageRef: String,
  order: Number,
  _id: false,
};

enum STATUS {
  DRAFT,
  PUBLISHED,
}

const PropertySchema = new Schema(
  {
    title: {type: String, unique: true},
    description: String,

    price: Number,
    bedroomsQty: Number,
    suitesQty: Number,
    bathbedroomsQty: Number,
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

    isActive: { type: Boolean, default: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { strict: true, timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
