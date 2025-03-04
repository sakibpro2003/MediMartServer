import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { orderService } from "./order.service";
import { User } from "../User/user.model";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User ID not found in token.",
    });
  }
  const email = req.user.email;
  const getUser = await User.findOne({ email: email });
  const userId = getUser?._id;

  const payload = { ...req.body, userId };
  const newOrder = await orderService.createOrder(payload);

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Order created successfully!",
    data: newOrder,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });
  const userId = user?._id.toString();
  const orders = await orderService.getOrders({ userId });
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Orders retrieved successfully!",
    data: orders,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;

  if (!orderId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Order ID is required",
    });
  }

  const result = await orderService.deleteOrderFromDb(orderId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Order not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Order deleted successfully!",
    data: result,
  });
});

const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderId = req?.params?.orderId;
  // console.log(orderId, "iddddddddddddddddddddd");
  const { status } = req.body;
  console.log(status)

  if (!orderId || !status) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Order ID and status are required",
    });
  }

  const result = await orderService.changeOrderStatusIntoDb(orderId, status);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Order not found",
    });
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Order status updated successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrdersFromDb();
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Orders retrieved successfully!",
    data: orders,
  });
});

export const orderController = {
  createOrder,
  getOrders,
  getAllOrders,
  deleteOrder,
  changeOrderStatus,
};
