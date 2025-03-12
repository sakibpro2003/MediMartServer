import httpStatus from "http-status";
import AppError from "../../app/error/AppError";

import Cart from "./cart.model";
import { TCartPayload } from "../../types/cartPayload.types";
import mongoose, { ObjectId, Types } from "mongoose";
import { cartRoutes } from "./cart.router";

const addToCart = async ({
  payload,
  user,
}: {
  payload: TCartPayload;
  user: ObjectId;
}) => {
  const cartData = { ...payload, user };
  console.log(cartData, "cartdata");
  const res = await Cart.create(cartData);

  return addToCart;
};

//Clear cart logic
const clearCart = async (id: string) => {
  const getCart = await Cart.deleteOne({ user: id });
  return clearCart;
};

const getAllProductsFromCartService = async (user) => {
  const res = await Cart.find({ user }).populate("product");
  console.log(res, "check");
  return res;
};
// const removeItemFromCartDb = async (_id,user) => {
//   console.log(_id,"_id")
//   console.log(user,"user")
//   // const res = await Cart.findOneAndDelete(_id,user);
//   const res = await Cart.find({_id,user})
//   return res;
// };

const removeItemFromCartDb = async (_id, user) => {
  try {
    console.log("Before conversion:", _id, " | ", user);

    const objectId = new mongoose.Types.ObjectId(_id);
    const userId = new mongoose.Types.ObjectId(user); // Ensure `user` is an ObjectId

    console.log("After conversion:", objectId, " | ", userId);
    const find = await Cart.findOne({user:userId,_id:objectId})
    console.log(find,"prod1")

    const res = await Cart.findOneAndDelete({ _id: objectId, user: userId });

    console.log(res ? "Item removed" : "Item not found");

    return res;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};

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
  removeItemFromCartDb,
  getAllProductsFromCartService,
  //   deleteOrderFromDb,
  //   changeOrderStatusIntoDb,
};
