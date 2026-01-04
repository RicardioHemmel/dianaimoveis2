import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";

const amenitiesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_amenities",
  }
);

const AmenitiesModel =
  (mongoose.models.PropertyAmenities as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyAmenities", amenitiesSchema);
export default AmenitiesModel;
