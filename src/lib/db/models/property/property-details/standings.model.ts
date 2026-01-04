import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";

const standingSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_standings",
  }
);

const StandingModel =
  (mongoose.models.PropertyStanding as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyStanding", standingSchema);
export default StandingModel;
