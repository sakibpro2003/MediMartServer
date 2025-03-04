import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  brand: z.string().min(1, "Brand is required").trim(),
  price: z.number().min(0, "Price must be a positive number"),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"], {
    errorMap: () => ({ message: "Invalid product type" }),
  }),
  description: z.string().min(1, "Description is required").trim(),
  quantity: z.number().int().min(0, "Quantity must be a positive number"),
  inStock: z.boolean().default(true),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

const validateProduct = (data: unknown) => {
  const result = ProductSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error.format());
  } else {
    console.log("Valid product data:", result.data);
  }
};
