// controllers/orderController.js
import PendingOrder from "../models/PendingOrder.js";
import ProcessingOrder from "../models/ProcessingOrder.js";
import DeclinedOrder from "../models/DeclinedOrder.js";
import CancelledOrder from "../models/CancelledOrder.js";

// Move document helper (move whole order from one collection to another)
const moveOrder = async (ModelFrom, ModelTo, orderId, newStatus) => {
  const order = await ModelFrom.findOne({ orderId });
  if (!order) return null;

  const obj = order.toObject();
  // remove _id so mongoose creates a new one in the destination collection
  delete obj._id;
  obj.status = newStatus;
  await ModelTo.create(obj);
  await ModelFrom.deleteOne({ orderId });
  return obj;
};

// create order
export const createOrder = async (req, res) => {
  try {
    const order = await PendingOrder.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all orders grouped by collections
export const getAllOrders = async (req, res) => {
  try {
    const pending = await PendingOrder.find();
    const processing = await ProcessingOrder.find();
    const declined = await DeclinedOrder.find();
    const cancelled = await CancelledOrder.find();
    res.json({ pending, processing, declined, cancelled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const models = {
      pending: PendingOrder,
      processing: ProcessingOrder,
      declined: DeclinedOrder,
      cancelled: CancelledOrder,
    };

    const model = models[status];
    if (!model) return res.status(400).json({ error: "Invalid status" });

    const orders = await model.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const id = req.params.orderId;
    const models = [PendingOrder, ProcessingOrder, DeclinedOrder, CancelledOrder];

    for (let M of models) {
      const found = await M.findOne({ orderId: id });
      if (found) return res.json(found);
    }

    res.status(404).json({ error: "Order not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const order = await moveOrder(PendingOrder, ProcessingOrder, req.params.orderId, "processing");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order moved to Processing", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const declineOrder = async (req, res) => {
  try {
    const order = await moveOrder(PendingOrder, DeclinedOrder, req.params.orderId, "declined");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order Declined", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
  cancelOrder behavior (improved):
  - Accepts optional body: { category: "Fruits" }
  - Finds the order in any of the collections (pending/processing)
  - If category provided -> remove items of that category from that order
     - If items left -> update the same document with remaining items and totalAmount
     - If no items left -> move whole order to Cancelled collection (status "cancelled")
  - If no category provided -> move whole order (wherever it is found) to Cancelled collection
*/
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { category } = req.body || {};

    // search in collections (prefer processing then pending then declined)
    const collections = [
      { model: ProcessingOrder, name: "processing" },
      { model: PendingOrder, name: "pending" },
      { model: DeclinedOrder, name: "declined" },
    ];

    let foundModel = null;
    let foundOrder = null;

    for (let c of collections) {
      const o = await c.model.findOne({ orderId });
      if (o) {
        foundModel = c.model;
        foundOrder = o;
        break;
      }
    }

    if (!foundOrder) {
      // As a final attempt, check Cancelled (maybe it's already cancelled)
      const already = await CancelledOrder.findOne({ orderId });
      if (already) return res.status(400).json({ error: "Order already cancelled" });
      return res.status(404).json({ error: "Order not found" });
    }

    // If no category => cancel whole order (move to Cancelled)
    if (!category) {
      const moved = await moveOrder(foundModel, CancelledOrder, orderId, "cancelled");
      if (!moved) return res.status(404).json({ error: "Order not found for cancellation" });
      return res.json({ message: "Order fully cancelled", order: moved });
    }

    // Partial cancellation by category
    const current = foundOrder.toObject();
    const originalCount = current.items?.length || 0;

    const remainingItems = (current.items || []).filter(item => {
      const itemCategory = item.category || "General";
      return itemCategory !== category;
    });

    // If nothing changed
    if (remainingItems.length === originalCount) {
      return res.status(400).json({ error: "No items found with that category to cancel" });
    }

    // If no items remain after removal -> move to CancelledOrder
    if (remainingItems.length === 0) {
      const v = await moveOrder(foundModel, CancelledOrder, orderId, "cancelled");
      if (!v) return res.status(500).json({ error: "Failed to move order to cancelled" });
      return res.json({ message: `All items removed (category: ${category}). Order moved to cancelled.`, order: v });
    }

    // Otherwise update the existing document with remaining items
    const newTotal = remainingItems.reduce((sum, it) => sum + (it.price * (it.quantity || 1)), 0);
    foundOrder.items = remainingItems;
    foundOrder.totalAmount = newTotal;
    foundOrder.updatedAt = Date.now();
    await foundOrder.save();

    return res.json({ message: `Items with category "${category}" removed from order.`, order: foundOrder });
  } catch (err) {
    console.error("cancelOrder error:", err);
    res.status(500).json({ error: err.message });
  }
};

// delete order across collections
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const collections = [
      PendingOrder,
      ProcessingOrder,
      DeclinedOrder,
      CancelledOrder
    ];

    for (let model of collections) {
      const found = await model.findOneAndDelete({ orderId });
      if (found) {
        return res.json({
          success: true,
          message: "Order deleted successfully"
        });
      }
    }

    res.status(404).json({ error: "Order not found" });

  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
