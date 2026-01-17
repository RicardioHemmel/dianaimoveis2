import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";

const typologiesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_typologies",
  }
);

const TypologiesModel =
  (mongoose.models.PropertyTypologies as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyTypologies", typologiesSchema);
export default TypologiesModel;
