import express from "express";
import auth from "../../app/middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/get-all-user",  UserController.getAllUser);
router.put(
  "/change-user-status",
  auth(USER_ROLE.ADMIN),
  UserController.changeUserStatus
);
router.put(
  `/change-user-info`,
  auth(USER_ROLE.CUSTOMER),
  UserController.updateUserInfo
);

export const UserRoutes = router;
