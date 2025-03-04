import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

// ✅ Only customers can create an order
router.post("/", auth(USER_ROLE.CUSTOMER), orderController.createOrder);

// ✅ Both customers and admins can view orders
router.get("/", auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), orderController.getOrders);
router.get("/get-all-orders", auth(USER_ROLE.ADMIN), orderController.getAllOrders);
router.delete("/:orderId", auth(USER_ROLE.ADMIN), orderController.deleteOrder);
router.put("/:orderId", auth(USER_ROLE.ADMIN), orderController.changeOrderStatus);

export default router;
