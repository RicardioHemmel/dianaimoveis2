import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";
import StatusModel from "./status.model";

const typeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_types",
  }
);

const TypeModel =
  (mongoose.models.PropertyType as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyType", typeSchema);
export default TypeModel;
