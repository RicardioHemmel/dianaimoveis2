import mongoose, { Schema, Model, Types } from "mongoose";
import { IUser, UserRole } from "@/lib/schemas/user/IUser";

// MONGODB SCHEMA
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
    isActive: { type: Boolean, default: true },

    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true },
);

//MONGOOSE.MODELS.USER CHECKS IF IT HAS ALREADY BEEN COMPILED TO AVOID RECOMPILATION ERROR IN NEXT.JS (HOT RELOAD)
const UserModel =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default UserModel;
