import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { User } from "../User/user.model";
import { cartServices } from "./cart.service";
import { ObjectId } from "mongoose";
import Cart from "./cart.model";
import Product from "../products/product.model";
import AppError from "../../app/error/AppError";

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
  const findCart = await Cart.findOne({ user });

  const payload = req.body;
  const {product} =  payload;
  console.log(product,'37')
  //TODO: add quantity to creaat cart item. then update cart increase
  const findProduct = await Cart.findOne({product,user})
  console.log(findProduct,'find producjt')
  if(findProduct?._id){
    throw new AppError(httpStatus.CONFLICT,"Product already added")
  }
  console.log(findProduct,'got it')
  console.log(product)
  // console.log(req.body,"req,bodysdkfjhsdflkkjsdljkf");

  const addItemToCart = await cartServices.addToCart({ payload, user });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Cart created successfully!",
    data: addItemToCart,
  });
});
const increaseAmount = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User ID not found in token.",
    });
  }
  const email = req.user.email;
  const getUser = await User.findOne({ email: email });
  const user = getUser?._id as unknown as ObjectId;
  const findCart = await Cart.findOne({ user });

  const payload = req.body;
  const {product} =  payload;
  const findProduct = await Product.findById(product)
  
  console.log(findProduct,'got it')
  console.log(product)
  // console.log(req.body,"req,bodysdkfjhsdflkkjsdljkf");

 const increase = await cartServices.increaseAmountIntoDb({ payload, user });

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Cart created successfully!",
    data: increase,
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

const getAllProductsFromCart = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: User ID not found in token.",
      });
    }
    const email = req.user.email;
    const getUser = await User.findOne({ email: email });
    const user = getUser?._id as unknown as ObjectId;
    const cartProducts = await cartServices.getAllProductsFromCartService(user);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Orders retrieved successfully!",
      data: cartProducts,
    });
  }
);

const removeItemController = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User ID not found in token.",
    });
  }
  const {productId} = req.params;
  const email = req.user.email;
  const getUser = await User.findOne({ email: email });
  const user = getUser?._id as unknown as ObjectId;


  const result = await cartServices.removeItemFromCartDb(productId,user);
  // const cartProducts = await cartServices.getAllProductsFromCartService(user);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Item removed successfully!",
    data: result,
  });
});

export const cartController = {
  addToCart,
  clearCart,
  removeItemController,
  getAllProductsFromCart,
  increaseAmount
};
