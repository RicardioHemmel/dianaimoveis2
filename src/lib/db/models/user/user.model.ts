import mongoose, { Schema, Model, Types } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

// Interface for TS inferance
export interface IUser {
  email: string;
  password?: string;
  name: string;
  isActive: boolean;
  avatar?: string;

  resetToken?: string | null;
  resetTokenExpiry?: Date | null;

  role: UserRole;

  propertyIds: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

// MONGODB SCHEMA
const UserSchema = new Schema<IUser>(
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

    propertyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

//MONGOOSE.MODELS.USER CHECKS IF IT HAS ALREADY BEEN COMPILED TO AVOID RECOMPILATION ERROR IN NEXT.JS (HOT RELOAD)
const UserModel =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;
