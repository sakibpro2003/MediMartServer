import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import Product from "../products/product.model";
import Order from "./order.model";
import { User } from "../User/user.model";
import { OrderPayload } from "../../types/OrderPayloadTypes";
import { ObjectId } from "mongoose";

const createOrder = async (payload: OrderPayload) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }

  const getProduct = await Product.findById(payload.products);
  if (!getProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (payload.quantity > getProduct.quantity) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${getProduct.quantity} products in stock. But you ordered ${payload.quantity}`
    );
  }

  const order = await Order.create(payload);

  getProduct.quantity -= payload.quantity;
  getProduct.inStock = getProduct.quantity > 0;
  await getProduct.save();

  return order;
};

const getOrders = async ({ userId }: { userId?: string }) => {
  return await Order.find({userId}).populate("userId", "-password").populate("products");
};
// const getOrders = async (userId?: string) => {
//   return await Order.find(userId).populate("userId", "-password").populate("products");
// };

const getAllOrdersFromDb = async () => {
  return await Order.find().populate("userId", "-password").populate("products");
};

const deleteOrderFromDb = async (orderId: string) => {
  return await Order.findByIdAndDelete(orderId);
};

const changeOrderStatusIntoDb = async (orderId: string, status: string) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );
};

export const orderService = {
  createOrder,
  getOrders,
  getAllOrdersFromDb,
  deleteOrderFromDb,
  changeOrderStatusIntoDb, 
};

