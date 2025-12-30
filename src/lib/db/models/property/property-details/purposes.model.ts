import mongoose, { Schema } from "mongoose";

const purposeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_purposes",
  }
);

export default mongoose.models.PropertyPuporse ||
  mongoose.model("PropertyPurpose", purposeSchema);
