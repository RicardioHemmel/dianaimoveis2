import { Types } from "mongoose";

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

  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}
