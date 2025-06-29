import express from "express";
import auth from "../../middleware/auth";

import { UserRole } from "../user/user.interface";
import { FavoritelistController } from "./favorite.controller";




const router = express.Router();

router.post("/",  auth(UserRole.ADMIN, UserRole.USER),FavoritelistController.createFavorite);
// router.get("/",auth(USER_ROLE.user),WishListController.getWishlist);
// router.get("/",auth(USER_ROLE.user,USER_ROLE.admin),WishListController.getAllWishlist);
// router.delete("/:id",  WishListController.DeleteWishlist);w
export const Favouriterouter=router;