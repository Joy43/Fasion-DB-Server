import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { FavouriteService } from "./favorurite.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createFavorite=catchAsync(async(req:Request,res:Response)=>{
    const authUser=req.user as JwtPayload;
    const result=await FavouriteService.CreateWishlist(req.body,authUser);
   sendResponse(res,{
    success:true,
    message:"crearte wishlist is sucessfully user wise",
    statusCode:StatusCodes.OK,
    data:result
  })
});

export const FavoritelistController={
    createFavorite
}