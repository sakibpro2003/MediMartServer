import { model, Schema } from "mongoose";
import IProduct from "./product.interface";

const productsSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    inStock: { type: Boolean, required: true, default: true },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be a positive number"],
    },
    requiredPrescription: { type: Boolean, required: true, default: false },
    expiryDate: { type: Date, required: true },
    manufacturer: {
      name: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
      contact: { type: String, trim: true },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Product = model<IProduct>("Product", productsSchema);
export default Product;
