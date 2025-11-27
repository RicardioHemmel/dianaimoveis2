import mongoose, { Schema } from "mongoose";

const RefWithName = {
  id: { type: Schema.Types.ObjectId, ref: String },
  name: String,
  _id: false,
};

const GalleryItem = {
  imageUrl: String,
  order: Number,
  _id: false,
};

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    roomsQty: Number,
    suitesQty: Number,
    bathroomsQty: Number,
    parkingSpacesQty: Number,
    price: { type: Number, required: true },
    area: Number,
    condominiumFee: Number,
    floorStart: Number,
    floortEnd: Number,

    videoUrl: String,
    coverImage: String,

    isFurnished: Boolean,
    isNearSubway: Boolean,
    isFeatured: Boolean,
    isActive: { type: Boolean, default: true },

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    propertyType: { ...RefWithName, ref: "PropertyType" },
    propertyPurpose: { ...RefWithName, ref: "PropertyPurpose" },
    propertyStanding: { ...RefWithName, ref: "PropertyStanding" },
    propertyDeliveryStatus: { ...RefWithName, ref: "PropertyDeliveryStatus" },
    propertyTypology: { ...RefWithName, ref: "PropertyTypology" },
    propertyLeisure: [{ ...RefWithName, ref: "PropertyLeisure" }],

    propertyGallery: [GalleryItem],
    propertyFloorPlanGallery: [GalleryItem],

    address: {
      street: String,
      propertyNumber: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
      zone: String,
      _id: false,
    },
  },
  { timestamps: true }
);

// Checks if the model already exisits to avoid creating multiple models with the same name
export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
