import { orders_db } from "../config/db.js";
import orderSchema from "./Order.js";


const PendingOrder = orders_db.model("PendingOrder", orderSchema, "pending_orders");
export default PendingOrder;