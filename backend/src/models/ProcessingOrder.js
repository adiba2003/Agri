import { orders_db } from "../config/db.js";
import orderSchema from "./Order.js";


const ProcessingOrder = orders_db.model("ProcessingOrder", orderSchema, "processing_orders");
export default ProcessingOrder;