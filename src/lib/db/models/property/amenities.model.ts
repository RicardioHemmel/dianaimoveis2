import mongoose, { Schema } from "mongoose";

const AmenitiesSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_amenities",
  }
);

export default mongoose.models.PropertyAmenities ||
  mongoose.model("PropertyAmenities", AmenitiesSchema);
