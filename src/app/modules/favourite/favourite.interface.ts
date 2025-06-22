import { Types } from "mongoose";

export interface IFavourite {
  user: Types.ObjectId;
  car: Types.ObjectId;
 
}