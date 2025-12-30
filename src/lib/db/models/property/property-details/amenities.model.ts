import mongoose, { Schema } from "mongoose";

const AmenitiesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_amenities",
  }
);

export default mongoose.models.PropertyAmenities ||
  mongoose.model("PropertyAmenities", AmenitiesSchema);
