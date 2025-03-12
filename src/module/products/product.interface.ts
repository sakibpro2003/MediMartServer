import { Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: boolean;
  quantity: number;
  requiredPrescription: boolean;
  expiryDate: Date;
  manufacturer: {
    name: string;
    address?: string;
    contact?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export default IProduct;
