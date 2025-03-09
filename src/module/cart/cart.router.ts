import express from "express";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { cartController } from "./cart.controller";

const router = express.Router();

router.post("/", auth(USER_ROLE.CUSTOMER), cartController.addToCart);
// router.post("/", auth(USER_ROLE.ADMIN), productController.createProduct);
// router.get("/", productController.getProduct);
// router.get("/:productId", productController.getSingleProduct);
// router.put("/:productId",auth(USER_ROLE.ADMIN), productController.updateProduct);
router.delete("/", auth(USER_ROLE.CUSTOMER), cartController.clearCart);
export const cartRoutes = router;
