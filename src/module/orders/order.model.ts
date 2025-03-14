import mongoose, { Schema } from "mongoose";
import { IOrder, IOrderItem } from "./order.interface";
// import { IOrder, IOrderItem } from "../interfaces/IOrder";

// const OrderItemSchema = new Schema<IOrderItem>({
//   product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//   quantity: { type: Number, required: true, min: 1 },
//   price: { type: Number, required: true },
// });

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // items: [OrderItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
