import express from "express";
import { productController } from "./product.controller";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.ADMIN), productController.createProduct);
router.get("/", productController.getProduct);
router.get("/:productId", productController.getSingleProduct);
router.put("/:productId",auth(USER_ROLE.ADMIN), productController.updateProduct);
router.delete(
  "/:productId",
  auth(USER_ROLE.ADMIN),
  productController.deleteProduct
);
export const productRoutes = router;
