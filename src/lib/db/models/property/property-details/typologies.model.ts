import mongoose, { Schema } from "mongoose";

const typologySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_typologies",
  }
);

export default mongoose.models.PropertyTypology ||
  mongoose.model("PropertyTypology", typologySchema);
