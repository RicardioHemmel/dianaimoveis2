import mongoose, { Schema, Model } from "mongoose";
import { INeighborhood } from "@/lib/schemas/neighborhood/INeighborhood";

// MONGODB SCHEMA
const neighborhoodSchema = new Schema<INeighborhood>({
  name: { type: String, required: true, unique: true },
});

//MONGOOSE.MODELS.USER CHECKS IF IT HAS ALREADY BEEN COMPILED TO AVOID RECOMPILATION ERROR IN NEXT.JS (HOT RELOAD)
const NeighborhoodModel =
  (mongoose.models.Neighborhood as Model<INeighborhood>) ||
  mongoose.model<INeighborhood>("Neighborhood", neighborhoodSchema);

export default NeighborhoodModel;
