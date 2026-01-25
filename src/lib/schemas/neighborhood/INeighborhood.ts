import { Types } from "mongoose";

// Interface for TS inferance
export interface INeighborhood {
  _id?: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
