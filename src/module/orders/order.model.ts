import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    prescription: { type: String },
  },
  {
    timestamps: true,
    collection: "Orders",
  }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
