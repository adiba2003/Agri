import { products_db } from "../config/db.js";
import { productSchema } from "../models/Product.js";




// --------------------------------------------------------------
// 📌 ADD PRODUCT TO CATEGORY + ALLCATEGORIES
// --------------------------------------------------------------
export const addToCategoryCollection = async (req, res) => {
    console.log("hit")
  try {
    const product = req.body;
    console.log(product)


    if (!product.category) {
      return res.status(400).json({ error: "Category missing" });
    }


    const categoryCollection = product.category.replace(/\s+/g, "");


    const CategoryModel =
      products_db.models[categoryCollection] ||
      products_db.model(categoryCollection, productSchema, categoryCollection);


    await new CategoryModel(product).save();


    const AllModel =
      products_db.models["AllCategories"] ||
      products_db.model("AllCategories", productSchema, "AllCategories");


    await new AllModel(product).save();


    res.json({
      success: true,
      message: `Product saved in ${categoryCollection} & AllCategories`,
    });


  } catch (error) {
    console.log("❌ Save Error:", error);
    res.status(500).json({ error: "Error saving product" });
  }
};




// --------------------------------------------------------------
// 🔥 REMOVE PRODUCT FROM CART
// --------------------------------------------------------------
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;


    const AllModel =
      products_db.models["AllCategories"] ||
      products_db.model("AllCategories", productSchema, "AllCategories");


    const product = await AllModel.findOne({ productId });


    if (!product) {
      return res.status(404).json({ error: "Product not found in database" });
    }


    const categoryCollection = product.category.replace(/\s+/g, "");


    const CategoryModel =
      products_db.models[categoryCollection] ||
      products_db.model(categoryCollection, productSchema, categoryCollection);


    await CategoryModel.deleteOne({ productId });
    await AllModel.deleteOne({ productId });


    res.json({
      success: true,
      message: `Product removed from ${categoryCollection} & AllCategories`,
    });


  } catch (error) {
    console.log("❌ Remove Error:", error);
    res.status(500).json({ error: "Error removing product" });
  }
};




// --------------------------------------------------------------
// 🔥 UPDATE QUANTITY (Increase / Decrease)
// --------------------------------------------------------------
export const updateCartQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;


    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Invalid quantity" });
    }


    const AllModel =
      products_db.models["AllCategories"] ||
      products_db.model("AllCategories", productSchema, "AllCategories");


    const product = await AllModel.findOne({ productId });


    if (!product) {
      return res.status(404).json({ error: "Product not found in database" });
    }


    const categoryCollection = product.category.replace(/\s+/g, "");


    const CategoryModel =
      products_db.models[categoryCollection] ||
      products_db.model(categoryCollection, productSchema, categoryCollection);


    // Update quantity in both collections
    await CategoryModel.updateOne({ productId }, { $set: { quantity } });
    await AllModel.updateOne({ productId }, { $set: { quantity } });


    res.json({
      success: true,
      message: "Quantity updated successfully",
    });


  } catch (error) {
    console.log("❌ Quantity Update Error:", error);
    res.status(500).json({ error: "Error updating quantity" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const AllModel =
      products_db.models["AllCategories"] ||
      products_db.model("AllCategories", productSchema, "AllCategories");


    const products = await AllModel.find();


    res.json({
      success: true,
      total: products.length,
      data: products,
    });


  } catch (error) {
    console.log("❌ Get Error:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};
