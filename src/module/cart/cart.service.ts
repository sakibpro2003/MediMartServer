
import Cart from "./cart.model";
import { TCartPayload } from "../../types/cartPayload.types";
import mongoose, { ObjectId, Types } from "mongoose";

const addToCart = async ({
  payload,
  user,
}: {
  payload: TCartPayload;
  user: ObjectId;
}) => {
  const cartData = { ...payload, user };
  const res = await Cart.create(cartData);

  return res;
};
const increaseAmountIntoDb = async ({
  userId,
  objectProductId,
}: {
  userId: mongoose.Types.ObjectId;
  objectProductId: mongoose.Types.ObjectId;
}) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId, product: objectProductId }, // Find the correct cart item
    { $inc: { quantity: 1 } }, // Increment quantity by 1
    { new: true } // Return updated cart
  );

  return updatedCart;
};

export default {
  increaseAmountIntoDb,
};

//Clear cart logic
const clearCart = async (id: string) => {
  const getCart = await Cart.deleteOne({ user: id });
  return clearCart;
};

const getAllProductsFromCartService = async (user) => {
  const res = await Cart.find({ user }).populate("product");
  return res;
};


const removeItemFromCartDb = async (_id, user) => {
  try {

    const objectId = new mongoose.Types.ObjectId(_id);
    const userId = new mongoose.Types.ObjectId(user); // Ensure `user` is an ObjectId

    const find = await Cart.findOne({user:userId,_id:objectId})

    const res = await Cart.findOneAndDelete({ _id: objectId, user: userId });


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
  increaseAmountIntoDb
  //   deleteOrderFromDb,
  //   changeOrderStatusIntoDb,
};
