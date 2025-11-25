import { orders_db } from "../config/db.js";
import orderSchema from "./Order.js";


const CancelledOrder = orders_db.model("CancelledOrder", orderSchema, "cancelled_orders");
export default CancelledOrder;