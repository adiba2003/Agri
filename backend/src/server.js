import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


// Connect databases
import "./config/db.js";


// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//import orderRoutes from "./routes/orderRoutes.js";


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
//app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => res.send("🚀 FarmAssist API Running..."));


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
