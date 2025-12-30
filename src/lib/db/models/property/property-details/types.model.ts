import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_types",
  }
);

export default mongoose.models.PropertyType ||
  mongoose.model("PropertyType", typeSchema);
