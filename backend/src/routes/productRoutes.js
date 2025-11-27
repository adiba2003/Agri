import express from "express";
import {
  addToCategoryCollection,
  getAllProducts,
  removeFromCart,
  updateCartQuantity
} from "../controllers/productController.js";


const router = express.Router();


// Add product to category + AllCategories
router.post("/add-to-cart", addToCategoryCollection);
router.get("/get-cart-item",getAllProducts);


// Remove product
router.delete("/remove-from-cart/:id", removeFromCart);


// Update quantity (increase/decrease)
router.put("/update-quantity/:id", updateCartQuantity);


export default router;
