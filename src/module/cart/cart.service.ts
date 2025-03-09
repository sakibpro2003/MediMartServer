import httpStatus from "http-status";
import AppError from "../../app/error/AppError";

import Cart from "./cart.model";
import { TCartPayload } from "../../types/cartPayload.types";
import { ObjectId } from "mongoose";

const addToCart = async ({
  payload,
  user,
}: {
  payload: TCartPayload;
  user: ObjectId;
}) => {
  if (!Array.isArray(payload?.items) || payload.items.length === 0) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Cart is empty");
  }

  const cartData = { ...payload, user };
  console.log(cartData, "cartdata");
  const res = await Cart.create(cartData);

  return addToCart;
};

//Clear cart logic
const clearCart = async (id:string) => {
  const getCart = await Cart.deleteOne({ user: id });
  return clearCart;
};

// const getOrders = async ({ userId }: { userId?: string }) => {
//   return await Order.find({userId}).populate("userId", "-password").populate("products");
// };
// // const getOrders = async (userId?: string) => {
// //   return await Order.find(userId).populate("userId", "-password").populate("products");
// // };

// const getAllOrdersFromDb = async () => {
//   return await Order.find().populate("userId", "-password").populate("products");
// };

// const deleteOrderFromDb = async (orderId: string) => {
//   return await Order.findByIdAndDelete(orderId);
// };

// const changeOrderStatusIntoDb = async (orderId: string, status: string) => {
//   return await Order.findByIdAndUpdate(
//     orderId,
//     { status },
//     { new: true, runValidators: true }
//   );
// };

export const cartServices = {
  addToCart,
  clearCart,
  //   getOrders,
  //   getAllOrdersFromDb,
  //   deleteOrderFromDb,
  //   changeOrderStatusIntoDb,
};
