import mongoose, { Schema, Model, Query } from "mongoose";
import { IProperty } from "@/lib/schemas/property/IProperty";

// GALLERY WITH ORDER FOR DISPLAY AND CLOUD KEY
const gallerySchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
);

// SIMULAR TO THE GALLERY BUT WITH LABEL FOR DISPLAY
const floorPlanGallerySchema = new Schema(
  {
    key: { type: String, required: true },
    order: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

// GUARANTEES INTEGRITY FOR PROPERTY DETAILS OF TYPE NUMBER
const rangeSchema = new Schema(
  {
    min: Number,
    max: Number,
  },
  { _id: false },
);

// PROPERTY DETAILS WITH VISIBILITY TOGGLE
const toggleFieldSchema = new Schema(
  {
    value: Boolean,
    show: Boolean,
  },
  { _id: false },
);

// PROPERTY ADDRESS
const addressSchema = new Schema(
  {
    street: String,
    neighborhood: {
      _id: { type: Schema.Types.ObjectId, ref: "Neighborhood", index: true },
      name: String, // FOR FAST READ
    },
    city: String,
    stateUf: String,
    zipCode: String,
    referencePoint: [String],
    lat: Number,
    lng: Number,
  },
  { _id: false },
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

    isFeatured: { type: Boolean, default: false },
    isFurnished: toggleFieldSchema,
    isNearSubway: toggleFieldSchema,
    isPetFriendly: toggleFieldSchema,

    constructionCompany: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "ConstructionCompany",
        index: true,
      },
      name: String,
    },

    propertyType: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true,
      index: true,
    },

    propertyPurpose: {
      type: Schema.Types.ObjectId,
      ref: "PropertyPurpose",
      index: true,
    },
    propertyStanding: {
      type: Schema.Types.ObjectId,
      ref: "PropertyStanding",
      index: true,
    },
    propertyTypologies: [
      {
        type: Schema.Types.ObjectId,
        ref: "PropertyTypologies",
        index: true,
      },
    ],
    propertyAmenities: [
      { type: Schema.Types.ObjectId, ref: "PropertyAmenities", index: true },
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
  { strict: true, timestamps: true },
);

// ------------ IGNORES PROPERTIES WITH "DRAFT" STATUS AUTOMATICALLY ----------
propertySchema.pre("find", async function (this: Query<any, any>) {
  const options = this.getOptions();

  if (options.includeDrafts === true) {
    return;
  }

  this.where({ status: "PUBLISHED" });
});

// ENSURES THAT GALLERY AND FLOOR PLAN GALLERY WITH BE RETURNED ALREADY ORDERED
propertySchema.post(["find", "findOne", "findOneAndUpdate"], function (doc) {
  if (!doc) return;
  const docs = Array.isArray(doc) ? doc : [doc];

  docs.forEach((d) => {
    d.gallery?.sort(
      (a: { order: number }, b: { order: number }) => a.order - b.order,
    );
    d.floorPlanGallery?.sort(
      (a: { order: number }, b: { order: number }) => a.order - b.order,
    );
  });
});

const PropertyModel =
  (mongoose.models.Property as Model<IProperty>) ||
  mongoose.model<IProperty>("Property", propertySchema);
export default PropertyModel;
