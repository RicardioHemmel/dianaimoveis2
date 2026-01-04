import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";

const typologySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_typologies",
  }
);

const TypologyModel =
  (mongoose.models.PropertyTypology as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyTypology", typologySchema);
export default TypologyModel;
