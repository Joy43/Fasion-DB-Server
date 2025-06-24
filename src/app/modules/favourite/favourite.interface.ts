import { Types } from "mongoose";

export interface IFavourite {
  user: Types.ObjectId;
  product: Types.ObjectId;
 
}