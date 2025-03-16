import httpStatus from "http-status";
import AppError from "../../app/error/AppError";
import Product from "../products/product.model";
// import Order from "./order.model";
import { User } from "../User/user.model";
import { OrderPayload } from "../../types/OrderPayloadTypes";
import mongoose, { ObjectId } from "mongoose";
import Order from "./order.model";
import Cart from "../cart/cart.model";
// import { Order } from "./order.model";

const createOrder = async (
  userId: mongoose.Types.ObjectId,
  cartItems: any,
  paymentDetails
) => {
  // Process cart items into order format
  const orderProducts = cartItems.map((item: any) => ({
    product: item.product._id,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity,
  }));

  // Calculate total amount
  const totalAmount = orderProducts.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const { address, paymentMethod } = paymentDetails;

  // Create the order
  const order = await Order.create({
    user: userId,
    products: orderProducts,
    totalAmount,
    address,
    paymentMethod,
  });

  // Reduce stock for ordered products
  for (const item of cartItems) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { quantity: -item.quantity },
    });
  }

  // Clear the user's cart after order is placed
  await Cart.deleteMany({ user: userId });

  return order;
};

const getOrders = async ({ userId }: { userId?: string }) => {
  return await Order.find({ user: userId })
    .populate({
      path: "products.product",
    })
    .populate("user");
};
const getOrdersByAdminFromDb = async ({ _id }: { _id?: string }) => {
  return await Order.find({ user: _id })
    .populate({
      path: "products.product",
    })
    .populate("user");
};
// const getOrders = async (userId?: string) => {
//   return await Order.find(userId).populate("userId", "-password").populate("products");
// };

const getAllOrdersFromDb = async () => {
  return await Order.find()
    .populate("user", "-password")
    .populate("products.product");
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
  changeOrderStatusIntoDb,getOrdersByAdminFromDb
};
