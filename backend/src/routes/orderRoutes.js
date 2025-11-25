import express from "express";

import {
  getAllOrders,
  createOrder,
  acceptOrder,
  declineOrder,
  cancelOrder,
  getOrdersByStatus,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();


// ===============================
// 📌 Create New Order 
// ===============================
router.post("/", createOrder);


// ===============================
// 📌 Get All Orders 
// ===============================
router.get("/", getAllOrders);


// ===============================
// 📌 Filter Orders by Status
// Example: /api/orders/status/pending
// ===============================
router.get("/status/:status", getOrdersByStatus);


// ===============================
// 📌 Get Single Order by ID
// ===============================
router.get("/:orderId", getOrderById);


// ===============================
// 📌 Update Order Status
// ===============================
router.put("/:orderId/accept", acceptOrder);
router.put("/:orderId/decline", declineOrder);
router.put("/:orderId/cancel", cancelOrder);


// ===============================
// 📌 Delete Order
// ===============================
router.delete("/:orderId", deleteOrder);


export default router;
