import mongoose, { Schema, Document } from "mongoose";
import { IFavourite } from "./favourite.interface";

const wishlistSchema = new Schema<IFavourite>(
  {
user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Wishlist model
const Wishlist = mongoose.model<IFavourite>("Wishlist", wishlistSchema);

export default Wishlist;