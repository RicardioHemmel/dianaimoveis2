import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema(
  {
    title: String,
    price: Number,
  },
  { timestamps: true }
);

// Evita recriar o model em dev
export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
