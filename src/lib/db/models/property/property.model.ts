import mongoose, { Schema } from "mongoose";

const GalleryItem = {
  imageRef: String,
  order: Number,
  _id: false,
};

const Ref = (refName: string) => ({
  id: { type: Schema.Types.ObjectId, ref: refName },
  _id: false,
});

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

    propertyType: Ref("PropertyType"),
    propertyPurpose: Ref("PropertyPurpose"),
    propertyStanding: Ref("PropertyStanding"),
    propertyStatus: Ref("PropertyStatus"),
    propertyTypology: Ref("PropertyTypology"),
    propertyAmenities: [{ type: Schema.Types.ObjectId, ref: "PropertyAmenities" }],

    propertyGallery: [GalleryItem],
    propertyFloorPlanGallery: [GalleryItem],

    address: {
      street: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      _id: false,
    },
  },
  { timestamps: true }
);

// Checks if the model already exisits to avoid creating multiple models with the same name
export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
