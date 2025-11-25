import { orders_db } from "../config/db.js";
import orderSchema from "./Order.js";


const DeclinedOrder = orders_db.model("DeclinedOrder", orderSchema, "declined_orders");
export default DeclinedOrder;