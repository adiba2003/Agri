// models/Product.js
import mongoose from "mongoose";


export const productSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    farmer: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    harvestedDays: { type: Number, default: 0 },
    available: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageName: { type: String, required: true },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);


export default Product;
