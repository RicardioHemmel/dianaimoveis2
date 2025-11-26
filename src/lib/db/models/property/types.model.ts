import mongoose, { Schema } from "mongoose";

const TypeSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_types",
  }
);

export default mongoose.models.PropertyType ||
  mongoose.model("PropertyType", TypeSchema);
