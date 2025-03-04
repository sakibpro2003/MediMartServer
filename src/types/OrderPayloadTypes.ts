import { Types } from "mongoose";

const paymentMethods = ["bKash", "Nagad", "Cash on Delivery", "Card"] as const;

type PaymentMethod = (typeof paymentMethods)[number];

export type OrderPayload = {
  phone: string;
  address: string;
  userId: Types.ObjectId | undefined;
  products: string;
  totalPrice: Number;
  quantity: any;
  paymentMethod: PaymentMethod;
};
