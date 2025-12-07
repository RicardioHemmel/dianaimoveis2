import mongoose, { Schema } from "mongoose";

const TypeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: "property_types",
  }
);

export default mongoose.models.PropertyType ||
  mongoose.model("PropertyType", TypeSchema);
