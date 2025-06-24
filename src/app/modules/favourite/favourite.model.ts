import { Product } from './../product/product.model';
import mongoose, { Schema, Document } from "mongoose";
import { IFavourite } from "./favourite.interface";

const FavouriteSchema= new Schema<IFavourite>(
  {
user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Wishlist model
const Favourite = mongoose.model<IFavourite>("Favourite", FavouriteSchema);

export default Favourite;