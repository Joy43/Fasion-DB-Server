import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import User from "../user/user.model";
import Favourite from "./favourite.model";


const CreateWishlist=async(
    payload:{userId:string,productId:string},
    authUser:JwtPayload
)=>{
    const userId=payload.userId || authUser.userId;
    const productId = payload.productId;
    
  if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid user ID is required.");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found.");
  }

   const alreadyExists = await Favourite.findOne({
    user: user._id,
    product: productId,
  });
  if (alreadyExists) {
    return {
      success: false,
      message: "This product is already in your wishlist",
    };
  }
  const newWishlist = await Favourite.create({
    user: user._id,
    car: productId,
  });

  const populatedFavourite = await Favourite.findById(newWishlist._id)
    .populate("user")
    .populate("product");

  return {
    success: true,
    message: "Product added to wishlist",
    wishlist: populatedFavourite,
  };

};

export const FavouriteService={
    CreateWishlist
}