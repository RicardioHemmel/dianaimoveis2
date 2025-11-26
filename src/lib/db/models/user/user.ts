import mongoose, { Schema } from "mongoose";

enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
    avatar: String,

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    propertyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.UserModel || mongoose.model("UserModel", UserSchema);
