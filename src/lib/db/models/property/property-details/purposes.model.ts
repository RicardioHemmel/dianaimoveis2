import { IPopulatedRef } from "@/lib/schemas/property/IProperty";
import mongoose, { Model, Schema } from "mongoose";

const purposeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_purposes",
  }
);

const PurposeModel =
  (mongoose.models.PropertyPurpose as Model<IPopulatedRef>) ||
  mongoose.model<IPopulatedRef>("PropertyPurpose", purposeSchema);
export default PurposeModel;
