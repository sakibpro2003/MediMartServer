import mongoose, { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";
import { number } from "zod";

const OrderSchema = new Schema<TOrder>(
  {
    quantity: {
      type: Number,
      required:true
    },
    address: {
      type: String,
    },
    phone:{
      type:String,
    },
    products: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["bKash", "Nagad", "Cash on Delivery", "Card"],
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = model<TOrder>("Order", OrderSchema);

export default Order;
