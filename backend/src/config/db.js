import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const userDB = mongoose.createConnection(
  `${process.env.MONGO_URI}/${process.env.USER_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


export const products_db = mongoose.createConnection(
  `${process.env.MONGO_URI}/${process.env.PRODUCTS_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


export const orders_db = mongoose.createConnection(
  `${process.env.MONGO_URI}/${process.env.ORDERS_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


// Logs
userDB.on("connected", () => console.log("✅ userDB Connected"));
products_db.on("connected", () => console.log("✅ productsDB Connected"));
 orders_db.on("connected", () => console.log("✅ ordersDB Connected"));


userDB.on("error", (err) => console.log("❌ userDB Error:", err));
products_db.on("error", (err) => console.log("❌ productsDB Error:", err));
orders_db.on("error", (err) => console.log("❌ ordersDB Error:", err));
