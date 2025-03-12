import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;
