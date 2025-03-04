import { model, Schema } from "mongoose";
import IProduct from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["Mountain", "Road", "Hybrid", "BMX", "Electric"],
        message: "{VALUE} is not a valid product type.",
      },
    },
    description: { type: String, required: true, trim: true },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be a positive number"],
    },
    inStock: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Products",
  }
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
