import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";
import StandingModel from "./standings.model";

const statusSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_status",
  }
);

const StatusModel =
  (mongoose.models.PropertyStatus as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyStatus", statusSchema);
export default StatusModel;
