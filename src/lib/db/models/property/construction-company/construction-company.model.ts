import mongoose, { Schema, Model } from "mongoose";
import { IConstructionCompany } from "@/lib/schemas/property/construction-company/IConstruction-company";

// MONGODB SCHEMA
const constructionCompanySchema = new Schema<IConstructionCompany>({
  name: { type: String, required: true, unique: true },
});

//MONGOOSE.MODELS.USER CHECKS IF IT HAS ALREADY BEEN COMPILED TO AVOID RECOMPILATION ERROR IN NEXT.JS (HOT RELOAD)
const ConstructionCompanyModel =
  (mongoose.models.ConstructionCompany as Model<IConstructionCompany>) ||
  mongoose.model<IConstructionCompany>(
    "ConstructionCompany",
    constructionCompanySchema,
  );

export default ConstructionCompanyModel;
