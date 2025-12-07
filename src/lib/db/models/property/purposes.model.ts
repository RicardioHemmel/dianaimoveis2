import mongoose, { Schema } from "mongoose";

const PurposeSchema = new Schema({
  name: { type: String, required: true },
},
  {
    collection: "property_purposes",
  });

export default mongoose.models.PropertyPuporse ||
  mongoose.model("PropertyPurpose", PurposeSchema);
