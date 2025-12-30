import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema({

  ownerType: {
    type: String,
    enum: ["PROPERTY"],
    required: true,
  },

  ownerId: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    enum: ["COVER", "GALLERY", "FLOORPLAN"],
    required: true,
  },

  path: {
    type: String,
    required: true,
    unique: true,
  },

  mimeType: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["PENDING", "AVAILABLE", "ERROR"],
    default: "PENDING",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Media || mongoose.model("Media", mediaSchema);