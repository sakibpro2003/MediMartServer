import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.get("/payments/successful-transactions", auth( USER_ROLE.ADMIN), orderController.getSuccessfullPayments);
router.post("/", auth(USER_ROLE.CUSTOMER), orderController.createOrder);
router.get("/", auth( USER_ROLE.CUSTOMER,USER_ROLE.ADMIN), orderController.getOrders);
router.get("/:_id", auth( USER_ROLE.CUSTOMER,USER_ROLE.ADMIN), orderController.getOrdersByAdmin);


//todo:
router.get("/get-all-orders", auth(USER_ROLE.ADMIN), orderController.getAllOrders);
router.delete("/:orderId", auth(USER_ROLE.ADMIN), orderController.deleteOrder);
router.put("/:orderId", auth(USER_ROLE.ADMIN), orderController.changeOrderStatus);

export default router;
