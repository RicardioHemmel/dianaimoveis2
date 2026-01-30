import { Types } from "mongoose";

// Interface for TS inferance
export interface IConstructionCompany {
  _id?: Types.ObjectId;
  name: string;
}
