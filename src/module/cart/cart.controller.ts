import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { User } from "../User/user.model";
import { cartServices } from "./cart.service";
import { ObjectId } from "mongoose";
import Cart from "./cart.model";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User ID not found in token.",
    });
  }
  const email = req.user.email;
  const getUser = await User.findOne({ email: email });
  const user = getUser?._id as unknown as ObjectId;
  console.log(user, "user form cont");
  const findCart = await Cart.findOne({ user });
  // if(findCart){

  // }

  const payload = req.body;

  const addItemToCart = await cartServices.addToCart({ payload, user });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Cart created successfully!",
    data: addItemToCart,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User email not found.",
    });
  }

  const user = await User.findOne({ email: userEmail });

  if (!user || !user._id) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found!",
    });
  }

  const userId = user._id.toString();

  const response = await cartServices.clearCart(userId);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Cart cleared successfully!",
    data: response,
  });
});

// const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
//   const orderId = req?.params?.orderId;
//   // console.log(orderId, "iddddddddddddddddddddd");
//   const { status } = req.body;
//   console.log(status)

//   if (!orderId || !status) {
//     return res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message: "Order ID and status are required",
//     });
//   }

//   const result = await orderService.changeOrderStatusIntoDb(orderId, status);

//   if (!result) {
//     return res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message: "Order not found",
//     });
//   }

//   return res.status(httpStatus.OK).json({
//     success: true,
//     message: "Order status updated successfully!",
//     data: result,
//   });
// });

// const getAllOrders = catchAsync(async (req: Request, res: Response) => {
//   const orders = await orderService.getAllOrdersFromDb();
//   return res.status(httpStatus.OK).json({
//     success: true,
//     message: "Orders retrieved successfully!",
//     data: orders,
//   });
// });

export const cartController = {
  addToCart,
  clearCart,
  //   getOrders,
  //   getAllOrders,
  //   deleteOrder,
  //   changeOrderStatus,
};
