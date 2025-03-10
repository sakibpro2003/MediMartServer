import { Document, Types } from "mongoose";
import { ICartItem } from "../cart/cart.interface";
import { TUser } from "../User/user.interface";

export interface IOrder extends Document {
  user: Types.ObjectId | TUser;
  items: ICartItem[];
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  prescription?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}
