import { Document, Types } from "mongoose";
import { TUser } from "../User/user.interface";
import IProduct from "../products/product.interface";

export interface ICartItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId | TUser;
  product:Types.ObjectId;
  quantity:number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
